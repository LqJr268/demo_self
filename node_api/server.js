const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const db = require("./module/db");

const jwt = require("./module/jwt");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据

app.listen(88, function (req, res) {//服务器运行在88端口
  console.log("success");
});

//权限列表
var routerRole = [ { id: 205 }, { id: 300 }, { id: 500 }, { id: 700 }, { id: 204 }, { id: 1003 }, { id: 1001 }, { id: 203 }, { id: 1100 }, { id: 1200 }, { id: 1300 }, { id: 201 }, { id: 1002 }, { id: 1400 }, { id: 101 }]
// { id: 103 }, { id: 101 },

app.post("/login", function (req, res) {//"name": "lwy", "password": 123456,
  var whereObj = {}
  whereObj.name = req.body.adminName
  whereObj.password = req.body.passWord
  // console.log("登录查询条件",whereObj)
  db.find("userList",{
    whereObj
  },function (err,Result) {
    console.log(Result)
    if(Result.length>=1){
      var routerRoleSend = ''
      if(Result[0].primaryIdentity){//具有一级管理员身份
        routerRoleSend = JSON.parse(JSON.stringify(routerRole))
        routerRoleSend.push({ id: 103 })
        // console.log("一级管理员角色权限",routerRoleSend)
      }else if(Result[0].secondaryIdentity){//具有二级管理员身份
        routerRoleSend = JSON.parse(JSON.stringify(routerRole))
        routerRoleSend.push({ id: 102 })
        // console.log("卖家管理员角色权限",routerRoleSend)
      }else{
        routerRoleSend = JSON.parse(JSON.stringify(routerRole))
      }
      res.json({
        ok:1,
        msg:"登录成功",
        token: jwt.encode(Result[0].id,Result[0].password),
        //******上下架、添加商品的接口需要验证Token（**身份验证**） 查询接口只需要商户id做匹配 这样即使查到商品也无法修改商品
        //******Token可以使用生成时间、用户密码等信息生成 */
        //******下面的相关接口暂时未作Token认证 */

        //******上传等操作还需要对应接口验证该id对应的数据库中的权限是否开启！！（**某权限验证**） */
        routerRole: routerRoleSend,
        userId: Result[0].id,
        primaryIdentity: Result[0].primaryIdentity,
        secondaryIdentity: Result[0].secondaryIdentity
      })
    }else {
      console.log("登录不成功")
      res.json({
        ok: -1,
        msg: "用户不存在或密码错误"
      })
    }
  })
})

// 用户列表
app.post("/list", function (req, res) {
  var whereObj = {}
  var getObj = {}
  db.count("userList",
      whereObj
  ,function (err,Total) {
    db.find("userList",{
      // skip: parseInt(req.body.pageIndex)===1?parseInt(req.body.pageIndex-1)*parseInt(req.body.pageSize):parseInt(req.body.pageIndex-1)*parseInt(req.body.pageSize)-1,//服务端处理首页少一个的问题 即>2页获取数据时往前推一个
      skip: parseInt(req.body.pageIndex-1)*parseInt(req.body.pageSize),
      limit: parseInt(req.body.pageSize),
      sortObj:{
        id: 1
      },
      whereObj: whereObj,
      getObj: getObj
    },function (err,Result) {
      res.json({
        ok: 1,
        list: Result,
        totalNum: Total,
        totalPageNum: Math.ceil(Total / req.body.pageSize),
        msg: "用户列表请求成功"
      })
    })
  })

  // //测试请求时限
  // setTimeout(function () {
  //   res.json({
  //     ok: 1,
  //     list: listSend,
  //     totalNum: 50,
  //     totalPageSize: pageSize,
  //     msg: "列表请求成功"
  //   })
  // }, 5000)

})

