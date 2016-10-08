import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';

import {MY_SERVE} from "../services/services";
import {pages,components} from "../pages/page-component"


@NgModule({
  declarations: [
    MyApp,
    ...pages,
    components
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: true,
      backButtonText:"",
      iconMode: 'ios',
      mode: 'ios'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...pages
  ],
  providers: [...MY_SERVE,Storage]
})
export class AppModule {}

// {
//
//   tabsHideOnSubPages: true,
//     backButtonText:"",
//   iconMode: 'ios',
//   mode: 'ios'
//
// }
