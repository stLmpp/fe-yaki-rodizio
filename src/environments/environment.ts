import { withDevToolsStub } from '@angular-architects/ngrx-toolkit';

export const environment = {
  production: true,
  apiUrl: '', // TODO
  storeWithDevTools: withDevToolsStub,
};
