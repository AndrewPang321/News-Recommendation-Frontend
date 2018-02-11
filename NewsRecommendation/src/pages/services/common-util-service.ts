import { Injectable } from "@angular/core";
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable()

export class CommonUtilService {

  constructor(private alertCtrl: AlertController, private translate: TranslateService) {
    
  }

  customizePopup(event, navCtrl, textTitle, textSubtitle) {
    let alert = this.alertCtrl.create({
      title: textTitle,
      subTitle: textSubtitle,
      buttons:[{
        text: this.translate.instant('COMMON_OK'),
        handler: () => {
            console.log(`Popup dismissed.`)
        }
      }]
    });
    alert.present();
  }

}
