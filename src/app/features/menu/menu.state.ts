import { Product, ProductCategory } from '../../models/get-categories-tree.dto';
import { computed, Injectable, signal } from '@angular/core';
import { GetRoundWithItemsDto } from '../../models/get-round-with-items.dto';

type MenuStateProduct = Product & { quantity: number };
type MenuStateProductCategory = Omit<ProductCategory, 'products'> & {
  products: MenuStateProduct[];
};

export type MenuState = {
  categoriesTree: MenuStateProductCategory[];
};

@Injectable({ providedIn: 'root' })
export class MenuStateService {
  private readonly state = signal<MenuState>({
    categoriesTree: [],
  });

  readonly categories = computed(() => this.state().categoriesTree);
  readonly categoriesWithQuantity = computed(() =>
    this.categories()
      .map((category) => ({
        ...category,
        products: category.products.filter((product) => product.quantity),
      }))
      .filter((category) => category.products.length),
  );

  updateQuantity(productCategoryId: string, productId: string, quantity: number) {
    this.state.update((state) => ({
      ...state,
      categoriesTree: state.categoriesTree.map((category) => {
        if (category.productCategoryId == productCategoryId) {
          category = {
            ...category,
            products: category.products.map((product) => {
              if (product.productId === productId) {
                product = { ...product, quantity };
              }
              return product;
            }),
          };
        }
        return category;
      }),
    }));
  }

  setCategoriesWithRound(categoriesTree: ProductCategory[], round: GetRoundWithItemsDto) {
    this.state.update((state) => ({
      ...state,
      categoriesTree: MenuStateService.mergeCategoriesWithRound(categoriesTree, round),
    }));
  }

  static mergeCategoriesWithRound(
    categoriesTree: ProductCategory[],
    round: GetRoundWithItemsDto,
  ): MenuStateProductCategory[] {
    const map = new Map(
      round.items.map((item) => [`${item.productCategoryId}-${item.productId}`, item]),
    );
    return categoriesTree.map((category) => ({
      ...category,
      products: category.products.map((product) => ({
        ...product,
        quantity: map.get(`${category.productCategoryId}-${product.productId}`)?.quantity ?? 0,
      })),
    }));
  }
}
