import { ErrorHandler, Injectable, Injector, NgZone, isDevMode } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    if(isDevMode)
      throw error;

    let zone = this.injector.get(NgZone);
    let toastr = this.injector.get(ToastrService);
    zone.run(() => toastr.error("Error", error.message));
  }

}
