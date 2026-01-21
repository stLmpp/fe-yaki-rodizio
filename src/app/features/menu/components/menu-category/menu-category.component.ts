import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MenuStateProduct, MenuStateService } from '../../menu.state';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-menu-category',
  imports: [MenuItemComponent],
  templateUrl: './menu-category.component.html',
  styleUrl: './menu-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuCategoryComponent {
  private readonly menuState = inject(MenuStateService);

  readonly productCategoryName = input.required<string>();
  readonly productCategoryId = input.required<string>();
  readonly products = input.required<MenuStateProduct[]>();

  readonly categoryQuantity = computed(() =>
    this.menuState.selectCategoryQuantity(this.productCategoryId()),
  );

  protected onQuantityChange(productId: string, $event: number) {
    this.menuState.updateQuantity(this.productCategoryId(), productId, $event);
  }
}
