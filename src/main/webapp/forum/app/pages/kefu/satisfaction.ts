import { OnInit} from '@angular/core';

export class Satisfaction {
  private dom:any;
  private starsUl:any;
  private lis:any;
  private msg:any;
  private buttons:any;
  private cancelBtn:any;
  private submitBtn:any;
  private success:any;
  private session:any;
  private invite:any;
  private getStarLevel:any;
  private clearStars:any;
  private imServe:any;
  private flag = false;
  
  constructor(imServe) {
    this.imServe = imServe;
  }
  initArgs(){
    if(this.flag){
      return;
    }
    this.flag = true;
    this.dom = document.getElementById("satisfactionDialog");
    this.starsUl = this.dom.getElementsByTagName('ul')[0];
    this.lis = this.starsUl.getElementsByTagName('li');
    this.msg = this.dom.getElementsByTagName('textarea')[0];
    this.buttons = this.dom.getElementsByTagName('button');
    this.cancelBtn = this.buttons[0];
    this.submitBtn = this.buttons[1];
    this.success = this.dom.getElementsByTagName('div')[1];
    this.getStarLevel = ()=> {
      var count = 0;

      for ( var i = this.lis.length; i > 0; i-- ) {
        if ( this.lis[i-1].className == 'sel' ) {
          count += 1;
        }
      }
      return count;
    };
    this.clearStars = ()=> {
      for ( var i = this.lis.length; i > 0; i-- ) {
        this.lis[i-1].className = this.lis[i-1].className.replace("sel", "");
      }
    };

    this.starsUl.onclick = ( e )=> {
      var ev = e || window.event,
        that = ev.target || ev.srcElement,
        cur = that.getAttribute('idx');

      if ( !cur ) {
        return false;
      }
      for ( var i = 0; i < this.lis.length; i++ ) {
        if ( i < Number(cur) ) {
          this.lis[i].className = this.lis[i].className.replace("sel", "");
          this.lis[i].className = this.lis[i].className + " " + "sel";
        } else {
          this.lis[i].className = this.lis[i].className.replace("sel", "");
        }
      }
    };
  }
  cancelSatis(){
    this.dom.className = this.dom.className.replace('em-hide', "");
    this.dom.className = this.dom.className + ' ' +'em-hide';
  }
  submitSatis(){
    var level = this.getStarLevel();

    if ( level === 0 ) {
      alert('请先选择星级');
      return false;
    }
    //this.imServe.sendSatisfaction(level, this.msg.value, this.session, this.invite);

    this.msg.blur();
    this.success.className = this.success.className.replace("em-hide", "");
    setTimeout(function(){
      this.msg.value = '';
      this.clearStars();
      this.success.className = this.success.className + ' ' + 'em-hide';
      this.dom.className = this.dom.className + ' ' + 'em-hide';
    }, 1500);
  }
  doPingjia(inviteId:string, serviceSessionId:string){
     this.session = serviceSessionId;
     this.invite = inviteId;
     this.dom.className = this.dom.className.replace('em-hide', "");
  }
}
