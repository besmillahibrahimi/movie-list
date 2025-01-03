"use server";

import { createClient } from "../supabase/server";
import { applyFilters } from "../supabase/utils";

type BaseOption<Table extends string & keyof PublicSchema["Tables"]> = {
  table: Table;
};

type CreateOption<T extends keyof PublicSchema["Tables"]> = BaseOption<T> & {
  data: TablesInsert<T> | TablesInsert<T>[];
};

export async function execCreate<T extends keyof PublicSchema["Tables"]>(
  options: CreateOption<T>
) {
  const supabase = await createClient();
  return await supabase
    .from<T, PublicSchema["Tables"][T]>(options.table)
    // @ts-expect-error It's OK
    .insert(options.data);
}

type FilterOption<T extends keyof PublicSchema["Tables"]> = BaseOption<T> & {
  filters: Filter<Partial<Tables<T>>>;
};

type ReadOption<T extends keyof PublicSchema["Tables"]> = BaseOption<T> &
  FilterOption<T> & {
    select?: string;
    currentPage?: number;
    pageSize?: number;
    sort?: ISort<Tables<T>>;
  };
export async function execRead<T extends keyof PublicSchema["Tables"]>(
  option: ReadOption<T>
) {
  const supabase = await createClient();
  let query = supabase
    .from<T, PublicSchema["Tables"][T]>(option.table)
    .select(option.select ?? "*", { count: "exact" });

  // Apply filters if provided
  if (option.filters) {
    query = applyFilters(query, option.filters);
  }

  const currentPage = option.currentPage ?? 1;
  const pageSize = option.pageSize ?? 10;

  const offset = (currentPage - 1) * pageSize;
  query = query.range(offset, offset + pageSize - 1);

  if (option.sort) {
    query = query.order(option.sort?.sortBy.toString(), {
      ascending: option.sort?.ascending,
    });
  }

  return await query;
}

type UpdateRecordResponse<T extends keyof PublicSchema["Tables"]> = {
  data: Tables<T> | null;
  error: Error | null;
};

type UpdateOption<T extends keyof PublicSchema["Tables"]> = BaseOption<T> & {
  filters: Filter<Partial<TablesUpdate<T>>>;
  data: TablesUpdate<T>;
};

export async function execUpdate<T extends keyof PublicSchema["Tables"]>({
  data,
  filters,
  table,
}: UpdateOption<T>): Promise<UpdateRecordResponse<T>> {
  const supabase = await createClient();
  let query = supabase
    .from<T, PublicSchema["Tables"][T]>(table)
    // @ts-expect-error It's OK
    .update(data);

  query = applyFilters(query, filters);

  return await query;
}

type DeleteOption<T extends keyof PublicSchema["Tables"]> = BaseOption<T> & {
  filters: Filter<Tables<T>>;
};
type DeleteRecordResponse = {
  success: boolean;
  error: Error | null;
};

export async function deleteRecord<T extends keyof PublicSchema["Tables"]>(
  option: DeleteOption<T>
): Promise<DeleteRecordResponse> {
  const supabase = await createClient();
  let query = await supabase.from(option.table).delete();
  query = applyFilters(query, option.filters);
  const { error } = await query;
  return { success: !error, error };
}
