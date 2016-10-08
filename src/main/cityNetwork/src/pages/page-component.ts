/**
 * Created by tianlei on 16/9/29.
 */
import { TabsPage } from '../pages/tabs/tabs';
import {ForumPage} from "../pages/forum/forum";
import {HeadlinePage} from "../pages/headline/headline";
import {KefuPage} from "../pages/kefu/kefu";
import {MinePage} from "../pages/mine/mine";
import {LoginPage} from "../pages/user/login";
import {RegisterPage} from "../pages/user/register";
import {ForgetPwdPage} from "../pages/user/forgetPwd";
import {VideoPage} from "../pages/video/video";
import {ChatViewComponent} from "../components/chat-view/chat.component";
import {CaptchaComponent} from "../components/captcha-view/captcha.component";
import {IFramePage} from "../pages/headline/iframe";
import {CityChoosePage} from "../pages/headline/city-choose";
import {ContentPage} from "./forum/content/content";
import {ImPage} from "./mine/im/im";
import {SendArticlePage} from "./forum/send-article";
import {DetailPage} from "./mine/detail/detail";
import {SearchUserAndArticlePage} from "./headline/search-user-article";
import {TutorialPage} from "./tutorial/tutorial";

export const pages = [ TabsPage,
  ForumPage,
  HeadlinePage,
  KefuPage,
  MinePage,
  LoginPage,
  RegisterPage,
  ForgetPwdPage,
  VideoPage,
  IFramePage,
  CityChoosePage,
  ContentPage,
  MinePage,
  ImPage,
  SendArticlePage,
  DetailPage,
  SearchUserAndArticlePage,
  TutorialPage
];

export const components = [
  ChatViewComponent,
  CaptchaComponent
];