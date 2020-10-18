/* eslint-disable */

export default class swiper {
  // 轮播部分：
  // 1、左右滑动x距离控制外部ul x轴偏移量  
  // 2、超过一定距离时，li标志iNow改变（控制当前第几号li展示），通过过度transition--transform平滑位移完ul后续的距离
  // 3、监听transitionend  固定ul

  // 高度变化部分：
  // 1、初始化时 将所有li统一为第一个高度 记录第一个li的 左划右预备高

  // 2、每次滑动  以“预备高”为基准 结合“当前高”计算高度差  照应x轴变化  
  // 3、以iNow为依据（超过变动线时iNow会更新）更新左右“预备高度”  并完成当前高度的更新
  // 4、固定当前高度  此时预备高度已更新完成


  constructor(bigContainer, itemFirst, data, clientW, iNow) {
    this.bigContainer = bigContainer;//轮播父容器（横向履带）
    this.itemFirst = itemFirst;//轮播的第一项
    this.data = data;//数据组
    this.clientW = clientW;//屏幕宽度
    this.iNow = iNow;//当前轮播单元序号

    //程序用到的计算属性
    this.direction = 0;//划动方向  右划：1   左划：2   不动：0
    this.heightNow = 0;//当前应展示的高度

    this.heightNextL = 0;//当前轮播块左边的下一个高度
    this.heightNextR = 0;//当前轮播块右边的下一个高度

    this.heightDifferenceL = 0;//当前轮播块与左边轮播块的高度差
    this.heightDifferenceR = 0;//当前轮播块与右边轮播块的高度差

    this.heightChangeL = 0;//当前轮播块向左变动时的变化单位
    this.heightChangeR = 0;//当前轮播块向右变动时的变化单位

    //
    this.x = 0;//履带段已滚过长度的负值 初始为0 每次滚动结束后更新
    this.x2 = 0;//滚动过程中  触摸点距屏幕左边距（不断变化  fnMove中进行使用）
    this.disX = 0;//触摸点相对于履带起点的x轴距离（当前屏点击点距屏幕左距离+履带已滚过长度）
    this.upX = 0;//滑动停止时使用 记录停止时触摸点距离屏幕左边距
    this.downX = 0;//滑动开始时使用 记录开始时触摸点距离屏幕左边距

  };

  bodyScroll(event) {
    event.preventDefault();
  }

  scrControl(t) {
    if (t == 0) { //禁止滚动
      document.body.addEventListener('touchmove', this.bodyScroll, { passive: false });
    } else if (t == 1) { //开启滚动
      document.body.removeEventListener('touchmove', this.bodyScroll, { passive: false });
    }
  }

  drag() {
    let _this = this;

    _this.init();

    if (_this.data.length > 1) {
      _this.bigContainer.addEventListener('touchstart', _this.fnStart.bind(this), false)
      _this.bigContainer.addEventListener('touchmove', _this.fnMove.bind(this), false);
      _this.bigContainer.addEventListener('touchend', _this.fnEnd.bind(this), false);
    }
  };

  fnStart(ev) {
    let _this = this;
    _this.scrControl(0)
    
    // console.log(ev.targetTouches)  //触摸点
    // console.log(_this.iNow,"滑动开始的iNow")  //滑动开始的iNow

    _this.disX = ev.targetTouches[0].pageX - _this.x;//触摸点相对于履带起点的x轴距离（当前屏点击点距屏幕左距离+履带已滚过长度）
    _this.downX = ev.targetTouches[0].pageX;//滑动开始时 触摸点距当前屏左的距离

    //移除过度变换属性  否则高度会回弹
    _this.bigContainer.style.transition = 'none'
    if (_this.iNow >= 1 && _this.iNow < _this.data.length - 1) {
      _this.bigContainer.children[_this.iNow].style.transition = 'none'
      _this.bigContainer.children[_this.iNow + 1].style.transition = 'none'
      _this.bigContainer.children[_this.iNow - 1].style.transition = 'none'
    } else if (_this.iNow === 0) {
      _this.bigContainer.children[_this.iNow].style.transition = 'none'
      _this.bigContainer.children[_this.iNow + 1].style.transition = 'none'
    } else if (_this.iNow === _this.data.length - 1) {
      _this.bigContainer.children[_this.iNow].style.transition = 'none'
      _this.bigContainer.children[_this.iNow - 1].style.transition = 'none'
    }
    // console.log("****************************",_this.data[_this.iNow].style)
    if (_this.data[_this.iNow].style === 'mp4') {
      // console.log("****************************",_this.bigContainer.children[_this.iNow].children[0])
      _this.bigContainer.children[_this.iNow].children[0].pause()
    }

  };

