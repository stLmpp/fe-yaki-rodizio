import { inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export abstract class Modal<D, R> {
  declare readonly _result: R;

  readonly ref = inject<MatDialogRef<unknown, R>>(MatDialogRef);
  readonly data = inject<D>(MAT_DIALOG_DATA);
}
