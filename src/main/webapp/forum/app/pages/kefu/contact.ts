import {Component, AfterViewInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {NextPage } from './nextpage';
// import { window } from './im.d.ts';
import {InAppBrowser, SafariViewController} from 'ionic-native';
import { KefuService} from "../../serve/kefu.serve";


@Component({
  templateUrl: 'build/pages/kefu/contact.html'
})
export class ContactPage implements AfterViewInit{


  //
  constructor(private navCtrl: NavController,
              public  imServe: KefuService) {
  }

  //
  url = "http://121.43.101.148:8065/im.html?tenantId=26192&restServer=a1.easemob.com&appKey=xiongniu-123%23chatapp&user=14444444443&to=13333333333&ticket=false&hideKeyboard=true"
  nextPage(event) {
    // this.navCtrl.push(NextPage);
    SafariViewController.isAvailable()
      .then(
        (available: boolean) => {
          if(available){

            SafariViewController.show({
              url: this.url,
              hidden: false,
              animated: false,
              transition: 'curl',
              enterReaderModeIfAvailable: true,
              tintColor: 'cyan'
            })
              .then(
                (result: any) => {
                  if(result.event === 'opened') console.log('Opened');
                  else if(result.event === 'loaded') console.log('Loaded');
                  else if(result.event === 'closed') console.log('Closed');
                },
                (error: any) => console.error(error)
              );

          } else {
            // use fallback browser, example InAppBrowser
          }
        }
      );

  }//

  ngAfterViewInit() {
    //2.登陆
    this.imServe.onTextMessage = (msg) => {
         this.imServe.handleFromMsg(msg);

    };
    this.imServe.onFileMessage = (msg) => {
      this.imServe.handleFromMsg(msg);
    }
    this.imServe.onPictureMessage = (msg) => {
      this.imServe.handleFromMsg(msg);
    }
    this.imServe.register('tianlei005',"123456","").then( ()  => {
      console.log('zhuce---连接成功');
    });
  }

  goChatRoom(from: string){
    console.log(from);
    this.navCtrl.push(NextPage,from);
  }

  imStart(){
    this.imServe.login('tianlei005',"123456");
    this.imServe.onOpened = () => {
      console.log('外部---连接成功');
    };
  }

  imClose(){
    this.imServe.close();

  }

  sendMsg(){
    console.log('发送消息');
    this.imServe.handleToMsg('serve:我要发信息','13333333333');
    this.imServe.sendTextMsg('serve:我要发信息','13333333333',(id, serverMsgId)=>{
      console.log('发送成功'+ id +'----'+ serverMsgId);
    }, "");
  }

}
