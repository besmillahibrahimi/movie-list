// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function applyFilters<T>(queryBuilder: any, filters: Filter<T>) {
  let query = queryBuilder;
  for (const key of Object.keys(filters)) {
    const item = filters[key as keyof T];
    const value = item.value;
    switch (item.operator) {
      case "eq":
        query = query.eq(key, value);
        break;
      case "neq":
        query = query.neq(key, value);
        break;
      case "lt":
        query = query.lt(key, value);
        break;
      case "lte":
        query = query.lte(key, value);
        break;
      case "gt":
        query = query.gt(key, value);
        break;
      case "gte":
        query = query.gte(key, value);
        break;
      case "like":
        query = query.like(key, value);
        break;
      case "ilike":
        query = query.ilike(key, value);
        break;
      case "is":
        query = query.is(key, value);
        break;
      case "in":
        query = query.in(key, Array.isArray(value) ? value : [value]);
        break;
      case "contains":
        query = query.contains(key, Array.isArray(value) ? value : [value]);
        break;
      case "containedBy":
        query = query.containedBy(key, value);
        break;
      case "fts": // full-text search
        query = query.textSearch(key, value, { type: "plain" });
        break;
      case "plfts": // phrase-to-left full-text search
        query = query.textSearch(key, value, { type: "phrase" });
        break;
      case "phfts": // phrase full-text search
        query = query.textSearch(key, value, { type: "phrase" });
        break;
      case "wfts": // web search
        query = query.wfts(key, value, { type: "websearch" });
        break;
      default:
        throw new Error(`Unsupported filter operator: ${item.operator}`);
    }
  }

  return query;
}
