import { Product, ProductCategory } from '../../models/get-categories-tree.dto';
import { inject, Injectable } from '@angular/core';
import { GetRoundWithItemsDto } from '../../models/get-round-with-items.dto';
import { GetOrder } from '../../models/get-order';
import { signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { updateState } from '@angular-architects/ngrx-toolkit';
import { environment } from '../../../environments/environment';

export type MenuStateProduct = Product & { quantity: number };
type MenuStateProductCategory = Omit<ProductCategory, 'products'> & {
  products: MenuStateProduct[];
};
type MenuStateOrder = {
  orderId: string;
  maxQuantity?: number;
  minQuantity?: number;
};

export type MenuState = {
  categoriesTree: MenuStateProductCategory[];
  order: MenuStateOrder;
};

const initialState: MenuState = {
  categoriesTree: [],
  order: {
    orderId: '0',
  },
};

export const MenuStore = signalStore(
  { providedIn: 'root' },
  environment.storeWithDevTools('menu'),
  withState(initialState),
  withComputed(({ categoriesTree }) => ({
    categories: () => categoriesTree(),
    categoriesWithQuantity: () =>
      categoriesTree()
        .map((category) => ({
          ...category,
          products: category.products.filter((product) => product.quantity),
        }))
        .filter((category) => category.products.length),
  })),
  withMethods((store) => ({
    updateQuantity(productCategoryId: string, productId: string, quantity: number): void {
      updateState(store, 'updateQuantity', (state) => ({
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
    },
    setInitialState(
      categoriesTree: ProductCategory[],
      round: GetRoundWithItemsDto,
      order: GetOrder,
    ) {
      updateState(store, 'setInitialState', {
        categoriesTree: MenuStateService.mergeCategoriesWithRound(categoriesTree, round),
        order,
      });
    },
  })),
);

@Injectable({ providedIn: 'root' })
export class MenuStateService {
  private readonly store = inject(MenuStore);

  readonly categories = this.store.categories;
  readonly categoriesWithQuantity = this.store.categoriesWithQuantity;

  selectCategoryQuantity(productCategoryId: string) {
    const category = this.categoriesWithQuantity().find(
      (category) => category.productCategoryId === productCategoryId,
    );
    return category?.products?.length ?? 0;
  }

  updateQuantity(productCategoryId: string, productId: string, quantity: number) {
    this.store.updateQuantity(productCategoryId, productId, quantity);
  }

  setInitialState(categoriesTree: ProductCategory[], round: GetRoundWithItemsDto, order: GetOrder) {
    this.store.setInitialState(categoriesTree, round, order);
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
