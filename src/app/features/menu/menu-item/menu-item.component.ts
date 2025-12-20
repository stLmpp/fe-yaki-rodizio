import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Field, form, min } from '@angular/forms/signals';
import { QuantityInputComponent } from '../../../components/quantity-input/quantity-input.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-menu-item',
  imports: [Field, QuantityInputComponent, JsonPipe],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  private readonly formValue = signal({
    quantity: 0,
  });

  readonly form = form(this.formValue, (schema) => min(schema.quantity, 0));
}
