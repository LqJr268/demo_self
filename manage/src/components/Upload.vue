<template>
  <div :class="{'yp-upload': true, 'disabled': disabled}">
    <!-- 上传图片的预览组件 -->
    <div v-show="tempImgList && tempImgList.length >= 0" class="uploaded-img-list">
      <!-- 图片容器 -->
      <!-- 使用index作为key, 因为url和文件名都可能重复 -->
      <div
        v-for="(item, index) of tempImgList"
        :key="index" class="img-container"
        :style="{width: width + 'px', height: height + 'px'}"
      >
      <!-- 视频 -->
        <video
          v-if="item.url.includes('.mp4') || item.url.includes('video/mp4')"
          :src="item.url"
          loop
          autoplay
          muted
          class="uploaded-video"
        ></video>
        <!-- 图片 -->
        <img v-else :src="item.url" class="uploaded-img" >

        <!-- 操作浮窗 -->
        <div v-show="!item._uploadStatus" class="img-handle-bar">
          <el-tooltip content="预览" placement="top">
            <i class="icon el-icon-zoom-in" @click="preview(item)"></i>
          </el-tooltip>
          <!-- @todo 视频暂不支持下载回本地 -->
          <el-tooltip content="下载" placement="top" v-if="item.type !== 'video/mp4'">
            <i class="icon el-icon-download" @click="download(item)"></i>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <i class="icon el-icon-delete" @click="remove(item)"></i>
          </el-tooltip>
        </div>
        <!-- 上传浮窗 -->
        <div v-if="item._uploadStatus === 'uploading'" class="upload-info uploading">
          <div class="item">{{item._uploadProgress}}%</div>
          <div class="item">上传中...</div>
        </div>
        <div v-if="item._uploadStatus === 'failed'" class="upload-info upload-failed" style="cursor: pointer" @click="upload(item)">
          <i class="el-icon-refresh item"></i>
          <div class="item">上传失败</div>
          <div class="item">点击重试</div>
        </div>
      </div>
      <!-- 自定义上传icon -->
      <div
        v-show="tempImgList.length < limit"
        class="upload-img-icon"
        :style="{width: width + 'px', height: height + 'px'}"
        @click="clickUploadIcon"
      >
        <img src="../assets/img/upload-series/folder.png" alt="" style="height: 32px">
        <div class="tips">{{tips || 123}}</div>
      </div>
    </div>

    <!-- 真正的上传框 -->
    <input
      v-show="false"
      ref="real-input"
      type="file"
      :multiple="limit > 1"
      :accept="accept"
      @change="realInputChange"
    >

    <!-- 弹窗: 预览图片 -->
    <el-dialog
      :visible.sync="isShowPreview"
      width="750px"
      custom-class="append-to-body-cropper-preview"
      :append-to-body="true"
    >
      <!-- <template slot="title">
         <div v-show="suggestSize.length" style="line-height: 1.5">
          <div>{{`建议尺寸: ${suggestSize[0]}px × ${suggestSize[1]}px`}}</div>
          <div>{{`当前尺寸: ${getImgSize(previewItem)}`}}</div>
        </div>
      </template> -->
      <video
        v-if="previewItem.url && previewItem.url.includes('.mp4')"
        :src="previewItem.url"
        autoplay
        muted
        loop
        class="preview-video-container"
      ></video>
      <div
        v-else
        class="preview-img-container"
        :style="{'background-image': `url(${previewItem.url})`}"
      ></div>
    </el-dialog>
  </div>
