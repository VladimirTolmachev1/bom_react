import { schema } from 'normalizr';

const dish = new schema.Entity('dishes');

export const dishesSchema = new schema.Array(dish);
