import {IMService} from "./im.service";
import {KefuService} from "./kefu.serve";
import {WarnService} from "./warn.service";
import {UserService} from "./user.service";
import {IMBaseService} from "./im-base.service";
import {HttpService} from "./http.service";
import {CityService} from "./city.service";
import {NavService} from "./nav.service";
import {PushService} from "./push.service";
import {WXService} from "./wx.service";

/**
 * Created by tianlei on 16/8/30.
 */

export const  MY_SERVE = [
  IMService,
  KefuService,
  WarnService,

  UserService,

  IMBaseService,
  HttpService,
  CityService,
  NavService,
  PushService,
  WXService

];
