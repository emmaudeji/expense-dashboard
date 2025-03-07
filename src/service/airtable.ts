import { Expense, Query } from "@/types";
import Airtable from "airtable";
import axios from "axios";

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
const api = axios.create({
  baseURL: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`,
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const fetchExpenses = async (
  params: Query
): Promise<{ data: Expense[]; tableSize?: number; error?: string }> => {
  try {
    const filterConditions: string[] = [];

    // Search filter (case insensitive search in name or category)
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filterConditions.push(`
        OR(
          FIND("${searchTerm}", LOWER({name})), 
          FIND("${searchTerm}", LOWER({category}))
        )
      `);
    }

    // Category Filter
    const selectedCategories = Array.isArray(params.category)
      ? params.category
      : typeof params.category === "string"
      ? JSON.parse(params.category)
      : [];

    if (selectedCategories.length) {
      const categoryFilter = selectedCategories
        .map((cat:string) => `{category} = "${cat}"`)
        .join(", ");
      filterConditions.push(`OR(${categoryFilter})`);
    }

    // Status Filter
    const selectedStatuses = Array.isArray(params.status)
      ? params.status
      : typeof params.status === "string"
      ? JSON.parse(params.status)
      : [];

      if (selectedStatuses.length) {
        const statusFilter = selectedStatuses
          .map((st:string) => `{status} = "${st}"`)
          .join(", ");
        filterConditions.push(`OR(${statusFilter})`);
      } else {
        // Exclude items where status = "ARCHIVED"
        filterConditions.push(`NOT({status} = "ARCHIVED")`);
      }
      

    // Date Filters
    if (params.dateFrom) {
      filterConditions.push(`IS_AFTER({date}, "${params.dateFrom}")`);
    }
    if (params.dateTo) {
      filterConditions.push(`IS_BEFORE({date}, "${params.dateTo}")`);
    }

    // Amount Range Filter
    if (params.minAmount || params.maxAmount) {
      const amountConditions = [];
      if (params.minAmount) amountConditions.push(`{amount} >= ${params.minAmount}`);
      if (params.maxAmount) amountConditions.push(`{amount} <= ${params.maxAmount}`);
      filterConditions.push(
        amountConditions.length > 1 ? `AND(${amountConditions.join(", ")})` : amountConditions[0]
      );
    }

    // Combine filters using AND
    const filterByFormula = filterConditions.length ? `AND(${filterConditions.join(", ")})` : "";

    // Fetch Records from Airtable
    const records = await base(TABLE_NAME)
      .select({
        filterByFormula,
        sort: [{ field: "date", direction: "desc" }],
      })
      .all();

    // Format Response Data
    const formattedData: Expense[] = records.map((record) => ({
      id: record.id,
      name: record.fields.name as string, 
      amount: record.fields.amount as number,
      category: record.fields.category as string,
      date: record.fields.date as string,
      slug: record.fields.slug as string,
      status: record.fields.status as "DRAFT" | "ACTIVE" | "ARCHIVED",
    }));

    // console.log({ records, formattedData, filterByFormula });

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


// Function to add a single expense
export const addExpense = async (expense: Expense): Promise<Expense> => {
  try {
    const response = await api.post("", { fields: {...expense, amount:Number(expense.amount)} });

    const record = response.data; // Airtable returns a single object
    console.log({expense,record, response})
    return {
      id: record.id,
      name: record.fields.name as string,
      amount: record.fields.amount as number,
      date: record.fields.date as string,
      category: record.fields.category as string,
      slug: record.fields.slug as string,
      status: record.fields.status as "DRAFT" | "ACTIVE" | "ARCHIVED",
    };
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
};

//  Update an expense
export const updateExpense = async ( updatedExpense: Partial<Expense>): Promise<Expense> => {
  const {id, ...newData} = updatedExpense
  const response = await api.patch(`/${id}`, {
    fields: {...newData, amount: Number(newData.amount)},
  });
  console.log({response})
  return { id: response.data.id, ...response.data.fields };
};


// Delete an expense
export const deleteExpense = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};

 