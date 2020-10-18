module.exports = {
  devServer: {
    host: "127.0.0.1",
    port: 8090,
    //前端开发服务器运行的域名和端口号（即浏览器需要通过这个域名和端口号请求该网站的资源）
    open: true,
    proxy: {
    //******proxy配置项 通知webpack另起一个代理服务器 所以只有具有webpack工具的本地环境能够生效
      "/lwy": {// "/lwy"： 有了代理服务器配置后 浏览器发出的请求会访问代理服务器 代理服务器可能取消了同源限制 然后以服务器的身份向真实服务器访问（服务器间无同源策略） 这里接收以/lwy开头的请求并转发给真实服务器。
        // 真正访问的地址：target+axios请求的值
        target: "http://127.0.0.1:88",// 目标服务器的域名和端口号：通过该代理转发访问的真实服务器（本地demo利用node.js写的服务端口部署在88 详见api--server.js）。
        changeOrigin: true,// 是否开启代理
        pathRewrite: {// 重写你的地址
          "^/lwy": ""
        }
      }
    }
    // vue.config.js 修改完之后 要重启你的项目。
    // 项目部署在服务器 用户浏览器请求该服务器内的网站资源运行 发出向后端项目所在服务器的请求 但受到同源策略的限制


    //**************************笔记记录****************************

    //1、代理服务器配置
      //**只在开发环境当中起效果  因为devServer配置大概相当于利用webpack在本地开发环境配置的一个微型便利服务器  但项目最终打包build时不会进包  也就不会被托管到服务器并被浏览器请求到然后发挥作用

      //**实际工程中的代理可以利用如c、node等可以进行服务端编写的语言和工具编写（nginx就可以理解成利用c写成的一个轮子？？专门用于开启服务 解决代理）

      //**实际开发中跨域问题基本由服务端解决 例如允许某个ip发出的请求通过？？ 这里的ip与用户实际的物理ip地址不同。

      //**用户实际物理ip都不同 但是访问的站点部署的位置的ip固定。 服务端根据前端项目部署的服务器的ip（域名）来识别这个请求的ip。 可以在network --> xhr --> headers --> Request Headers --> Origin 查看到项目的前端部分部署的服务器ip（域名） 服务端允许这个ip发出的请求通过即可？？
      // https://blog.csdn.net/yup1212/article/details/87633272


    //2、webpack
      //**webpack需要node环境的支持 个人认为也是一个js轮子 它作为一个平台、架子，依照配置文件的配置方案来整合各个功能包，并在本地预览和项目打包（形成dist）时把项目整理成能够运行在浏览器环境的状态 类似一种“编译”的作用。

      //**项目真正打包上传时 依赖的node_modules包可能会被webpack抽取使用的核心代码部分参与打包？？ 形成dist 最终一起托管至代码仓库、服务器。形成dist的过程中 webpack本身也会被丢弃掉

      //**webpack的集成：
        //个人猜测webpack的集成分两部分？？
        //1、抽离普通的功能包（如ui组件包element）的核心代码？？
        //2、把项目文件分发给各个loader包进行文件转换？？如
        // module: {
        //     rules: [
        //         {
        //             test: /\.vue$/, // 让.vue, 都通过vue-loader, 这样就可以导入.vue文件了
        //             loader: 'vue-loader',
        //             options: vueLoaderConfig
        //         },
        //         {
        //             test: /\.js$/,  // 让.js, 都通过babel-loader, 这样就可以导入有es6语法的.js文件了
        //             loader: 'babel-loader',
        //             include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
        //         },
        //         {
        //             test: /\.scss$/,    // 让.scss, 都通依次通过sass-loader, css-loader, style-loader, 这样就可以导入.scss文件了
        //             use: [{
        //                 loader: "style-loader" // 将 JS 字符串生成为 style 节点
        //             }, {
        //                 loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
        //             }, {
        //                 loader: "sass-loader" // 将 Sass 编译成 CSS
        //             }]
        //         }
        //     ]
        // }

      //**webpack是vue-cli默认集成的打包工具 也可以手动更换其他工具 不同框架脚手架有各自默认集成的打包工具  都可以手动更换

      //**一个例子 jquery+bootstrap+js写的项目 虽然jquery+bootstrap基于js开发可以直接在浏览器运行  但是项目中如果用了模块化、es6的await async等功能许多浏览器不支持 而且代码丑化压缩（ugly）后放进浏览器运行更安全 那么这些就需要导入一些包来转换
        //这时可以直接导入能够实现各个目的的包们 但是每次打包时需要在命令行一个一个执行各个包的指令运行  但是如果先安装了webpack  就等于安装了一个架子 后面的各个包通过引入后只需运行webpack做打包  即可完成对架子对接的各个功能包的功能执行（webpack帮助我们陆续调用执行了各个包的功能）
        //loader是包的开发商根据webpack提供的文档开发的、让自己的包能对接进webpack的工具？？ 但并非每个npm i的包都有loader  处理文件的工具型的包才有loader？？ 例如npm i引入了一些ui组件（element） 的包  这些包不需要loader就可以对接进webpack并作用于项目，即在打包的时候被webpack做转换。  但是如果这个组件是基于vue的  那么还需要转换其中的vue文件成js文件。 这时需要loader做支持。
        //譬如使用了es6->es5需要babel的loader，检测所有js文件
        //再譬如转换.vue文件同样需要一个loader？？检测所有的vue文件。
        //一个以main.js为树干的vue项目的js逻辑脚本树 经过webpack的打包整理  最终变成原生js代码得以应用在浏览器里。


    //3、webpack不仅仅是个打包、“编译”的工具 他还是js模块化方案演化至今普遍应用的一种方案（浏览器对es6的支持不够  需要webpack提供各种转换）
      //js模块化的发展历程：
      //1、script标签引入js  link引入css  --会出现a.js与b.js变量的覆盖  相当于把各js文件里的代码拼在一起
      //2、amd  cmd  异步模块化方案？？ 可以理解为required请求js文件 在回调里形成一个“函数作用域”  || 这时同期出现了node的common.js方案：本地同步加载npm下载的模块（因为node可以用来写服务端端语言 即服务器请求本地的js脚本文件？？）
      //3、es6规范————模块化导入（import）导出（export）  与  webpack  （因为浏览器对es6的支持不够  需要webpack提供各种转换）


    //4、打包
      //本地**打包成浏览器能运行的状态**-->提交-->上传至远程代码仓库-->服务器拉取仓库代码（服务器进行配置 再取出dist中的代码）-->等待浏览器请求网站运行

      //本地提交-->上传至远程代码仓库-->服务器拉取仓库代码-->服务器**打包成浏览器能运行的状态**（但服务器打包时服务器性能、以及服务器和本地的环境差异可能会带来问题（node版本 操作系统windows<-->linux））-->等待浏览器请求网站运行
        //**这种套路也需要本地打包后做一个小的测试 因为npm run build后起一个小服务器测试和直接本地npm run dev的运行环境有很多不同  只是上传时利用git配置不做dist文件的提交*/

      //**add --> commit 清空源码更改
      //**npm run build 利用webpack打包产生dist更改
      //**add --> commit 清空dist更改

      //**npm run build 利用webpack打包产生dist更改
      //**add --> commit *清空dist更改和源码更改*!!

      //**在一个分支进行 build->add->commit 后 把该分支合并到其他分支 其他分支可以直接提交了
      //**如果合并后的分支再build一遍 虽然看起来产生了更改 但其实可能只是dist重新生成了一遍（具体现象可能是打包过程中报出许多更改然后打包过程结束后这些更改自动消失。。）  属于多余操作


    //5、npm
      //和打包、编译工具webpack相对应 npm是包管理工具 run dev  run build其实是package.json的
      // "scripts": {
      //   "serve": "vue-cli-service serve",
      //   "build": "vue-cli-service build",
      //   "lint": "vue-cli-service lint"
      // },
      // 中声明的、对一些方法进行调用的简写。 这些方法其实是对vue-cli支持的功能的调用（可以理解为驱动了npm下来的包“vue-cli-service”来实现“build”的功能 ？？） 而vue-cli实现这些功能又需要webpack的支持（实际上他的内部调用了webpack 然后webpack会驱动并调用各个功能包  对“文件树”做检测和处理  “编译”成能在浏览器运行的形式？？）

      //node-modules调用过程？？
      //**npm规定  一个包注册的可在命令行执行的命令（shell形式的命令）存放在.bin
      //即一个包如果需要它能够在命令行执行驱动  需要在.bin中注册命令  那些不需要命令行启动驱动的包不用注册（例如jQuery  只需要作为代码段引入）

      //命令行 npm run build --> 命令行 npm run vue-cli-service build --> .bin/vue-cli-service中
      // "$basedir/node"  "$basedir/../_@vue_cli-service@4.5.6@@vue/cli-service/bin/vue-cli-service.js" "$@"
      // -->@vue/cli-service/bin/vue-cli-service.js  中  const Service = require('../lib/Service')
      // --> ./lib  中  const merge = require('webpack-merge')

      //**package.json的"scripts": {...  可以注册更多命令？


    //6、总结node npm webpack vue
      //浏览器有很多部分 如css  html都有对应的引擎来解析运行  js也同样 如chrome的js引擎v8
      //node是集成了v8引擎、并添加了额外功能与api的一种创造出来的能够专门运行js的环境。
      //npm是集成在node下的工具 服务于node？？
      //webpack vue-cli都是需要node环境支持的用js写成的工具、轮子
      //js的运行需要一个环境  node和浏览器都是这样的环境
      //node里面运行js程序  人们封装了js写的功能形成了一些工具和轮子 例如webpack vue-cli  在轮子的基础上写出的项目  和轮子一起构成一个以js为真正底层内容的程序。这个程序可以运行于node环境  也可以运行于v8引擎即浏览器。


    //7、总结服务器与项目部署
      //所谓的服务器 本身是一个代码托管的硬件区域
      //项目托管后 安装不同的语言环境（tomcat node 再比如自带的c语言）后可以在当前语言的环境下开启一个“服务”（例如用c封装的专门用于开启服务 解决代理的“轮子”nginx）

      //前端的服务器：服务部署和开启后 项目运行 接收到浏览器的资源请求后返回网站资源
      //这里注意的点：
      // **1、history模式下的vue项目 需要部署配置每次发送全部网站资源？？**
      // **2、但是请求等等是浏览器运行的网站发出的 浏览器本身不能看作一个服务
      // **3、服务端的服务器--服务。 如果用**node配置一个服务 怎么解决代理跨域？？
      // **4、数据库其实也可以看作一个有自己端口的服务 等待接收后端部分的请求 返回数据给后端部分？？


      //8、包
        //
  }
}
//vue.config.js   vue环境下的webpack.config.js  vue环境下的配置文件
