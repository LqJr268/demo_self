import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import axios from "axios";

import '@/assets/css/reset.css';
import '@/assets/css/common.css';
import '@/assets/css/theme/index.css';

Vue.config.productionTip = false//阻止启动生产消息

Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
Vue.prototype.$confirm = MessageBox.confirm

const loadingVm = {} // 记录vue实例 ↔ loading对象
/**
* 开启loading
* @param {string} customClass 类名, loading将覆盖在该类名对应的dom元素上. 如果不传入, 则整个页面都会loading
 */
Vue.prototype.$openLoading = function (customClass) {
  const option = {
    lock: true,
    background: 'rgba(255, 255, 255, 0.8)'
  }
  if (customClass) option.target = '.' + customClass
  const loading = this.$loading()
  loadingVm[this] = loading
}
/**
 * 关闭loading
 */
Vue.prototype.$closeLoading = function (customClass) {
  loadingVm[this].close()
  delete loadingVm[this]
}

// 深拷贝
Vue.prototype.$deepClone = obj => JSON.parse(JSON.stringify(obj))

// 格式话
import {
  Scrollbar,
  Icon, // icon
  Pagination, // 分页
  Dialog, // 对话框
  Dropdown, // 下拉菜单
  DropdownMenu, // 下拉菜单slot
  DropdownItem, // 下拉菜单item
  Menu, // 导航菜单
  Submenu, // 导航菜单slot
  MenuItem, // 导航菜单item
  MenuItemGroup, // 导航菜单二级菜单
  Input, // 输入框
  Autocomplete, // 输入框联想
  InputNumber, // 数字输入框
  Radio, // 单选
  RadioGroup, // 单选组合
  RadioButton, // 单选按钮
  Checkbox, // 多选
  CheckboxButton, // 多选按钮
  CheckboxGroup, // 多选组合
  Switch, // 开关
  Select, // 选择器
  Option, // 选择器条件
  OptionGroup, // 选择器分组
  Button, // 按钮
  ButtonGroup, // 按钮组合
  Table, // 表格
  TableColumn, // 表格列
  DatePicker, // 日期选择器
  TimeSelect, // 时间选择器
  TimePicker, // 时间选择器
  Popover, // 弹出窗
  Tooltip, // 文字提示
  Breadcrumb, // 面包屑
  BreadcrumbItem, // 面包屑item
  Form, // 表格
  FormItem, // 表格item
  Tabs, // 标签页
  TabPane, // 标签页item
  Tag, // 标签
  Tree, // 树形控件
  Upload, // 上传
  Progress, // 进度条
  Spinner, // 控件插入属性，可用于Loading
  Badge, // 数字标记
  Card, // 卡片
  Rate, // 评分
  Steps, // 进度条
  Step, // 进度条item
  Carousel, // 轮播
  CarouselItem, // 轮播item
  Collapse, // 折叠面板
  CollapseItem, // 折叠面板item
  Cascader, // 级联选择器
  Transfer, // 穿梭框
  Timeline, // 时间线
  TimelineItem, // 时间线 item
  Link, // 文字链接
  Image, // 懒加载
  Loading, // loading
  MessageBox, // 弹框
  Message, // 消息提示
  // Notification, // 通知
  Avatar, // 头像类
  Drawer, // 抽屉
  Divider, // 分割线
  Slider, // 滑块
  ColorPicker, // 颜色选择器
  Col, // 列布局
  Row // 行布局
} from 'element-ui';

Vue.use(Scrollbar);
Vue.use(Icon);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Autocomplete);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Spinner);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(Transfer);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Link);
Vue.use(Image);
Vue.use(Loading.directive);
Vue.use(Avatar);
Vue.use(Drawer);
Vue.use(Divider);
Vue.use(Slider);
Vue.use(ColorPicker);
// Vue.use(VueQuillEditor); // 富文本
// Vue.use(VueClipboard); // 粘贴板
Vue.use(Col); // 列布局
Vue.use(Row); // 行布局

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
