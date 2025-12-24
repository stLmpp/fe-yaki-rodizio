import { inject, Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { Modal } from './modal';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly dialog = inject(MatDialog);

  open<T extends Modal<unknown, unknown>>(
    template: ComponentType<T> | TemplateRef<T>,
    config: Omit<MatDialogConfig<unknown>, 'data'> & {
      data: T['data'];
    },
  ): MatDialogRef<T, T['_result']> {
    return this.dialog.open(template, config);
  }
}