  fnMove(ev) {
    let _this = this
    // console.log(_this.iNow,"滑动中的iNow");
    // console.log(ev,event)
    _this.x = ev.targetTouches[0].pageX - _this.disX;//履带已滚过长度的负值（不断变化）
    // console.log(x);
    _this.bigContainer.style.transform = 'translateX(' + _this.x + 'px)';
    _this.x2 = ev.targetTouches[0].pageX;//移动中触摸点距屏幕左边距（不断变化）
    // console.log(x2);

    // 手动划动段
    if (_this.x2 > _this.downX) {
      // console.log("右划","当前轮播块:",_this.iNow,"downX",downX,"x2",x2)//当前展示的iNow
      if (_this.iNow > 0) {
        _this.bigContainer.style.height = _this.heightNow + Math.abs(_this.x + _this.iNow * _this.clientW) * _this.heightChangeL + 'px';
        _this.bigContainer.children[_this.iNow].style.height = _this.heightNow + Math.abs(_this.x + _this.iNow * _this.clientW) * _this.heightChangeL + 'px';
        _this.bigContainer.children[_this.iNow - 1].style.height = _this.heightNow + Math.abs(_this.x + _this.iNow * _this.clientW) * _this.heightChangeL + 'px';
      }
    } else if (_this.downX > _this.x2) {
      // console.log("左划","当前轮播块:",_this.iNow,"downX",downX,"x2",x2)//当前展示的iNow
      if (_this.iNow < _this.data.length - 1) {
        _this.bigContainer.style.height = _this.heightNow + Math.abs(_this.x + _this.iNow * _this.clientW) * _this.heightChangeR + 'px';
        _this.bigContainer.children[_this.iNow].style.height = _this.heightNow + Math.abs(_this.x + _this.iNow * _this.clientW) * _this.heightChangeR + 'px';
        _this.bigContainer.children[_this.iNow + 1].style.height = _this.heightNow + Math.abs(_this.x + _this.iNow * _this.clientW) * _this.heightChangeR + 'px';
      }
    }
  };

