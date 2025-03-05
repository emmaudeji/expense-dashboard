// src/services/airtableService.ts
import axios from "axios";
import { Expense } from "../types";

const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = "Expenses";
const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const airtableService = {
  async fetchExpenses(): Promise<Expense[]> {
    const response = await axios.get(AIRTABLE_URL, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    return response.data.records.map((record: any) => ({
      id: record.id,
      ...record.fields,
    }));
  },
  async addExpense(expense: Expense): Promise<void> {
    await axios.post(
      AIRTABLE_URL,
      { fields: expense },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );
  },
};

export default airtableService;
