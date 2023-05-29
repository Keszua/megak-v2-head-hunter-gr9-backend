import { Order } from './student';

export type PageOptionsRequest = {
  order?: Order;
  page?: number;
  take?: number;
};
