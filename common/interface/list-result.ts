export interface Pagination {
  pageSize: number;
  current: number;
  total: number;
}

export interface ListResult {
  statusCode: number;
  pagination: Pagination;
  data: any;
}