  fnEnd(ev) {
    let _this = this
    _this.scrControl(1)

    // console.log(_this.iNow,"滑动结束的iNow")  //滑动结束时的iNow

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
    _this.bigContainer.style.transform = 'translateX(' + -_this.iNow * _this.itemFirst.offsetWidth + 'px)';
    // console.log("停止滑动",upX);

    //弹动段
    if (_this.direction === 2) {//左划
      // console.log("已越界 左划弹动")
      // 初始化下一个
      _this.initthen();
      _this.bigContainer.style.height = _this.heightNow + 'px';

      _this.bigContainer.children[_this.iNow].style.height = _this.heightNow + 'px';

      _this.bigContainer.children[_this.iNow].style.transition = 'height .2s linear';

      if (_this.iNow >= 1) {
        _this.bigContainer.children[_this.iNow - 1].style.height = _this.heightNow + 'px';

        _this.bigContainer.children[_this.iNow - 1].style.transition = 'height .2s linear';

      }
      if (_this.iNow < _this.data.length - 1) {
        _this.bigContainer.children[_this.iNow + 1].style.height = _this.heightNow + 'px';

        _this.bigContainer.children[_this.iNow + 1].style.transition = 'height .2s linear';

      }
    } else if (_this.direction === 1) {//右划
      // console.log("已越界 右划弹动")
      _this.initthen();
      _this.bigContainer.style.height = _this.heightNow + 'px';

      _this.bigContainer.children[_this.iNow].style.height = _this.heightNow + 'px';

      _this.bigContainer.children[_this.iNow].style.transition = 'height .2s linear';

      if (_this.iNow >= 1) {
        _this.bigContainer.children[_this.iNow - 1].style.height = _this.heightNow + 'px';

        _this.bigContainer.children[_this.iNow - 1].style.transition = 'height .2s linear';

      }
      if (_this.iNow < _this.data.length - 1) {
        _this.bigContainer.children[_this.iNow + 1].style.height = _this.heightNow + 'px';

        _this.bigContainer.children[_this.iNow + 1].style.transition = 'height .2s linear';

      }

    } else if (_this.direction === 0) {
      // console.log("未越界 原地弹动")
      _this.bigContainer.style.height = _this.heightNow + 'px';

      _this.bigContainer.children[_this.iNow].style.height = _this.heightNow + 'px';

      _this.bigContainer.children[_this.iNow].style.transition = 'height .2s linear';

      if (_this.iNow >= 1) {
        _this.bigContainer.children[_this.iNow - 1].style.transition = 'height .2s linear';

        _this.bigContainer.children[_this.iNow - 1].style.height = _this.heightNow + 'px';

      }
      if (_this.iNow < _this.data.length - 1) {
        _this.bigContainer.children[_this.iNow + 1].style.transition = 'height .2s linear';

        _this.bigContainer.children[_this.iNow + 1].style.height = _this.heightNow + 'px';

      }
    }
    _this.bigContainer.addEventListener('transitionend', function () {
      // console.log("固定段");
      _this.bigContainer.style.transition = 'none';
      _this.x = -_this.iNow * _this.itemFirst.offsetWidth;
      //固定段
      if (_this.direction === 2) {
        _this.bigContainer.style.height = _this.heightNow + 'px';
        _this.bigContainer.children[_this.iNow].style.height = _this.heightNow + 'px';

        if (_this.iNow >= 1) {
          _this.bigContainer.children[_this.iNow - 1].style.height = _this.heightNow + 'px';

        }
        if (_this.iNow < _this.data.length - 1) {
          _this.bigContainer.children[_this.iNow + 1].style.height = _this.heightNow + 'px';

        }
        _this.direction = 0;

      } else if (_this.direction === 1) {
        _this.bigContainer.style.height = _this.heightNow + 'px';
        _this.bigContainer.children[_this.iNow].style.height = _this.heightNow + 'px';

        if (_this.iNow >= 1) {
          _this.bigContainer.children[_this.iNow - 1].style.height = _this.heightNow + 'px';

        }
        if (_this.iNow < _this.data.length - 1) {
          _this.bigContainer.children[_this.iNow + 1].style.height = _this.heightNow + 'px';

        }
        _this.direction = 0;


      } else if (_this.direction === 0) {
        _this.bigContainer.style.height = _this.heightNow + 'px';
        _this.bigContainer.children[_this.iNow].style.height = _this.heightNow + 'px';

        if (_this.iNow >= 1) {
          _this.bigContainer.children[_this.iNow - 1].style.height = _this.heightNow + 'px';

        }
        if (_this.iNow < _this.data.length - 1) {
          _this.bigContainer.children[_this.iNow + 1].style.height = _this.heightNow + 'px';

        }
        _this.direction = 0;

      }

    }, false);
  };

