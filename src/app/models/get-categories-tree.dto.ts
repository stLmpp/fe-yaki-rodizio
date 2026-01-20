export type GetCategoriesTreeDto = {
  productCategories: ProductCategory[];
};

export type ProductCategory = {
  productCategoryId: string;
  productCategoryName: string;
  products: Product[];
  maxQuantity?: number;
  minQuantity?: number;
};

export type Product = {
  productId: string;
  productName: string;
  maxQuantity?: number;
  minQuantity?: number;
  productDescription?: string;
};
