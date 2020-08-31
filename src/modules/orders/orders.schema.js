import { schema } from 'normalizr';

const ordersById = new schema.Entity('ordersById');

export const ordersSchema = new schema.Array(ordersById);
