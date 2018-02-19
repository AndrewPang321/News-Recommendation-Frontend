import { Injectable } from "@angular/core";
import { LoadingController } from 'ionic-angular';

@Injectable()

export class SpinnerService {

  public loadingSpinner: any;

  constructor(private loadingCtrl: LoadingController) {

  }

  show() {
    // console.log("Show spinner");
    this.loadingSpinner = this.loadingCtrl.create();
    this.loadingSpinner.present();
  }

  hide() {
    // console.log("Hide spinner");
    if (this.loadingSpinner) {
      this.loadingSpinner.dismiss();
    }
  }

}
