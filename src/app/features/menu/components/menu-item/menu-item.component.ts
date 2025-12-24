import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';
import { QuantityInputComponent } from '../../../../components/quantity-input/quantity-input.component';
import { MenuItem } from '../../models/menu-item';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MenuItemDetailsComponent } from '../menu-item-details/menu-item-details.component';
import { ModalService } from '../../../../shared/modal/modal.service';

@Component({
  selector: 'app-menu-item',
  imports: [QuantityInputComponent, MatIconButton, MatIcon],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  private readonly modalService = inject(ModalService);

  readonly menuItem = input.required<MenuItem>();

  readonly quantity = model(0);

  openDialog() {
    const ref = this.modalService.open(MenuItemDetailsComponent, {
      data: {
        menuItem: this.menuItem(),
        quantity: this.quantity(),
      },
    });

    ref.afterClosed().subscribe((quantity) => this.quantity.set(quantity ?? this.quantity()));
  }
}
