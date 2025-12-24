export interface MenuItem {
  name: string;
  description: string;
  imageUrl: string;
  category: string;

  // Constraints
  maxQuantity: number;
}
