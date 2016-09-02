import {IMService} from "./im.serve";
import {KefuService} from "./kefu.serve";
import {WarnService} from "./warn.service";
import {UserAccountService} from "./user-account.serve";
import {HttpService} from "./http.service";
/**
 * Created by tianlei on 16/8/30.
 */

export const  MY_SERVE = [
  IMService,
  KefuService,
  WarnService,
  UserAccountService,
  HttpService

];