//商品列表、商品数量相关
app.post("/Series.All", function (req, res) {
  // console.log("请求商品列表",req.body)

  //******构建条件查询 */
  var whereObj = {}

  //**查询下架·上架 */
  if(req.body.delisting) whereObj.Delisting = (req.body.delisting === 'true')//******处理布尔型字段 */

  //**查询商品名称 */
  // if(req.body.key) whereObj.Name = /4/ 正确
  // if(req.body.key) whereObj.Name = '/4/' 错误
  // if(req.body.key) whereObj.Name = `/${req.body.key}/`  模板字符串'/6/'不生效
  if(req.body.key) whereObj['Name']=new RegExp(req.body.key);//模糊查询参数 利用正则
  var getObj = {}

  //**查询卖家id */
  if(req.body.sellerId) whereObj['SellerId']=parseInt(req.body.sellerId);//卖家id

  //**查询商品类别 */
  if(req.body.typeName) whereObj['PhotographyCategory']=req.body.typeName;//类别名称



  //******构建指定字段 */
  var getObj = {}
  // console.log(req.body.fields.split(","))
  req.body.fields.split(",").map(item => {
    getObj[item] = 1
  })
  // getObj = {Name: 1,Price: 1}

  // console.log("whereObj",whereObj,"getObj",getObj)

  db.count("goodsList",
      whereObj
  ,function (err,Total) {
    db.find("goodsList",{
      // skip: parseInt(req.body.pageIndex)===1?parseInt(req.body.pageIndex-1)*parseInt(req.body.pageSize):parseInt(req.body.pageIndex-1)*parseInt(req.body.pageSize)-1,//服务端处理首页少一个的问题 即>2页获取数据时往前推一个
      skip: parseInt(req.body.pageIndex-1)*parseInt(req.body.pageSize),
      limit: parseInt(req.body.pageSize),
      sortObj:{
        Id: 1
      },
      whereObj: whereObj,
      getObj: getObj
    },function (err,Result) {
      res.json({
        ok:1,
        msg:"商品列表获取成功",
        Result,
        totalNum: Total,
        totalPageNum: Math.ceil(Total / req.body.pageSize)
      })
    })
  })
})

//单个商品
app.post("/Series.Get", function (req, res) {
  // console.log("请求商品列表",req.body)

  //******构建条件查询 */
  var whereObj = {}
  //**查询下架·上架 */
  whereObj['Id']=parseInt(req.body.id);
  var getObj = {}
  //******构建指定字段 */
  // console.log(req.body.fields.split(","))
  req.body.fields.split(",").map(item => {
    getObj[item] = 1
  })
  // getObj = {Name: 1,Price: 1}

  // console.log("whereObj",whereObj,"getObj",getObj)

  db.count("goodsList",
      whereObj
  ,function (err,Total) {
    db.findOne("goodsList",{      
      whereObj: whereObj,
      getObj: getObj
    },function (err,Result) {
      res.json({
        ok:1,
        msg:"单个商品获取成功",
        Result,
        Total
      })
    })
  })
})

//修改某商品上下架
app.post("/Series.Delisting",function (req,res) {
  // console.log("请求上下架",req.body)

  var whereObj = {}
  whereObj.Id = parseInt(req.body.id)//字符串转int
  var delisting = JSON.parse(req.body.delisting)//字符串转布尔

  // console.log("上下架接口参数整理",whereObj, delisting)

  db.updateOne("goodsList",
    whereObj
  ,{
    $set:{
      Delisting: delisting
    }
  },function (err,Result) {
    // console.log("请求上下架结果",Result)
    res.json({
      ok:1,
      msg:"上下架商品成功"
    })
  })
});

function toUpperCase(jsonObj) {
  //js中json对象key值首字母大写化 https://blog.csdn.net/baidu_28479651/article/details/78057626
  if(typeof(jsonObj)=='object'){
    for (var key in jsonObj){
      jsonObj[key.substring(0,1).toUpperCase()+key.substring(1)] = jsonObj[key];
      delete(jsonObj[key]);  
    }  
    return jsonObj;  
  }
  return data;
}

