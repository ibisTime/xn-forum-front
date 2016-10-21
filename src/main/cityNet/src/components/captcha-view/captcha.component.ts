/**
 * Created by tianlei on 16/9/1.
 */
import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
    templateUrl: "captcha.component.html",
    selector: 'captcha-view'
})

export class CaptchaComponent implements OnInit {

  time = 60;
  disabled = false;
  btn;
  captcha: string;
  @Output() captchaClick = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  captchaClickAction($event){

    //发送事件默认是同步的,所以要把按钮赋值放在前面
    this.btn = $event.target;
    this.captchaClick.emit(null);

  }

  beginTime() {

    this.disabled = true;

    this.btn.innerText = `${this.time}` + 's';
    let timer = setInterval(() => {

      this.btn.innerText = `${this.time}s`;
      this.time = this.time - 1;

      if (this.time == 0) {

        this.disabled = false;
        this.time = 10;
        this.btn.innerText = "发送验证码";
        clearInterval(timer);
      }

    }, 1000);


  }

}
