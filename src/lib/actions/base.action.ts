"use server";

import { createClient } from "../supabase/server";
import { applyFilters } from "../supabase/utils";

type SingleResponse<T> = {
  data: T | null;
  error: Error | null;
};
type MultipleResponse<T> = {
  data: T[] | null;
  error: Error | null;
};

type BaseOption = {
  table: keyof Models;
};

type SingleOption<T> = BaseOption & {
  single: true;
  data: T;
};
type MultipleOption<T> = BaseOption & {
  single: false;
  data: T[];
};

type CreateOption<T> = SingleOption<T> | MultipleOption<T>;

export async function execCreate<T>(options: CreateOption<T>) {
  const supabase = await createClient();
  if (options.single) return await supabase.from(options.table).insert(options.data).single();
  return await supabase.from(options.table).insert(options.data);
}

type FilterOption<T> = BaseOption & {
  filters: Filter<Partial<T>>;
};

type ReadOption<T> = BaseOption &
  FilterOption<T> & {
    select?: string;
    currentPage?: number;
    pageSize?: number;
    sort?: string;
  };
export async function execRead<T>(option: ReadOption<T>) {
  const supabase = await createClient();
  let query = supabase.from(option.table).select(option.select ?? "*", { count: "exact" });

  // Apply filters if provided
  if (option.filters) {
    query = applyFilters(query, option.filters);
  }

  const currentPage = option.currentPage ?? 1;
  const pageSize = option.pageSize ?? 10;

  const offset = (currentPage - 1) * pageSize;
  query = query.range(offset, offset + pageSize - 1);

  if (option.sort) {
    query = query.order(option.sort);
  }

  return await query;
}

type UpdateRecordResponse<T> = {
  data: T | null;
  error: Error | null;
};

export async function updateRecord<T>(
  tableName: string,
  id: string | number,
  updatedFields: Partial<T>
): Promise<UpdateRecordResponse<T>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from(tableName).update(updatedFields).eq("id", id).single();

  return { data, error };
}

type DeleteRecordResponse = {
  success: boolean;
  error: Error | null;
};

export async function deleteRecord(tableName: string, id: string | number): Promise<DeleteRecordResponse> {
  const supabase = await createClient();
  const { error } = await supabase.from(tableName).delete().eq("id", id);

  return { success: !error, error };
}
