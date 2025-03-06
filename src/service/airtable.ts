import { Expense, Query } from "@/types";
import axios from "axios";
import Airtable from "airtable";
import { settings } from "@/config/settings";

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;


const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    "Content-Type": "application/json",
  },
});

// 🔹 Fetch all expenses
export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await api.get("");
  // add search, pagination
  const data =  response.data.records.map((record: any) => ({
    id: record.id,
    ...record.fields,
  }));

  console.log({data})

  return data
};


// 🔹 Add a new expense
export const addExpense = async (expenses: Expense[]): Promise<Expense> => {
  const response = await api.post("", 
    {records: expenses.map((expense) => ({ fields: expense })) }
);
  return { id: response.data.id, ...response.data.fields };
};


// 🔹 Update an expense
export const updateExpense = async (id: string, updatedExpense: Partial<Expense>): Promise<Expense> => {
  const response = await api.patch(`/${id}`, {
    fields: updatedExpense,
  });
  return { id: response.data.id, ...response.data.fields };
};


// 🔹 Delete an expense
export const deleteExpense = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};



export const fetchExpenses2 = async (params: Query) => {
  try {
    const filterConditions: string[] = [];

    if (params.search) {
      filterConditions.push(`
        OR(
          FIND(LOWER("${params.search}"), LOWER({name})), 
          FIND(LOWER("${params.search}"), LOWER({category}))
        )
      `);
    }
    

    if (params.category) {
      const selectedCategories = Array.isArray(params.category)
        ? params.category
        : JSON.parse(params.category);
      const categoryFilter = selectedCategories.map((cat) => `{category} = "${cat}"`).join(", ");
      filterConditions.push(`OR(${categoryFilter})`);
    }

    if (params.status) {
      const selectedStatuses = Array.isArray(params.status)
        ? params.status
        : JSON.parse(params.status);
      const statusFilter = selectedStatuses.map((st) => `{status} = "${st}"`).join(", ");
      filterConditions.push(`OR(${statusFilter})`);
    }

    if (params.dateFrom) {
      filterConditions.push(`IS_AFTER({date}, "${params.dateFrom}")`);
    }

    if (params.dateTo) {
      filterConditions.push(`IS_BEFORE({date}, "${params.dateTo}")`);
    }

    if (params.minAmount && params.maxAmount) {
      filterConditions.push(`AND({amount} >= ${params.minAmount}, {amount} <= ${params.maxAmount})`);
    } else if (params.minAmount) {
      filterConditions.push(`{amount} >= ${params.minAmount}`);
    } else if (params.maxAmount) {
      filterConditions.push(`{amount} <= ${params.maxAmount}`);
    }

    const filterByFormula = filterConditions.length ? `AND(${filterConditions.join(", ")})` : "";

    const maxRecords = settings.LIMIT || 8;
    const offset = (params.page ? (params.page - 1) * maxRecords : 0);

    const records = await base(TABLE_NAME)
      .select({
        filterByFormula,
        maxRecords,
        offset,
        sort: [{ field: "date", direction: "desc" }], // Adjust sorting if needed
      })
      .all();

    const formattedData = records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));

    console.log({formattedData,filterByFormula,maxRecords,offset})

    return {
      data: formattedData,
      error: "",
      tableSize: records.length,
    };
  } catch (error) {
    console.error("Error fetching expenses from Airtable:", error);
    return { data: [], error: "Failed to fetch expenses", tableSize: 0 };
  }
};