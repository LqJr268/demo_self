/* eslint-disable */
export default class typeScroll {


  constructor(bigContainer, clientW) {
    this.bigContainer = bigContainer;//轮播父容器（横向履带）
    this.clientW = clientW;//屏幕宽度

    this.x = 0;//履带段已滚过长度的负值 初始为0 每次滚动结束后更新
    this.disX = 0;//触摸点相对于履带起点的x轴距离（当前屏点击点距屏幕左距离+履带已滚过长度）

    this.upX = 0;//滑动停止时使用 记录停止时触摸点距离屏幕左边距
    this.downX = 0;//滑动开始时使用 记录开始时触摸点距离屏幕左边距

    this.iNow = 0;//当前轮播单元序号
    this.direction = 0;//划动方向  右划：1   左划：2   不动：0
  };

  // bodyScroll(event){
  //   event.preventDefault();
  // }

  // scrControl(t){
  //     if(t == 0){ //禁止滚动
  //         document.body.addEventListener('touchmove', this.bodyScroll, { passive: false });
  //     }else if( t == 1){ //开启滚动
  //         document.body.removeEventListener('touchmove',this.bodyScroll, {passive: false});
  //     }
  // }
 
  drag() {
    let _this = this;

    _this.bigContainer.addEventListener('touchstart', _this.fnStart.bind(this), false)
    _this.bigContainer.addEventListener('touchmove', _this.fnMove.bind(this), false);
    _this.bigContainer.addEventListener('touchend', _this.fnEnd.bind(this), false);
  };
  fnStart(ev) {
    let _this = this;
    // _this.scrControl(0)
    // console.log("start",ev.targetTouches[0].pageX)  //触摸点
    _this.disX = ev.targetTouches[0].pageX - _this.x;//触摸点相对于履带起点的x轴距离（当前屏点击点距屏幕左距离+履带已滚过长度）

    _this.downX = ev.targetTouches[0].pageX;//滑动开始时 触摸点距当前屏左的距离

    //移除过度变换属性  否则高度会回弹
    _this.bigContainer.style.transition='none'

    
  };

  fnMove(ev) {
    let _this = this
    // console.log("move",ev.targetTouches[0].pageX)
    _this.x = ev.targetTouches[0].pageX - _this.disX;//履带已滚过长度的负值（不断变化）

    _this.bigContainer.style.transform = 'translateX(' + _this.x + 'px)';

  };

  fnEnd(ev) {
    let _this = this
    // _this.scrControl(1)


    _this.bigContainer.removeEventListener('touchmove', _this.fnMove, false);
    _this.bigContainer.removeEventListener('touchend', _this.fnEnd, false);
    // var upX=0;//滑动停止时使用 记录停止时触摸点距离屏幕左边距
    // var downX=0;//滑动开始时使用 记录开始时触摸点距离屏幕左边距
    _this.upX = ev.changedTouches[0].pageX;//滑动停止时触摸点距离屏幕左边距
    // console.log(upX);
    // if(Math.abs(upX-downX)>(_this.clientW/2)){
    if (Math.abs(_this.upX - _this.downX) > 60) {//滑动开始和结束时的触摸点间隔大于60时进行变换
      if (_this.upX - _this.downX < 0) {
        _this.iNow++;
        if (_this.iNow == _this.bigContainer.children.length) {
          _this.iNow = _this.bigContainer.children.length - 1;
        } else {
          _this.direction = 2;//左划
        }
      } else {
        _this.iNow--;
        if (_this.iNow == -1) {
          _this.iNow = 0;
        } else {
          _this.direction = 1;//右划
        }
      }
    }
    _this.bigContainer.style.transition = 'all .2s linear';
    _this.bigContainer.style.transform = 'translateX(' + -_this.iNow * _this.clientW + 'px)';
    // console.log("停止滑动",upX);


    _this.bigContainer.addEventListener('transitionend',function(){
      // console.log("固定段");
      _this.bigContainer.style.transition='none';
      _this.x=-_this.iNow*_this.clientW;

    },false);

  };

  goSwiperItem(index){
    let _this = this
    _this.iNow = index
    _this.bigContainer.style.transition = 'all .4s linear';
    _this.bigContainer.style.transform = 'translateX(' + -_this.iNow * _this.clientW + 'px)';
    // console.log("停止滑动",upX);


    _this.bigContainer.addEventListener('transitionend',function(){
      // console.log("固定段");
      _this.bigContainer.style.transition='none';
      _this.x=-_this.iNow*_this.clientW;

    },false);
  }

}