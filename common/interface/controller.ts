import { PaginationQuery } from '../validator/pagination-query.validator';
import { Pagination } from './index';

export interface ControllerInterface {
  create: (body: any, createdBy: number | null) => any;
  update: (id: number, body: any, updatedBy: number | null) => any;
  remove: (id: number, deletedBy: number | null) => any;
  findOne: (id: number) => any;
  findAll: (
    paging: Pagination | PaginationQuery | null,
    filters: any | null,
  ) => any;
}
