/**
 * Created by tianlei on 16/8/30.
 */
import {Injectable} from '@angular/core';
import {LoadingController, ToastController, AlertController,Loading} from "ionic-angular";

@Injectable()
export class WarnService {

  constructor(public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController) {
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

  alert2(msg: string,confirmAction?: () => void,cancleAction?: () => void,confirmTitle?,cancleTitle?){
    let  alert = this.alertCtrl.create({
      message: msg,
      buttons: [
        {
          text:cancleTitle? cancleTitle : '取消',
          handler: () => {
            cancleAction ? cancleAction() : 1;
          }
        },
        {
          text:confirmTitle? confirmTitle : '确定',
          handler: () => {
            confirmAction ? confirmAction() : 1;
            // typeof(confirmAction) === "undefined"  ? 1>0 : confirmAction();
          }
        }]
    });
    alert.present();
  }

  loading(msg?: string){
    let loading1: Loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: msg? msg :''
    });
    loading1.present();

    return loading1;
  }

  toast(msg: string, duration?: number, position?: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration ? duration : 300000,
      position: position ? position : 'top',
    });
    toast.present();
  }

}
