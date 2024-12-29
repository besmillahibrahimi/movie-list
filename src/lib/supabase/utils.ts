export function applyFilters<T>(query: any, filters: Filter<T>) {
  Object.keys(filters).forEach((key) => {
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
        query = query.in(key, value);
        break;
      case "cs": // contains
        query = query.contains(key, Array.isArray(value) ? value : [value]);
        break;
      case "cd": // contained by
        query = query.cd(key, value);
        break;
      case "fts": // full-text search
        query = query.fts(key, value);
        break;
      case "plfts": // phrase-to-left full-text search
        query = query.plfts(key, value);
        break;
      case "phfts": // phrase full-text search
        query = query.phfts(key, value);
        break;
      case "wfts": // web search
        query = query.wfts(key, value);
        break;
      default:
        throw new Error(`Unsupported filter operator: ${item.operator}`);
    }
  });

  return query;
}
