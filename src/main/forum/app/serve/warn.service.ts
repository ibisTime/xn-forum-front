/**
 * Created by tianlei on 16/8/30.
 */
import {Injectable} from '@angular/core';
import {LoadingController, ToastController, Alert, AlertController} from "ionic-angular";

@Injectable()
export class WarnService {

  constructor(private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

  }

  alert(msg: string,confirmAction?: () => void){
    let  alert = this.alertCtrl.create({
      message: msg,
      buttons: [{
        text: '确定',
        handler: () => {
          confirmAction ? confirmAction() : 1;
          // typeof(confirmAction) === "undefined"  ? 1>0 : confirmAction();
        }
      }]
    });
    alert.present();
  }
  alertWithCanale(msg: string,confirmAction?: () => void){
    let  alert = this.alertCtrl.create({
      message: msg,
      buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: () => {
            confirmAction ? confirmAction() : 1;
            // typeof(confirmAction) === "undefined"  ? 1>0 : confirmAction();
          }
        }]
    });
    alert.present();
  }

  loading(msg?: string){
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: msg? msg :'加载中'
    });
    loading.present();

    return loading;
  }

  toast(msg: string, duration?: number, position?: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration ? duration : 2000,
      position: position ? position : 'top',
    });
    toast.present();
  }


}
