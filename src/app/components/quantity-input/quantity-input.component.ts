import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'app-quantity-input',
  imports: [MatFormField, MatIcon, MatIconButton, MatInput],
  templateUrl: './quantity-input.component.html',
  styleUrl: './quantity-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantityInputComponent implements FormValueControl<number> {
  readonly value = model(0);
  readonly touched = model(false);
  readonly disabled = input(false);
  readonly readonly = input(false);

  readonly min = input<number | undefined>(0);
  readonly minValue = computed(() => this.min() ?? 0);
  readonly max = input<number | undefined>(undefined);
  readonly maxValue = computed(() => this.max() ?? Infinity);
  readonly trashIcon = input(false, { transform: booleanAttribute });
  readonly step = input(1);
  readonly editable = input(false);

  readonly delete = output();

  protected readonly subtractIcon = computed(() =>
    this.trashIcon() && this.value() === 1 ? 'delete' : 'remove',
  );

  protected addQuantity() {
    this.touched.set(true);
    this.value.update((value) => Math.min(this.maxValue(), value + this.step()));
  }

  protected subtractQuantity() {
    this.touched.set(true);
    this.value.update((value) => Math.max(this.minValue(), value - this.step()));
  }

  protected onInput($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.value.set(target.valueAsNumber);
  }
}
