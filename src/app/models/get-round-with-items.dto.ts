export type GetRoundWithItemsDto = {
  roundId: string;
  items: {
    roundItemId: string;
    roundId: string;
    quantity: number;
    productId: string;
    productCategoryId: string;
  }[];
};
