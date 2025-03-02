// src/types/expense.ts
export interface Expense {
    id: number;
    name: string;
    amount: number;
    category: string;
    date: string;
    slug: string;
    status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  }
  
export interface Query {
  search?: string | null,
  category?: string | null,
  status?: string | null,
  page?: number | null,
  dateFrom?: string | null,
  dateTo?: string | null,
}