</template>
<script>
/**
 * 图片上传组件
 * @author
 * @vmodel 支持双向数据绑定, 需要传递进来旧的 图片数组 | 对象 | 字符串, 该数据会随着接下来的操作动态变更
 * ⭐ v-model 接收的数据格式1: [{url: ''}, {url: ''}], 即图片对象数组, 每个对象都必须包含url属性. 也可以包含其他属性
 * 接收的数据格式2: {url: ''} 即一个图片对象
 * 接收的数据格式3: ['url', 'url'] 即一个url数组
 * 接收的数据格式4: 'url' 即, 单个url
 * 返回的数据格式会和传入的数据格式保持一致, 如果你当前没有旧数据, 又希望返回指定格式的数据, 则可以这样传入
 * 传入: [null] 将返回[{url: ''}, {url: ''}]格式的图片对象数组
 * 传入: null, 将返回{url: ''}格式的一个图片对象
 * 传入: [], 将返回['url', 'url'] 格式的一个url数组
 * 传入: '', 将返回'url' 即, 单个url字符串
 * @prop {number} width 单个上传框的宽, 默认100, 单位px. **裁剪框会自动根据传进来的宽高, 计算裁剪比例**
 * @prop {number} height 单个上传框的高, 默认100
 * @prop {string} output-type 输出图片的格式, 默认`jpeg`, 可取值: jpeg || png || webp, 注意不能填入"image/jpg"之类的, 需要填入"jpeg", 详见vue-cropper文档
 * @prop {number} limit 允许上传图片的张数, 默认为1
 * @prop {string} accept 允许上传的图片格式, 默认"'image/jpg,image/jpeg,image/png'" 此外还支持'video/mp4'
 * @prop {number} max-img-size 允许上传的图片的最大大小, 单位KB
 * @prop {number} max-video-size 允许上传的视频的最大大小, 单位KB
 * @prop {string} desc 说明信息. 一般无需传入, 传入后在报错时将带上改名字方便调试
 * @prop {string} tips 提示
 * 注意建议尺寸只用于给用户进行提示, 没有其他效果, 不会影响裁剪比例. 裁剪比例始终由width和height参数控制
 * @prop {boolean} disabled 是否禁用该组件, 组件会显示为灰色, 且无法点击
 * 如果该组件需要进行图片回显, 则需要在回显数据接收到之前, 需要禁用该组件. 然后在传入要回显的url后, 再关闭禁用
 * 事实上, 每一次关闭禁用 → 打开禁用, 都会触发该组件的重新初始化. 而打开禁用后, 一旦传入了要回显的url, 该裁剪组件的状态就会固定下来
 * 接下来就只能和该组件进行正常交互. 而不能说: 再传入一个新的url, 重置组件状态, 重新回显并从头开始. 不能这样做
 * 如果想要回显别的内容, 或者说如果想要让该组件变为初始状态, 重新开始回显, 从头开始才在: 你需要:
 * 先打开disabled禁用该组件, 然后传入新的url, 最后关闭disabled重新启用该组件: 此时组件就会用新url为基础, 重新初始化, 重新回显, 重新操作了
 * 总之: 每一次禁用 → 不禁用, 都会触发该组件的重新初始化
 * @event change 上传成功/删除图片 时触发. 会把当前已成功上传的图片(或图片列表)传递给父组件. 注意上传失败不会触发该事件. v-model也是同理
 *
 * @example 最简单的用例: <upload v-model="imgs"></upload>
 *
 * 该组件的实现方法:
 * step1: **自定义**一个原生input上传框, 点击上传框时, 触发图片上传功能
 * step2: 紧接着触发vue-cropper的裁剪功能, 裁剪完成后, 把图片发送给七牛
 * step3: 展示上传的图片列表
 * 注意这里并没有使用element的upload组件
 */
import req from '@/req/req'

