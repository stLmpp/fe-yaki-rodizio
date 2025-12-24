import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MenuItem } from '../../models/menu-item';
import { QuantityInputComponent } from '../../../../components/quantity-input/quantity-input.component';

import { Modal } from '../../../../shared/modal/modal';

@Component({
  selector: 'app-menu-item-details',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    NgOptimizedImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    QuantityInputComponent,
  ],
  templateUrl: './menu-item-details.component.html',
  styleUrl: './menu-item-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemDetailsComponent extends Modal<
  {
    menuItem: MenuItem;
    quantity: number;
  },
  number
> {
  readonly quantity = signal(this.data.quantity);

  close() {
    this.ref.close(this.quantity());
  }
}
