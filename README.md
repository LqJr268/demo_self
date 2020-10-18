# demo_self
一个个人练习、技术总结的展示demo</br>
一个以图片型商品为主的、包含PC后台管理、移动端前台展示、服务端逻辑 和 mongodb数据库 等部分的demo</br>
使用vue框架进行PC后台和移动端前台的web项目编写  使用nodejs进行服务端逻辑编写</br>

其中node_api文件夹是基于nodejs编写的服务端逻辑</br>
主要是利用express框架编写服务端接口</br>
链接非关系型数据库mongodb</br>

其中manage文件夹是基于vue编写的PC端管理后台 来进行商品的管理。</br>
渲染层使用element-ui</br>
逻辑层面</br>
使用 vue-router路由守卫 和 服务端返回的身份令牌 进行多级身份鉴权体系的构建</br>
使用 addRoutes方法 结合 服务端返回的权限表 进行动态的安全性较高的路由体系构建</br>
使用 axios拦截器 进行项目请求的统一封装</br>
使用 mvvm的开发模式 按照vue的基本规范和手段进行项目开发</br>
使用混入、原型挂载、组件化等手段进行代码的封装抽离、优化复用</br>

其中reception文件夹是基于vue编写的移动端webApp前台</br>
包含较为复杂的渲染层交互动效封装（平滑变高轮播 划动手势翻页等</br>
使用 mvvm的开发模式 按照vue的基本规范和手段进行项目开发</br>

其中data文件夹是数据库文件 运行项目时需要运行mongodb数据库 创建名为lwy的数据库并将表goodsList userList导入启动
