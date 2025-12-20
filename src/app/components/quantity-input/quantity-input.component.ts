import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  OnDestroy,
  output,
} from '@angular/core';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { FormValueControl } from '@angular/forms/signals';
import { filter, map, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';

type Action = 'add' | 'subtract';

@Component({
  selector: 'app-quantity-input',
  imports: [MatFormField, MatIcon, MatIconButton, MatInput],
  templateUrl: './quantity-input.component.html',
  styleUrl: './quantity-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantityInputComponent implements FormValueControl<number>, OnDestroy {
  constructor() {
    this.startChange$
      .pipe(
        map((action) => this.actions[action]),
        switchMap((updater) =>
          timer(0, 100).pipe(
            filter((tick) => tick === 0 || tick >= 5),
            tap(() => {
              this.value.update(updater);
            }),
            takeUntil(this.stop$),
          ),
        ),
      )
      .subscribe();
  }

  readonly value = model(0);
  readonly touched = model(false);
  readonly disabled = input(false);
  readonly readonly = input(false);

  readonly min = input<number | undefined>(0);
  readonly minValue = computed(() => this.min() ?? 0);
  readonly trashIcon = input(false, { transform: booleanAttribute });

  readonly delete = output();

  private readonly stop$ = new Subject<void>();
  private readonly startChange$ = new Subject<Action>();
  private readonly actions: Record<Action, (value: number) => number> = {
    add: (value) => value + 1,
    subtract: (value) => Math.max(this.minValue(), value - 1),
  };

  protected readonly subtractIcon = computed(() =>
    this.trashIcon() && this.value() === 1 ? 'delete' : 'remove',
  );

  protected subtractQuantity() {
    this.touched.set(true);
    this.startChange$.next('subtract');
  }

  protected addQuantity() {
    this.touched.set(true);
    this.startChange$.next('add');
  }

  protected onInput($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.value.set(target.valueAsNumber);
  }

  protected stopChangingQuantity() {
    this.stop$.next();
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
    this.startChange$.complete();
  }
}