//添加商品
app.post("/Series.Insert",function (req,res) {
  // console.log("请求商品添加",req.body)

  var insertObj = {}
  //======处理 大小写 和 三种地区id的类型转换 和 Delisting的类型转换 和 8项属性的类型转换
  //******统一转换首字母大写 */
  var upperRes = toUpperCase(req.body);
  //******处理布尔型字段 */
  upperRes.Delisting = (upperRes.Delisting === 'true')
  //******处理int型字段 */
  upperRes.SellerId = parseInt(upperRes.SellerId) || null
  
  upperRes.CountryId = parseInt(upperRes.CountryId) || null
  upperRes.ProvinceId = parseInt(upperRes.ProvinceId) || null
  upperRes.CityId = parseInt(upperRes.CityId) || null

  upperRes.CoverHeight = parseInt(upperRes.CoverHeight) || null
  upperRes.CoverWidth = parseInt(upperRes.CoverWidth) || null
  upperRes.Price = parseInt(upperRes.Price) || null
  upperRes.DepositAmount = parseInt(upperRes.DepositAmount) || null
  upperRes.OriginalPicturesCount = parseInt(upperRes.OriginalPicturesCount) || null
  upperRes.RefinedPicturesCount = parseInt(upperRes.RefinedPicturesCount) || null
  upperRes.MakeupsCount = parseInt(upperRes.MakeupsCount) || null
  upperRes.ClothesCount = parseInt(upperRes.ClothesCount) || null
  upperRes.ShootGroupsCount = parseInt(upperRes.ShootGroupsCount) || null
  upperRes.ShootCounts = parseInt(upperRes.ShootCounts) || null
  upperRes.AdvanceBookingDays = parseInt(upperRes.AdvanceBookingDays) || null
  upperRes.ServiceDuration = parseInt(upperRes.ServiceDuration) || null
  upperRes.DeliveryDays = parseInt(upperRes.DeliveryDays) || null
  upperRes.AdvanceBookingDays = parseInt(upperRes.AdvanceBookingDays) || null
  upperRes.AdvanceBookingDays = parseInt(upperRes.AdvanceBookingDays) || null
  upperRes.AdvanceBookingDays = parseInt(upperRes.AdvanceBookingDays) || null
  upperRes.AdvanceBookingDays = parseInt(upperRes.AdvanceBookingDays) || null

  //======生成时间和id
  // var myDate = new Date();
  // myDate.getFullYear();    //获取完整的年份(4位,1970-????)
  // myDate.getMonth();       //获取当前月份(0-11,0代表1月)
  // myDate.getDate();        //获取当前日(1-31)
  // myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
  // myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)

  // myDate.getHours();       //获取当前小时数(0-23)
  // myDate.getMinutes();     //获取当前分钟数(0-59)
  // myDate.getSeconds();     //获取当前秒数(0-59)
  //**时间 */
  var myDate = new Date();
  var CreatedAt = myDate.getFullYear() + '-' +
  myDate.getMonth() + '-' +
  myDate.getDate() + 'T' +
  myDate.getHours() + ':' +
  myDate.getMinutes() + ':' +
  myDate.getSeconds()
  //**Id */
  var Id = parseInt(new Date().getTime().toString().substring(new Date().getTime().toString().length-8))

  insertObj = { ...upperRes,Id: Id,CreatedAt: CreatedAt }

  // console.log("请求商品添加详情",insertObj)

  db.insertOne("goodsList",
    insertObj
  ,function (err,Result) {
    // console.log("请求商品添加结果",Result)
    res.json({
      ok:1,
      msg:"添加商品成功"
    })
  })
});

