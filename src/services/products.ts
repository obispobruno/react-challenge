import { products } from "../data/products";
import { IProduct } from "../interfaces/products";

export const loadProducts = async (): Promise<IProduct[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(products), 1000);
  });
