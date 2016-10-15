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
import {SearchUserAndArticlePage} from "./headline/search-user-article";
import {TutorialPage} from "./tutorial/tutorial";
import {PlatDetailPage} from "./forum/detail/platDetail";
import {MineDetailPage} from "./mine/detail/detail";
import {ChatRoomPage} from "./mine/im/chat-room";
import {AddFriendPage} from "./mine/friend/addFriend";
import {FriendPage} from "./mine/friend/friend";
import {EditDetailPage} from "./mine/detail/editDetail";
import {AtPage} from "./forum/at";
import {CollectionPage} from "./mine/collection/collection";
import {CommentPage} from "./mine/im/comment";
import {SettingPage} from "./mine/setting/setting";
import {AccountPage} from "./mine/setting/account";
import {AboutusPage} from "./mine/setting/aboutus";
import {ForumCell} from "../components/forum-cell/forum-cell.component";
import {PlatChooseView} from "../components/plate-choose/plat-choose.component";
import {DraftPage} from "./mine/draft/draft";
import {MallPage} from "./headline/mall/mall";
import {GoodsDetailPage} from "./headline/mall/goods-detail";
import {ResetPwdPage} from "./user/resetPwd";
import {RelationPage} from "./mine/relationship-people/relationship";
import {PlaceholderView} from "../components/placeholder-view/placeholder-view";
import {SegmentView} from "../components/segment/segment";

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
  PlatDetailPage,
  MineDetailPage,
  SearchUserAndArticlePage,
  TutorialPage,
  ChatRoomPage,
  AddFriendPage,
  FriendPage,
  EditDetailPage,
  AtPage,
  CollectionPage,
  CommentPage,
  SettingPage,
  AccountPage,
  AboutusPage,
  DraftPage,
  MallPage,
  GoodsDetailPage,
  ResetPwdPage,
  RelationPage
];

export const components = [
  PlaceholderView,
  ForumCell,
  PlatChooseView,
  ChatViewComponent,
  CaptchaComponent,
  SegmentView
];