export default {
  name: 'upload',
  props: {
    value: {
      type: [Array, Object, String],
      default: () => { return {} }
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    tips: {
      type: String
    },
    outputType: {
      type: String,
      default: 'jpeg'
    },
    limit: {
      type: Number,
      default: 1
    },
    // 注意必须写成完整的mime类型
    accept: {
      type: String,
      default: 'image/jpg,image/jpeg,image/png'
    },
    maxImgSize: {
      type: Number,
      default: 99999999 // 单位KB
    },
    maxVideoSize: {
      type: Number,
      default: 99999999 // 单位KB
    },
    desc: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }

  },
  watch: {
    disabled: {
      immediate: true,
      handler (val) {
        // 如果启用了该组件
        if (val === false) {
          this.init() // 会重新进行组件初始化
        }
      }
    }
  },
  data () {
    return {
      // 图片上传到七牛的这个地址
      // 注意, 如果是formdata, 需要上传到https://upload.qiniup.com
      // 如果是base64, 则需要上传框https://upload.qiniup.com/putb64
      // -1表示, 图片大小由七牛自己计算, 而非我们手动指定
      qiniuUploadUrl: 'https://upload.qiniup.com/putb64/-1',
      imgDataFormat: '', // 用于编辑传入的图片数据的格式 'ARR-OBJ' | 'ARR-STR' | 'OBJ' | 'STR'
      // 临时图片列表: 包含上传成功和和上传失败的图片
      // 数据类型: [{name: xxx, url: xxx}, {name: xxx, url: xxx}]
      // 注意, 这里存放的**不是**要发送回父组件的图片列表
      // 发送给父组件的图片列表中, 只包含上传成功的图片
      // 而这个列表是上传成功/失败的都包含
      // 这个列表仅用于记录**要展示的**图片们
      // 把这个变量看做当前组件的内部状态
      tempImgList: [],
      // 选择
      curRealInputFile: {
        name: '',
        size: '',
        type: '',
        data: ''
      }, // 当前选择图片的信息
      // 预览
      isShowPreview: false, // 是否显示图片预览
      previewItem: '' // 被预览的图片/视图
    }
  },
  methods: {
    // 初始化组件
    // 最主要的逻辑就是: 根据用户传入的`value`的数据类型, 来决定保存图片的容器的数据结构
    init () {
      console.log(this.desc, ' 初始化', JSON.stringify(this.value))
      this.imgDataFormat = ''
      this.tempImgList = []
      // 获取初始图片数据(来自父组件)
      if (Array.isArray(this.value) && this.value.length && typeof this.value[0] === 'object') {
        // 1. 如果传进来的是[{...}, {...}, {...}]或[null]
        this.imgDataFormat = 'ARR-OBJ'
        this.tempImgList = this.value.filter(item => item && item.url)
      } else if (typeof this.value === 'object' && !Array.isArray(this.value)) {
        // 2. 如果传进来的是 {}
        this.imgDataFormat = 'OBJ'
        if (this.value && this.value.url) {
          this.tempImgList.push(this.value)
        }
      } else if ((Array.isArray(this.value) && this.value.length && typeof this.value[0] === 'string') || (Array.isArray(this.value) && this.value.length === 0)) {
        // 3. 如果传进来的是一个url数组或是一个空[]
        this.imgDataFormat = 'ARR-STR'
        // map函数, 无法过滤掉数组中的空项
        // 所以先要使用filter函数过滤空项
        this.tempImgList = this.value.filter(item => item).map(item => {
          if (item) {
            return {
              url: item
            }
          }
        })
      } else if (typeof this.value === 'string') {
      // 4. 如果传进来的是一个url字符串
        this.imgDataFormat = 'STR'
        if (this.value) {
          this.tempImgList.push({ url: this.value })
        }
      } else {
        throw new Error(this.desc + 'cropPicture: v-model传入的数据不被支持' + JSON.stringify(this.value))
      }
      if (this.limit > 1) {
        if (this.imgDataFormat === 'OBJ' || this.imgDataFormat === 'STR') {
          throw new Error(this.desc + ' cropPicture: limit > 1时, v-model应该传入一个数组. 当前传入的是: ' + JSON.stringify(this.value))
        }
      }
      console.log(this.desc, '图片裁剪: 传入的数据格式是: ', this.imgDataFormat, this.tempImgList)
    },

    // 点击上传图标
    clickUploadIcon () {
      if (this.disabled) {
        return
      }
      this.beforeClick = false
      // 打开系统图片管理器之前的回调
      if (!this.beforeClick) {
        console.log('点击上传图标')
        const realInput = this.$refs['real-input']
        // 先清空表单内容, 否则再次上传同一张照片, 会不允许上传
        this.$refs['real-input'].value = ''
        realInput.click()
      }
    },

    // 获取到本地选择的文件
    realInputChange (e) {
      console.log('真正上传框change', arguments)
      this.curRealInputFile = {}
      // @see https://www.jianshu.com/p/c619b81e8f04
      // @see https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
      // @see https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL
      // 获取上传文件基本信息
      if (!e.target.files || !e.target.files[0]) return

      // 内部工具函数: 从本地加载图片到内存
      const _loadFile = (file) => {
        // 校验图片类型
        if (!this.accept.includes(file.type)) {
          this.$message.error(`不支持的文件类型 ${file.type}`)
          return
        }
        // 校验大小
        if (file.type === 'video/mp4') {
          if ((file.size / 1024) > this.maxVideoSize) {
            this.$message.error(`视频大小不能大于 ${this.maxVideoSize / 1024} MB`)
            return
          }
        } else {
          if ((file.size / 1024) > this.maxImgSize) {
            this.$message.error(`图片大小不能大于 ${this.maxImgSize / 1024} MB`)
            return
          }
        }
        const reader = new FileReader()
        // 读取图片数据是一个异步操作, 这里在读取完成后触发
        reader.addEventListener('load', () => {
          this.curRealInputFile = {
            name: file.name,
            size: file.size,
            type: file.type,
            data: reader.result
          }
          console.log('获取到的图片信息是: ', this.curRealInputFile)
          // 触发上传
          const curImg = {
            name: this.curRealInputFile.name,
            url: this.curRealInputFile.data,
            type: file.type,
            size: file.size
          }
          curImg._uploadProgress = null
          curImg._uploadStatus = null
          this.tempImgList.push(curImg) // 将裁剪好的图片推入临时数组, 先展示出来
          // this.upload(curImg); // 上传刚才裁剪好的图片
          this.upload(curImg)
        }, false)

        // 开始读取数据, 读取为base64编码, 读取完会触发上面的load事件
        reader.readAsDataURL(file)
      }

      // 批量上传
      const files = Array.from(e.target.files).slice(0, this.limit - this.tempImgList.length)
      console.log('本次加载进来的图片: ', files)
      files.forEach(file => _loadFile(file))
    },

    // 上传到七牛
    async upload (imgInfo) {
      console.log('要上传的图片: ', imgInfo)
      // 添加两个额外属性, 用于记录该组件的上传状态
      imgInfo._uploadProgress = 0
      imgInfo._uploadStatus = 'uploading'

      // 获取token
      console.log('→ 获取token')
      let token
      await req.common.getUptoken()
        .then(res => {
          console.log('← 获取到的token: ', res)
          token = res.data.Token
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '获取上传token失败'
          })
          console.error(err)
        })

      // @see 官方示例 https://developer.qiniu.com/kodo/kb/1326/how-to-upload-photos-to-seven-niuyun-base64-code
      const base64 = imgInfo.url
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('上传成功', xhr)
            // 如果上传成功
            // 修改curImg的url, 从base64修改为七牛返回的图片地址, 其实就是在修改临时变量列表, 因为引用类型内存地址指向一处
            const response = JSON.parse(xhr.responseText)
            imgInfo.url = response.url
            imgInfo.height = response.height
            imgInfo.width = response.width
            // 移除图片上的上传状态标记
            imgInfo._uploadProgress = null // 先设置为null, 触发vue的监听
            imgInfo._uploadStatus = null
            delete imgInfo._uploadStatus // 然后delete清除这两个字段, 因为不用将这两个字段发送回父组件
            delete imgInfo._uploadProgress
            // 遍历临时变量数组, 把其中url是七牛url的几张挑出来(上传成功的), 发回给父组件
            const res = this._calReturnData()
            this.$emit('input', res)
            this.$emit('change', res)
          } else {
            console.log('上传失败', xhr)
            imgInfo._uploadStatus = 'failed'
            imgInfo._uploadProgress = 0
          }
        }
      }

      // 设置上传进度监听
      xhr.upload.addEventListener('loadstart', () => {
        console.log('进度: 上传开始')
        imgInfo._uploadProgress = '上传开始'
      })
      xhr.upload.addEventListener('error', () => {
        console.log('进度: 上传失败')
        imgInfo._uploadProgress = '上传失败'
      })
      xhr.upload.addEventListener('progress', (e) => {
        console.log('进度: 上传中')
        // 上传进度
        imgInfo._uploadProgress = Math.floor((e.loaded / e.total) * 100)
      })

      // 真正发送
      xhr.open('POST', this.qiniuUploadUrl, true)
      // 注意: 根据官方实例, base64的contenttype要设置成这样
      xhr.setRequestHeader('Content-Type', 'application/octet-stream')
      // 注意: UpToken后面有一个空格, 然后才是你的token
      xhr.setRequestHeader('Authorization', `UpToken ${token}`)
      // 注意: 上传base64时, 需要将开头的data:image/jpeg;base64,截掉
      xhr.send(base64.split(',')[1])
    },

    // 用于测试的upload方法, 在没有对接接口前, 可以用该方法模拟上传
    // async upload (imgInfo) {
    //   console.log('要上传的图片: ', imgInfo)
    //   // 添加两个额外属性, 用于记录该组件的上传状态
    //   imgInfo._uploadProgress = 0
    //   imgInfo._uploadStatus = 'uploading'

    //   // 移除图片上的上传状态标记
    //   imgInfo._uploadProgress = null // 先设置为null, 触发vue的监听
    //   imgInfo._uploadStatus = null
    //   delete imgInfo._uploadStatus // 然后delete清除这两个字段, 因为不用将这两个字段发送回父组件
    //   delete imgInfo._uploadProgress
    //   // 遍历临时变量数组, 把其中url是七牛url的几张挑出来(上传成功的), 发回给父组件
    //   const res = this._calReturnData()
    //   this.$emit('input', res)
    //   this.$emit('change', res)
    // },

    // 预览图片
    preview (file) {
      console.log('preview', file)
      this.isShowPreview = true
      this.previewItem = file
    },

    // 获取图片大小
    getImgSize (url) {
      let res = ''
      const widthAndHeight = url.split('?')[1]
      if (!widthAndHeight) return res
      const widthAndHeightArr = widthAndHeight.split('&')
      const width = widthAndHeightArr[0].split('=')[1]
      const height = widthAndHeightArr[1].split('=')[1]
      res = `${width}px × ${height}px`
      console.log('获取到的图片宽高: ', width, height)
      return res
    },

    // 下载图片
    download ({ url }) {
      const canvas = document.createElement('canvas')
      const image = new Image()
      image.crossOrigin = 'Anonymous'
      image.src = url
      const aDom = document.createElement('a')
      image.onload = e => {
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        const dataUrl = canvas.toDataURL('image/jpg')
        aDom.href = dataUrl
        aDom.download = 'image'
        aDom.click()
      }
    },

    // 移除图片
    remove (rmImg) {
      console.log('remove', arguments)
      this.tempImgList = this.tempImgList.filter(item => item !== rmImg)
      const res = this._calReturnData()
      this.$emit('input', res)
      this.$emit('change', res)
    },

    // 根据tempImgList, 计算返回给父组件的数据格式: 要和父组件传入的原始数据格式保持一致
    // _calReturnData () {
    //   let res;
    //   // 先挑选出上传成功的图片
    //   const uploadedImgList = this.tempImgList.map(item => {
    //     if (!item.url.startsWith('data:')) { // 只返回不是base64编码的图片
    //       return JSON.parse(JSON.stringify(item)); // 而且反正的是副本
    //     } else {
    //       return null;
    //     }
    //   }).filter(item => item);
    //   console.log('上传成功的图片有: ', uploadedImgList);

    //   // 按指定格式返回返回给父组件
    //   if (this.imgDataFormat === 'ARR-OBJ') {
    //     res = uploadedImgList;
    //   } else if (this.imgDataFormat === 'OBJ') {
    //     if (uploadedImgList.length) {
    //       res = uploadedImgList[0];
    //     } else {
    //       res = null;
    //     }
    //   } else if (this.imgDataFormat === 'ARR-STR') {
    //     if (uploadedImgList.length) {
    //       res = uploadedImgList.map(item => item.url);
    //     } else {
    //       res = null;
    //     }
    //   } else if (this.imgDataFormat === 'STR') {
    //     if (uploadedImgList.length) {
    //       res = uploadedImgList[0].url;
    //     } else {
    //       res = null;
    //     }
    //   }
    //   // 在给父组件返回信息之前, 标记程序已经开始运行, 不再允许重复初始化
    //   console.log('图片裁剪: 返回给父组件的数据格式和数据是: ', this.imgDataFormat, res);
    //   return res;
    // }

    // 用于测试
    _calReturnData () {
      let res
      // 先挑选出上传成功的图片
      const uploadedImgList = this.tempImgList
      console.log('上传成功的图片有: ', uploadedImgList)

      // 按指定格式返回返回给父组件
      if (this.imgDataFormat === 'ARR-OBJ') {
        res = uploadedImgList
      } else if (this.imgDataFormat === 'OBJ') {
        if (uploadedImgList.length) {
          res = uploadedImgList[0]
        } else {
          res = null
        }
      } else if (this.imgDataFormat === 'ARR-STR') {
        if (uploadedImgList.length) {
          res = uploadedImgList.map(item => item.url)
        } else {
          res = null
        }
      } else if (this.imgDataFormat === 'STR') {
        if (uploadedImgList.length) {
          res = uploadedImgList[0].url
        } else {
          res = null
        }
      }
      // 在给父组件返回信息之前, 标记程序已经开始运行, 不再允许重复初始化
      console.log('图片裁剪: 返回给父组件的数据格式和数据是: ', this.imgDataFormat, res)
      return res
    }
  }
}
</script>
<style lang="less" scoped>
.yp-upload {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  &.disabled {
    opacity: 0.7;
  }
  // 选择icon
  .upload-img-icon {
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
    border: 2px dashed #D4DCE3;
    color: #CCCCCC;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    i {
      font-size: 40px;
    }
    .tips {
      font-size: 14px;
      font-weight: bold;
      margin-top: -10px;
    }
  }
  &.disabled .upload-img-icon {
    cursor: no-drop;
  }
  .plus {
    font-size: 20px;
    color: #D2D2D2;
    z-index: 50;
  }

  // 图片展示列表
  .uploaded-img-list {
    display: flex;
    flex-wrap: wrap;
    .img-container {
      position: relative;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 14px;
      margin-right: 14px;
      display: flex;
      align-items: center;
      background: #eee;
      .uploaded-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 3px;
      }
      .uploaded-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 3px;
      }
      // 操作浮窗
      .img-handle-bar {
        position: absolute;
        left: 0;
        top: 0;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        display: none;
        background: rgba(0, 0, 0, 0.6);
        .icon {
          color: #fff;
          font-size: 14px;
          margin: 5px;
          cursor: pointer;
        }
      }

      &:hover .img-handle-bar {
        display: flex;
      }
       // 图片上传信息浮窗
      .upload-info {
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.6);
        font-size: 13px;
        color: #fff;
        .item {
          height: 20px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>

<style lang="less">
  // 注意这个没有scoped, 是对所有组件生效的
  // 所以类名一定要起的足够特殊
  // 因为需要把裁剪弹窗放到body中, 所以需要定义这样一个非scoped的样式
  // 才能对body下的裁剪弹窗生效
  .append-to-body-cropper-container {
    .cropper {
      width: 100%!important;
      height: 500px!important;
    }
    .cropper-button-container {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      .el-button {
        width: 104px;
        font-size: 14px;
      }
    }
  }

  // 图片预览
  .append-to-body-cropper-preview {
    /deep/ .el-dialog__body {
      display: flex;
      align-items: center;
      height: 550px;
    }
    .preview-img-container {
      width: 100%;
      height: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }
    .preview-video-container {
      width: 100%;
      height: 100%;
      object-fit: contain;
      outline: none;
    }
  }
</style>