//更新商品
app.post("/Series.Update",function (req,res) {
  // console.log("请求更新某商品",req.body)
  
  //======构建修改项目对象
  var upObj = {}
  //处理 大小写 和 三种地区id的类型转换 和 Delisting的类型转换 和 8项属性的类型转换
  //******统一转换首字母大写 */
  var upperRes = toUpperCase(req.body);
  //******处理布尔型字段 */
  upperRes.Delisting = (upperRes.Delisting === 'true')
  //******处理int型字段 */
  upperRes.SellerId = parseInt(upperRes.SellerId) || null

  upperRes.CountryId = parseInt(upperRes.CountryId) || null
  upperRes.ProvinceId = parseInt(upperRes.ProvinceId) || null
  upperRes.CityId = parseInt(upperRes.CityId) || null

  upperRes.CoverHeight = parseInt(upperRes.CoverHeight) || null
  upperRes.CoverWidth = parseInt(upperRes.CoverWidth) || null
  upperRes.Price = parseInt(upperRes.Price) || null
  upperRes.DepositAmount = parseInt(upperRes.DepositAmount) || null
  upperRes.OriginalPicturesCount = parseInt(upperRes.OriginalPicturesCount) || null
  upperRes.RefinedPicturesCount = parseInt(upperRes.RefinedPicturesCount) || null
  upperRes.MakeupsCount = parseInt(upperRes.MakeupsCount) || null
  upperRes.ClothesCount = parseInt(upperRes.ClothesCount) || null
  upperRes.ShootGroupsCount = parseInt(upperRes.ShootGroupsCount) || null
  upperRes.ShootCounts = parseInt(upperRes.ShootCounts) || null
  upperRes.AdvanceBookingDays = parseInt(upperRes.AdvanceBookingDays) || null
  upperRes.ServiceDuration = parseInt(upperRes.ServiceDuration) || null
  upperRes.DeliveryDays = parseInt(upperRes.DeliveryDays) || null
  upperRes.AdvanceBookingDays = parseInt(upperRes.AdvanceBookingDays) || null
  upperRes.AdvanceBookingDays = parseInt(upperRes.AdvanceBookingDays) || null
  upperRes.AdvanceBookingDays = parseInt(upperRes.AdvanceBookingDays) || null
  upperRes.AdvanceBookingDays = parseInt(upperRes.AdvanceBookingDays) || null

  upperRes.Id = parseInt(upperRes.Id) || null//**Id... */

  //
  upObj = upperRes

  //======构建查询对象
  var whereObj = {}
  whereObj.Id = parseInt(upperRes.Id)

  // console.log("请求更新某商品时","whereObj",whereObj,"upObj",upObj)

  db.updateOne("goodsList",whereObj,{$set: upObj}
    ,function (err,Result) {
    // console.log("请求上下架结果",Result)
    res.json({
      ok:1,
      msg:"更新某商品成功"
    })
  })
});

//查询所有类目
//商品列表、商品数量相关
app.post("/Type.All", function (req, res) {
  // console.log("请求类目列表",req.body)
  var getObj = 'PhotographyCategory'//** */
  db.distinct("goodsList",{
    getObj: getObj
  },function (Result) {
    console.log("去重查询字段结果",Result)
    res.json({
      ok:1,
      msg:"类目获取成功",
      Result,
    })
  })
})

// //******构建指定字段 */
// // db.collection_name.distinct(field,query,options)
// // field -----指定要返回的字段(string)
// // query-----条件查询(document)
// // options-----其他的选项(document)
// // db.inventory.distinct(“dept”)  //获取dept字段的不重复值
// // db.goodsList.distinct('PhotographyCategory')  //获取PhotographyCategory字段的不重复值
// var getObj = 'PhotographyCategory'
// db.distinct("goodsList",{
//   getObj: getObj
// },function (Result) {
//   console.log("去重查询字段结果",Result)
//   // res.json({
//   //   ok:1,
//   //   msg:"类目获取成功",
//   //   Result,
//   // })
// })

// //******构建指定字段 */
// var getObj = {PhotographyCategory: 1}
// db.find("goodsList",{
//   getObj: getObj
// },function (err,Result) {
//   console.log("普通查询字段结果",Result)
//   // res.json({
//   //   ok:1,
//   //   msg:"类目获取成功",
//   //   Result,
//   // })
// })



//***************************** */
//修改用户权限
app.post("/updataSecondaryIdentity",function (req,res) {
  // console.log("请求修改用户权限",req.body)

  var whereObj = {}
  whereObj.id = parseInt(req.body.id)//字符串转int

  var upObj = {}
  upObj.secondaryIdentity = (req.body.changeRes === true)
  //字符串转int

  // console.log("修改用户权限接口参数整理", whereObj, upObj)

  db.updateOne("userList",whereObj,{$set:upObj},
  function (err,Result) {
    // console.log("请求上下架结果",Result)
    res.json({
      ok:1,
      msg:"修改用户权限成功"
    })
  })
});