  // 初始化高度
  init() {
    //初始化外层容器总长度
    this.bigContainer.style.width = (this.bigContainer.children.length) * this.clientW + "px";

    //让外层容器高度为当前（这里为第一个）li高度
    this.bigContainer.style.height = (this.data[this.iNow].height / this.data[this.iNow].width) * this.clientW + 'px';

    //初始化所有li
    // for(let i=0;i<this.data.length;i++){
    //     this.bigContainer.children[i].style.height=(this.data[this.iNow].height/this.data[this.iNow].width)*this.clientW+'px';
    //     this.bigContainer.children[i].style.width=this.clientW+'px';
    //     if(this.data[i].url.indexOf('mp4')!=-1){
    //         this.bigContainer.children[i].style.backgroundImage="";
    //      //MP4格式 
    //     }else{
    //      this.bigContainer.children[i].style.backgroundImage="url("+this.data[i].url+")";
    //     }

    //     this.bigContainer.children[i].style.backgroundSize="cover";
    //     this.bigContainer.children[i].style.backgroundPosition="center";
    // }
    //初始化所有li
    for (let i = 0; i < this.data.length; i++) {
      this.bigContainer.children[i].style.height = (this.data[this.iNow].height / this.data[this.iNow].width) * this.clientW + 'px';
      this.bigContainer.children[i].style.width = this.clientW + 'px';
      if (this.data[i].url.indexOf('mp4') != -1) {
        //  this.bigContainer.children[i].style.backgroundImage="url("+this.data[i].url+")";
        var x = document.createElement("VIDEO");
        x.setAttribute("width", "100%");
        x.setAttribute("height", "100%");
        x.setAttribute("controls", "controls");
        x.setAttribute("src", this.data[i].url);
        this.bigContainer.children[i].appendChild(x);
        //MP4格式 
      } else {
        this.bigContainer.children[i].style.backgroundImage = "url(" + this.data[i].url + ")";
      }

      this.bigContainer.children[i].style.backgroundSize = "cover";
      this.bigContainer.children[i].style.backgroundPosition = "center";
    }

    // console.log(this.bigContainer.children)

    //当前高度--用heightNow记录
    this.heightNow = (this.data[this.iNow].height / this.data[this.iNow].width) * this.clientW;

    // console.log("data",this.data)

    if (this.data.length > 1) {
      //未来高度--用gaothen记录
      this.heightNextR = (this.data[this.iNow + 1].height / this.data[this.iNow + 1].width) * this.clientW;

      //计算高度差
      this.heightDifferenceR = this.heightNextR - this.heightNow;

      //计算横向一单位对应纵向的长度
      this.heightChangeR = this.heightDifferenceR / this.clientW;
    }

  };

  // 高度变化的init
  initthen() {
    if (this.iNow === 0) {
      //当前高度--用heightNow记录
      this.heightNow = (this.data[this.iNow].height / this.data[this.iNow].width) * this.clientW;

      //未来高度--用gaothen记录
      this.heightNextR = (this.data[this.iNow + 1].height / this.data[this.iNow + 1].width) * this.clientW;

      //计算高度差
      this.heightDifferenceR = this.heightNextR - this.heightNow;

      //计算横向一单位对应纵向的长度
      this.heightChangeR = this.heightDifferenceR / this.clientW;

    }
    else if (this.iNow === this.data.length - 1) {//最后一个li
      // console.log("theLast");

      //当前高度--用heightNow记录
      this.heightNow = (this.data[this.iNow].height / this.data[this.iNow].width) * this.clientW;

      //此时的then高为前一个高度
      this.heightNextL = (this.data[this.iNow - 1].height / this.data[this.iNow - 1].width) * this.clientW;

      //计算高度差
      this.heightDifferenceL = this.heightNextL - this.heightNow;//当前轮播块与左边轮播块的高度差is.heightNextL-this.heightNow;

      //计算横向一单位对应纵向的长度
      this.heightChangeL = this.heightDifferenceL / this.clientW//当前轮播块与左边轮播块的高度差is.clientW;


    } else {//中间的各个li
      // console.log("初始化下一个");

      //初始化后续的一个li
      //当前高度--用heightNow记录
      this.heightNow = (this.data[this.iNow].height / this.data[this.iNow].width) * this.clientW;

      //未来高度--用gaothen记录
      this.heightNextR = (this.data[this.iNow + 1].height / this.data[this.iNow + 1].width) * this.clientW;
      this.heightNextL = (this.data[this.iNow - 1].height / this.data[this.iNow - 1].width) * this.clientW;

      //计算高度差
      this.heightDifferenceR = this.heightNextR - this.heightNow;
      this.heightDifferenceL = this.heightNextL - this.heightNow;//当前轮播块与左边轮播块的高度差is.heightNextL-this.heightNow;

      //计算横向一单位对应纵向的长度
      this.heightChangeR = this.heightDifferenceR / this.clientW;
      this.heightChangeL = this.heightDifferenceL / this.clientW;//当前轮播块与左边轮播块的高度差is.clientW;

    }
    // console.log("当前heightNow",this.heightNow,"下一个heightNextL",this.heightNextL,"下一个heightNextR",this.heightNextR,"左高度变量",this.heightChangeL,"右高度变量",this.heightChangeR)

  };

  dataNow() {
    return this.iNow + 1;
  };

}