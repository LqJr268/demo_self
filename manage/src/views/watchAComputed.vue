<template>
  <div class="main">
    watchAComputed
    <br />
    <!-- a: {{a}} -->
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "watchAComputed",
  components: {},
  data() {
    return {
      b: 6,
    };
  },

  //get set 一种对变量值操作的理念（取值与赋值拦截）即读写一个值的时候需要有操作空间（例如篡改这个值）时 需要用到set get

  //具体落实到实现：
  //******1、defineproperty(es5的一个api 给某东西设置get set)
  //******2、proxy（强大版）
  //******3、给对象添加get set
  //let obj = {
  //  get cache(){
  //    if(!this[CACHE]){
  //      this[CACHE]=new CacheManager(this);
  //    }
  //    return this[CACHE];
  //  },
  // }
  //******4、给class类添加get set  作用为该类一众实例的成员变量
  //******5、Reflect中的get, set

  //应用：
  //惰性求值（个人猜测可能是computed的原理？？）  vue双向绑定（在set时  进行dom操作）

  //“进行dom操作”：
  //****** 利用defineproperty设置set函数  在设置后的set方法体里  把改变的数据涉及的dom进行构造
  //****** 其中涉及diff算法 即比对新旧dom的差异找到一个最短最高效的路径 修改dom树部分结构对象进行部分渲染？？

  //===========================================
  // 工程角度
  // computed用于一个值需要data中另一些值计算出时使用（不能写异步逻辑？？）
  // watch用来监听一个值后需要进行一系列操作时（可以写异步逻辑？？）

  // 原理角度
  // computed极可能是利用get  set 做惰性求值？？ 有缓存性  但是！仅仅用于计算的那些原值变动时不会触发computed  必须这个computed值本身被访问（哪怕是console) 即这个加了get的值需要被调用触发才能有值
  // 更像是一种 --被调用的瞬间计算参与者的当前值 然后返回结果.

  // watch是一种观察者模式  观察的值变了就会变 哪怕不调用.

  // methods和computed的区别？？
  // methods需要手动调用 computed

  computed: {
    //极可能利用get  set 做惰性求值
    a: function () {
      console.log("computed");
      return this.b + 1;
    },
  },
  watch: {
    //观察者模式
    b() {
      console.log("watch_b", this.b);
    },
  },
  created() {
    setInterval(() => {
      this.b++;
    }, 1000);

    setInterval(() => {
      console.log("computed_a", this.a);
    }, 2500);
  },
};
</script>
<style lang="less" scoped>
</style>
