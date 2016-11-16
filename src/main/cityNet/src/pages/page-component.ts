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
import {UpvotePage} from "./mine/im/upvote";
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
import {SystemMsgPage} from "./mine/im/systemMsg";
import {BZPlatDetailPage} from "./forum/detail/bzPlatDetail";
import {MinePlatePage} from "./mine/mine-plate/mine-plate";
import {MinePropertyDetail} from "./mine/property/mine-property-datail";
import {MineProperty} from "./mine/property/mine-property";
import {ChangeMobilePage} from "./mine/setting/changeMobile";
import {ChangeAccountPage} from "./mine/setting/changeAccount";
import {SysMsgDetailPage} from "./mine/im/sysMsgDetail";
import {MineArticlePage} from "./mine/mine-article/mine-article";
import {EndDateChoose} from "./forum/detail/end-date-choose";
import {AtMePage} from "./mine/im/atMe";
import {ReplyCommentPage} from "./forum/content/reply-comment";
import {JFPage} from "./mine/jfDetail/jfDetail";

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
    MinePlatePage,
  RelationPage,
  SystemMsgPage,
  BZPlatDetailPage,
  MinePropertyDetail,
  MineProperty,
  ChangeMobilePage,
  ChangeAccountPage,
  SysMsgDetailPage,
  MineArticlePage,
  EndDateChoose,
  AtMePage,
  ReplyCommentPage,
  JFPage,
  UpvotePage
];

export const components = [
  PlaceholderView,
  ForumCell,
  PlatChooseView,
  ChatViewComponent,
  CaptchaComponent,
  SegmentView
];
