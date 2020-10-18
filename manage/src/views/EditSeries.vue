<template>
  <div class="edit-series-container">
    <div class="edit-series">
      <!-- 编辑 -->
      <div class="edit-area">
        <!-- 返回 -->
        <img
          src="../assets/img/upload-series/left.png"
          class="back-btn"
          @click="backToSeriesManagement"
        >
        <!-- tab -->
        <el-tabs v-model="activeTabName" class="top-tab">
          <el-tab-pane label="01 基本信息" name="basic"></el-tab-pane>
          <el-tab-pane label="02 补充说明（选填）" name="extra"></el-tab-pane>
        </el-tabs>

        <!-- 填写基础信息 -->
        <div class="edit-basic-form" v-show="activeTabName === 'basic'">
          <!-- 标题 -->
          <div class="form-title">套系基本信息</div>

          <!-- 表单 -->
          <el-form
            ref="basic-form"
            :model="basicFormData"
            :rules="basicFormRules"
            label-position="top"
          >
            <!-- 套系封面图 -->
            <el-form-item label="套系封面图" prop="cover" ref="cover">
              <upload
                :width="717"
                :height="320"
                tips="添加一张封面图（≤4M）"
                :max-img-size="4096"
                v-model="basicFormData.cover"
                :disabled="isUploadDisabled"
                desc="封面图"
              ></upload>
            </el-form-item>

            <!-- 套系轮播图 -->
            <el-form-item label="套系轮播图（支持MP4格式视频文件）" prop="swiper" ref="swiper" style="width: 100%">
              <div
                class="uploaded-num"
              >{{(basicFormData.swiper && basicFormData.swiper.length) || 0}}/9</div>
              <upload
                accept="image/jpg,image/jpeg,image/png,video/mp4"
                :width="172"
                :height="172"
                tips="添加照片"
                :limit="9"
                :max-img-size="4096"
                :max-video-size="20480"
                :disabled="isUploadDisabled"
                v-model="basicFormData.swiper"
                desc="轮播图"
              ></upload>
            </el-form-item>

            <!-- 套系名称 -->
            <el-form-item label="套系名称" prop="name" ref="name">
              <el-input v-model="basicFormData.name" class="series-name" :maxlength="40" show-word-limit></el-input>
            </el-form-item>

            <!-- 类目 -->
            <div class="flex item-2">
              <el-form-item label="类目" prop="category" ref="category">
                <el-select
                  v-model="basicFormData.category"
                  clearable
                  placeholder="选择类目"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item of seriesCategory"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>

              <!-- 服务城市 -->
              <el-form-item label="服务城市" prop="city" ref="city">
                <select-city v-model="basicFormData.city" placeholder="选择城市"></select-city>
              </el-form-item>
            </div>

            <div class="flex item-2">
              <!-- 套系价格 -->
              <el-form-item label="套系价格" prop="price" ref="price">
                <el-input v-model="basicFormData.price" :min="0"></el-input>
              </el-form-item>

              <!-- 定金 -->
              <el-form-item label="定金 (选填)" prop="deposit" ref="deposit">
                <el-input v-model="basicFormData.deposit">
                  <template slot="append">定金</template>
                </el-input>
              </el-form-item>
            </div>

            <div class="flex item-3">
              <!-- 拍摄原片 -->
              <el-form-item label="拍摄原片" prop="originalPhoto" ref="originalPhoto">
                <el-input v-model.number="basicFormData.originalPhoto">
                  <template slot="append">张</template>
                </el-input>
              </el-form-item>

              <!-- 精修照片 -->
              <el-form-item label="精修照片" prop="finishingPhoto" ref="finishingPhoto">
                <el-input v-model.number="basicFormData.finishingPhoto">
                  <template slot="append">张</template>
                </el-input>
              </el-form-item>

              <!-- 化妆造型 -->
              <el-form-item label="化妆造型" prop="makeup" ref="makeup">
                <el-input v-model.number="basicFormData.makeup">
                  <template slot="append">套</template>
                </el-input>
              </el-form-item>
            </div>

            <div class="flex item-3">
              <!-- 提供服装 -->
              <el-form-item label="提供服装" prop="clothing" ref="clothing">
                <el-input v-model.number="basicFormData.clothing">
                  <template slot="append">套</template>
                </el-input>
              </el-form-item>

              <!-- 拍摄主题 -->
              <el-form-item label="拍摄主题" prop="theme" ref="theme">
                <el-input v-model.number="basicFormData.theme">
                  <template slot="append">套</template>
                </el-input>
              </el-form-item>

              <!-- 拍摄团队 -->
              <el-form-item label="拍摄团队" prop="staffNum" ref="staffNum">
                <el-input v-model.number="basicFormData.staffNum">
                  <template slot="append">人</template>
                </el-input>
              </el-form-item>
            </div>

            <div class="flex item-3">
              <!-- 提前预约 -->
              <el-form-item label="提前预约" prop="reservation" ref="reservation">
                <el-input v-model.number="basicFormData.reservation">
                  <template slot="append">天</template>
                </el-input>
              </el-form-item>

              <!-- 拍摄时长 -->
              <el-form-item label="拍摄时长" prop="serviceTime" ref="serviceTime">
                <el-input v-model="basicFormData.serviceTime">
                  <template slot="append">小时</template>
                </el-input>
              </el-form-item>

              <!-- 交付天数 -->
              <el-form-item label="交付天数" prop="deliveryTime" ref="deliveryTime">
                <el-input v-model.number="basicFormData.deliveryTime">
                  <template slot="append">天</template>
                </el-input>
              </el-form-item>
            </div>

            <!-- 摄影师个人海报 -->
            <div class="photographer-detail-container flex">
              <el-form-item label="摄影师个人海报 · 方便后续推广使用（选填）" prop="photographerDetail" ref="photographerDetail">
                <upload
                  :width="472"
                  :height="260"
                  tips="添加照片 (推荐尺寸726 * 400)"
                  :max-img-size="4096"
                  :disabled="isUploadDisabled"
                  v-model="basicFormData.photographerDetail"
                  desc="摄影师详情"
                ></upload>
                <div class="photographer-detail-tips">tips：需包含摄影师ID+风格类型+严选摄影师/认证摄影师+一句话个人简介</div>
              </el-form-item>

              <!-- 参考示例 -->
              <div class="examples">
                <div class="examples-title">参考示例</div>
                <div class="example-list">
                  <img-magnifier
                    v-for="(item, index) of examplePhotographerImgs"
                    :key="index"
                    :src="item"
                    :width="88"
                    :height="88"
                    img-border-radius="4px"
                    class="example-img"
                  >
                  </img-magnifier>
                </div>
              </div>
            </div>

            <!-- 小标题 -->
            <div class="little-title">样片&客照</div>

            <!-- 风格tab -->
            <div class="styles">
              <el-form-item prop="styles" ref="styles">
                <!-- 顶栏 -->
                <div class="styles-tab-bar">
                  <!-- 添加 -->
                  <el-button class="styles-btn styles-rename-btn" @click="openStyleDialog(false)">重命名</el-button>
                  <el-button class="styles-btn styles-add-btn" @click="openStyleDialog(true)">添加</el-button>
                  <!-- tab -->
                  <el-tabs v-model="activeStyleName" editable @edit="editStyleTab">
                    <el-tab-pane
                      :label="item.name"
                      :name="item.name"
                      v-for="(item, index) of basicFormData.styles"
                      :key="item.name"
                    >
                      <el-form-item :prop="`styles.${index}.value`">
                        <upload
                          :width="172"
                          :height="172"
                          tips="添加照片"
                          :max-img-size="4096"
                          :limit="12"
                          :disabled="isUploadDisabled"
                          v-model="item.imgs"
                          :desc="'风格' + index"
                        ></upload>
                      </el-form-item>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-form-item>
            </div>

            <!-- 服务细节 -->
            <div class="feature-container flex">
              <el-form-item label="服务细节（选填）">
                <upload
                  :width="172"
                  :height="172"
                  tips="添加照片"
                  :max-img-size="4096"
                  :limit="12"
                  :disabled="isUploadDisabled"
                  v-model="basicFormData.feature"
                  desc="服务细节"
                ></upload>
              </el-form-item>

              <div class="example">
                <div class="example-title">参考示例</div>
                <div class="img-container" @click="isShowFeatureExampleImg = true">
                  <img :src="featureExampleImg" alt="">
                </div>
              </div>
            </div>
          </el-form>
        </div>

        <!-- 填写补充说明 -->
        <div class="edit-extra-form" v-show="activeTabName === 'extra'">
          <div class="form-title">套系补充说明 (选填)</div>

          <!-- 表单 -->
          <el-form ref="extra-form" :model="extraFormData" label-position="top">
            <!-- 拍摄地点 -->
            <el-form-item label="拍摄地点">
              <el-input type="textarea" :rows="2" v-model="extraFormData.location" :maxlength="70" placeholder="选填"></el-input>
            </el-form-item>

            <!-- 拍摄场景 -->
            <el-form-item label="拍摄场景">
              <el-input type="textarea" :rows="2" v-model="extraFormData.scene" :maxlength="70" placeholder="选填"></el-input>
            </el-form-item>

            <!-- 拍摄设备 -->
            <el-form-item label="拍摄设备">
              <el-input type="textarea" :rows="2" v-model="extraFormData.device" :maxlength="70" placeholder="选填"></el-input>
            </el-form-item>

            <!-- 拍摄说明 -->
            <el-form-item label="拍摄说明">
              <el-input type="textarea" :rows="2" v-model="extraFormData.explanation" :maxlength="70" placeholder="选填"></el-input>
            </el-form-item>

            <!-- 专属服务 -->
            <el-form-item label="专属服务">
              <el-input type="textarea" :rows="2" v-model="extraFormData.service" :maxlength="70" placeholder="选填"></el-input>
            </el-form-item>

            <!-- 相片/产品 -->
            <el-form-item label="相片/产品">
              <el-input type="textarea" :rows="2" v-model="extraFormData.product" :maxlength="70" placeholder="选填"></el-input>
            </el-form-item>

            <!-- 增值服务 -->
            <el-form-item label="增值服务">
              <el-input type="textarea" :rows="2" v-model="extraFormData.premium" :maxlength="70" placeholder="选填"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <!-- bottom bar -->
        <div class="bottom-bar">
          <div
            class="back"
            v-if="activeTabName === 'basic'"
            @click="backToSeriesManagement"
          >
            <i class="el-icon-back"></i> 返回套系列表
          </div>
          <div
            class="back"
            v-if="activeTabName === 'extra'"
            @click="previousStep"
          >
            <i class="el-icon-back"></i> 上一步
          </div>
          <div class="buttons">
            <el-button
              v-show="activeTabName === 'extra'"
              class="save-directly"
              @click="saveDirectly"
            >
              保存
            </el-button>
            <el-button
              v-if="activeTabName === 'basic'"
              class="next"
              type="primary"
              @click="nextStep"
            >
              下一步
            </el-button>
            <el-button
              v-if="activeTabName === 'extra'"
              class="next"
              type="primary"
              @click="saveWithCheck"
            >
              保存并上架
            </el-button>
          </div>
        </div>

        <!-- 底部提示 -->
        <div class="bottom-tips" v-show="activeTabName === 'extra'">
          * 保存默认为下架状态，如需上架请点击「保存并上架」
        </div>
      </div>

      <!-- 预览 -->
      <!-- <div class="preview-area">
        <div class="preview-title">预览</div>
        <div class="like-a-phone">
          <edit-series-preview :series="wholeFormData"></edit-series-preview>
        </div>
      </div> -->

      <!-- 弹窗: 填写风格名称 -->
      <el-dialog title="请输入风格名称" :visible.sync="isShowInputStyleName" width="400px">
        <el-input v-model="inputStyleName" autocomplete="off" @keyup.native.enter="addOrRenameSeriesStyle"></el-input>
        <div slot="footer">
          <el-button @click="() => {isShowInputStyleName = false;inputStyleName=''}">取 消</el-button>
          <el-button type="primary" @click="addOrRenameSeriesStyle">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 弹窗: 参考示例 -->
      <el-dialog title="参考示例" :visible.sync="isShowFeatureExampleImg" width="700px">
        <img :src="featureExampleImg" alt="" style="width: 100%">
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Upload from '@/components/Upload.vue'
import ImgMagnifier from '@/components/ImgMagnifier.vue'
import SelectCity from '@/components/SelectCity.vue'
import { gotoTop, getLocFromId } from '@/utils'
import { nonEmptyArray, numberOrDecimalStr, seriesImgArr } from '@/utils/validator'
import req from '@/req/req'
import { series } from "@/request";

export default {
  name: 'edit-series',
  components: {
    Upload,
    SelectCity,
    ImgMagnifier
  },
  data () {
    return {
      isLoaded: false, // 当前页面是否已经加载好了(包含套系数据)
      isFormSaved: true, // 表单是否已经保存
      isUploadDisabled: true, // 是否可以启用各个上传组件了（false时为启用）. 如果需要回显旧数据, 则需要等待旧数据加载好之后在改为false
      isShowFeatureExampleImg: false, // 是否展示"服务细节"的样例图片
      featureExampleImg: 'https://storage-live-raw.dev.photofly.cn/test.jpg',
      seriesId: null,
      activeTabName: 'basic',
      activeStyleName: '风格1',
      defaultStyles: [
        {
          name: '风格1',
          imgs: [null]
        }
      ],
      // 这个对象的**字段顺序**应该和**页面**保持照应
      // 虽然js标准中, 并不保证对象字段顺序, 但实测浏览器具体实现中还是大体可能保证的(实测)
      basicFormData: {
        // 套系基础信息
        cover: null,
        swiper: [null],
        name: '',
        category: '',
        city: [],
        price: '',
        deposit: '',
        originalPhoto: '',
        finishingPhoto: '',
        makeup: '',
        clothing: '',
        theme: '',
        staffNum: '',
        reservation: '',
        serviceTime: '',
        deliveryTime: '',
        photographerDetail: [null],
        styles: null,
        feature: [null]
      },
      extraFormData: {
        location: '',
        scene: '',
        product: '',
        service: '',
        device: '',
        premium: '',
        explanation: ''
      },
      basicFormRules: {
        // 基础表单校验
        cover: [
          {
            required: true,
            message: '请上传套系封面图'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入套系名称',
            change: 'input'
          }
        ],
        swiper: [
          {
            required: true,
            message: '请上传套系轮播图',
            validator: seriesImgArr('请上传套系轮播图')
          }
        ],
        category: [
          {
            required: true,
            message: '请选择套餐类目',
            change: 'change'
          }
        ],
        city: [
          {
            required: true,
            validator: nonEmptyArray('请选择服务城市'),
            change: 'change'
          }
        ],
        price: [
          {
            required: true,
            validator: numberOrDecimalStr('请输入价格(最多精确到两位小数)', 2)
          }
        ],
        deposit: [
          {
            validator: (rule, value, cb) => {
              const reg = new RegExp(`^\\d+(\\.\\d{0,2})?$`)
              if (!reg.test(value)) {
                cb(new Error('请输入定金(最多精确到两位小数)'))
              } else if (value > (Number.parseFloat(this.basicFormData.price) || 0)) {
                cb(new Error('定金不能大于价格'))
              } else {
                cb()
              }
            },
            change: 'input',
            type: 'number'
          }
        ],
        originalPhoto: [
          {
            required: true,
            message: '请输入拍摄原片数量',
            change: 'input',
            type: 'number'
          }
        ],
        finishingPhoto: [
          {
            required: true,
            message: '请输入精修照片数量',
            change: 'input',
            type: 'number'
          }
        ],
        makeup: [
          {
            required: true,
            message: '请输入化妆造型数量',
            change: 'input',
            type: 'number'
          }
        ],
        clothing: [
          {
            required: true,
            message: '请输入提供服装数量',
            change: 'input',
            type: 'number'
          }
        ],
        theme: [
          {
            required: true,
            message: '请输入拍摄主题数量',
            change: 'input',
            type: 'number'
          }
        ],
        staffNum: [
          {
            required: true,
            message: '请输入拍摄团队人员数量',
            change: 'input',
            type: 'number'
          }
        ],
        reservation: [
          {
            required: true,
            message: '请输入提前预约天数',
            change: 'input',
            type: 'number'
          }
        ],
        serviceTime: [
          {
            required: true,
            validator: numberOrDecimalStr('请输入拍摄时长(最多精确到一位小数)', 1),
            change: 'input'
          }
        ],
        deliveryTime: [
          {
            required: true,
            message: '请输入交付天数',
            change: 'input',
            type: 'number'
          }
        ],
        // photographerDetail: [
        //   {
        //     required: true,
        //     validator: seriesImgArr('请上传摄影师详情页')
        //   }
        // ],
        styles: [
          {
            required: true,
            validator (rule, value, cb) {
              if (!value || value.length === 0) {
                cb(new Error('请添加至少一种风格'))
                return
              }

              let isValid = true
              value.forEach(item => {
                if (!item.imgs || item.imgs.length === 0 || !item.imgs[0]) {
                  cb(new Error('每种风格需至少上传一张图片'))
                  isValid = false
                }
              })

              if (isValid) cb()
            }
          }
        ],
        feature: [
          {
            validator: seriesImgArr('请上传特殊说明')
          }
        ]
      },
      isShowInputStyleName: false, // 是否打开风格名称输入框
      isRenamingStyle: false, // 是否正在重命名风格
      inputStyleName: '', // 输入的风格名
      seriesCategory: ['写真','校园','婚纱','亲子','宠物','旅拍','商业摄影'],
      examplePhotographerImgs: [
        'https://storage-live-raw.dev.photofly.cn/1.jpg',
        'https://storage-live-raw.dev.photofly.cn/pg1.jpg',
        'https://storage-live-raw.dev.photofly.cn/pg2.png',
        'https://storage-live-raw.dev.photofly.cn/pg3.png'
      ]
    }
  },
  watch: {
    'basicFormData.price' () {
      setTimeout(() => {
        this.$refs['basic-form'].validateField('deposit')
      }, 0)
    },
    'basicFormData.cover' () {
      setTimeout(() => {
        this.$refs['basic-form'].validateField('cover')
      }, 0)
    },
    'basicFormData.swiper' () {
      setTimeout(() => {
        this.$refs['basic-form'].validateField('swiper')
      }, 0)
    },
    // 'basicFormData.photographerDetail' () {
    //   setTimeout(() => {
    //     this.$refs['basic-form'].validateField('photographerDetail')
    //   }, 0)
    // },
    'basicFormData.styles': {
      deep: true,
      handler () {
        setTimeout(() => {
          this.$refs['basic-form'].validateField('styles')
        }, 0)
      }
    },
    'wholeFormData': {
      deep: true,
      handler () {
        // console.log(this.basicFormData)
        if (this.isLoaded) this.isFormSaved = false
      }
    }
  },
  computed: {
    // 所有表单数据
    wholeFormData () {
      return {...this.basicFormData, ...this.extraFormData}
    },
    // 基础表单的字段
    basicFormFields () {
      return Object.keys(this.basicFormData)
    }
  },
  methods: {
    // 上一步
    previousStep () {
      gotoTop()
      setTimeout(() => {
        this.activeTabName = 'basic'
      }, 400)
    },

    // 下一步
    async nextStep () {
      // const isFormValid = await this.submitForm('basic-form')
      // if (isFormValid) {
      // gotoTop()
      // setTimeout(() => {
      //   this.activeTabName = 'extra'
      // }, 700)
      // }
      gotoTop()
      setTimeout(() => {
        this.activeTabName = 'extra'
      }, 700)
    },

    // 返回套系列表
    backToSeriesManagement () {
      this.$router.replace('/A-b')
    },

    // 打开"添加风格", 或"重命名风格" 对话框
    // isAddStyle: 是否是在添加风格, 否的话则代表要重命名
    openStyleDialog (isAddStyle) {
      if (isAddStyle) {
        // 添加套系
        this.isRenamingStyle = false
        if (this.basicFormData.styles.length < 5) {
          this.isShowInputStyleName = true
          this.inputStyleName = ''
        } else {
          this.$message.warning('最多只能添加 5 种风格')
        }
      } else {
        // 重命名套系
        this.isRenamingStyle = true
        this.inputStyleName = this.activeStyleName
        this.isShowInputStyleName = true
      }
    },

    // 添加风格, 或重命名风格
    addOrRenameSeriesStyle () {
      // 校验
      if (!this.inputStyleName) {
        this.$message.warning('请输入风格名称')
        return
      }
      // 校验
      let isUniqueStyleName = true
      this.basicFormData.styles.forEach((item) => {
        if (item.name === this.inputStyleName) {
          isUniqueStyleName = false
        }
      })
      if (!isUniqueStyleName) {
        this.$message.warning('套系名已存在')
        return
      }

      this.isShowInputStyleName = false

      // 添加新套系
      if (!this.isRenamingStyle) {
        this.basicFormData.styles.push({
          name: this.inputStyleName,
          imgs: [null]
        })
        this.activeStyleName = this.inputStyleName
        this.inputStyleName = ''
      } else {
        // 重命名套系
        this.basicFormData.styles.forEach((item) => {
          if (item.name === this.activeStyleName) {
            item.name = this.inputStyleName
          }
        })
        this.activeStyleName = this.inputStyleName
        this.inputStyleName = ''
        this.isRenamingStyle = false
      }
    },

    // 移除风格
    editStyleTab (targetName, action) {
      if (action === 'remove') {
        if (this.basicFormData.styles.length === 1) {
          this.$message.warning('至少需要有一套风格哦')
          return
        }
        console.log(123)
        let gotoThisTab
        this.basicFormData.styles = this.basicFormData.styles.filter(
          (item, index) => {
            if (item.name === targetName) {
              if (this.activeStyleName === targetName) {
                // 如果删除的就是当前打开的页面, 则需要调整打开的tab
                if (index === 0) gotoThisTab = this.basicFormData.styles[1]
                else gotoThisTab = this.basicFormData.styles[index - 1]
              }
              return false
            } else {
              return true
            }
          }
        )
        console.log('删除完', JSON.stringify(this.basicFormData.styles))
        if (gotoThisTab) this.activeStyleName = gotoThisTab.name
      }
    },


    // 获取单个套系信息
    async getSeriesData () {
      try {
        this.$openLoading()
        console.log('获取套系信息: ', this.seriesId)
        const res = await series.series.getOneSeries(this.seriesId)
        console.log('获取到的旧套系信息: ', res)
        const [basic, extra] = this.transformBFData('FrontEnd', res.data.Result)
        console.log('当前表单: ', basic, extra)
        this.isUploadDisabled = false//启用各个上传组件
        Object.assign(this.basicFormData, basic)
        Object.assign(this.extraFormData, extra)
        this.$closeLoading()
      } catch (e) {
        this.$message.error('获取套系信息失败')
        console.error(e)
      }
    },

    // 前后端数据格式转换
    // target: 转换成前端还是后端格式, 'FrontEnd' | 'BackEnd'
    // ******前端格式: 传入了id时 需要先将数据转换后填入表单进行操作 即“前端格式” 未传入id时不需要
    // ******后端格式: 最终提交表单时需要做转化传递给后端后入库
    // 如果转换为前端格式: 将自动修改
    // 返回处理好的数据
    transformBFData (target, data) {
      // 格式化为前端使用的数据
      if (target === 'FrontEnd') {
        const basic = {}
        const extra = {}
        basic.name = data.Name
        if (!data.CoverWidth || !data.CoverHeight || !data.Cover) {
          basic.cover = null
        } else {
          basic.cover = {
            url: data.Cover,
            width: data.CoverWidth,
            height: data.CoverHeight
          }
        }
        basic.swiper = data.Description ? JSON.parse(data.Description) : [null]
        if (!basic.swiper || !basic.swiper.length) basic.swiper = [null]
        basic.category = data.PhotographyCategory === 'None' ? null : data.PhotographyCategory
        basic.price = data.Price
        basic.deposit = data.DepositAmount
        basic.originalPhoto = data.OriginalPicturesCount
        basic.finishingPhoto = data.RefinedPicturesCount
        basic.makeup = data.MakeupsCount
        basic.clothing = data.ClothesCount
        basic.staffNum = data.ShootCounts
        basic.theme = data.ShootGroupsCount
        basic.reservation = data.AdvanceBookingDays

        // basic.serviceTime = data.ServiceDuration.replace('小时', '') // 如果时间中有"小时", 则去除"小时"字样
        basic.serviceTime = data.ServiceDuration

        basic.deliveryTime = data.DeliveryDays
        basic.styles = (() => {
          let res
          if (!data.SamplesShow) {
            res = this.$deepClone(this.defaultStyles)
            return res
          }
          const samplesShow = JSON.parse(data.SamplesShow)
          if (!samplesShow || !samplesShow[0]) {
            res = this.$deepClone(this.defaultStyles)
          } else if (samplesShow[0].url) {
            // 只有一种风格
            res = [{
              name: '风格1',
              imgs: samplesShow
            }]
          } else {
            res = samplesShow.map(item => ({
              name: item.title,
              imgs: item.pic
            }))
          }
          return res
        })()
        basic.photographerDetail = data.OtherFeature ? JSON.parse(data.OtherFeature) : [null]
        if (!basic.photographerDetail || !basic.photographerDetail.length) basic.photographerDetail = [null]
        basic.feature = data.Style ? JSON.parse(data.Style) : [null]
        if (!basic.feature || !basic.feature.length) basic.feature = [null]
        extra.location = data.ServiceCities
        extra.scene = data.ShootScene
        extra.product = data.Product
        extra.service = data.DedicatedService
        extra.device = data.ShootEquipment
        extra.premium = data.ValueAddedServices
        extra.explanation = data.ShootDescription

        //******城市三级联动： */
        //逻辑1：存储时id到哪级就存哪级
        //**这样后台部分后续请求拿到的城市数据（id数组）需要整理后抛给城市选择组件 有哪级抛哪级
        // basic.city = []
        // if (data.CountryId) basic.city.push(data.CountryId)
        // if (data.ProvinceId) basic.city.push(data.ProvinceId)
        // if (data.CityId) basic.city.push(data.CityId)
        //**这样前台部分较为麻烦 请求某地区数据时 需要将id分级

        //逻辑2：存储时id补齐到最下级
        //**这样后台部分后续请求拿到的城市数据（id数组）需要检测是否重复
        //**这样前台部分请求某地区数据时 统一将id传给最下级字段即可
        basic.city = []
        if (data.CountryId) basic.city.push(data.CountryId)
        if (data.ProvinceId && data.CountryId!==data.ProvinceId) basic.city.push(data.ProvinceId)
        if (data.CityId && data.ProvinceId!==data.CityId && data.CountryId!==data.CityId) basic.city.push(data.CityId)
        // console.log(basic.city)

        return [basic, extra]
      } else if (target === 'BackEnd') {
        // 把图片arr格式化为后端接收的格式
        // eslint-disable-next-line no-inner-declarations
        function formatImgArr (arr) {
          if (!arr || arr.length === 0 || !arr[0]) {
            return null
          } else {
            return JSON.stringify(arr.map(item => ({
              height: item.height,
              width: item.width,
              url: item.url
            })))
          }
        }
        // 格式化为提交给后端的数据
        const [basic, extra] = data
        const res = {
          sellerId: JSON.parse(sessionStorage.getItem('userData')).Id,
          cover: basic.cover ? basic.cover.url : null,
          coverHeight: basic.cover ? basic.cover.height : null,
          coverWidth: basic.cover ? basic.cover.width : null,
          description: formatImgArr(basic.swiper),
          name: basic.name,
          photographyCategory: basic.category,

          //******城市三级联动： */
          //逻辑1：存储时id到哪级就存哪级
          //传给后端的地理相关数据（传入最后有数据的那级的id 后端再查表补齐前面的层级的id 最终数据形态参差不齐）
          // cityId: Number(basic.city[basic.city.length - 1]) || null,

          //逻辑2：存储时三级id都做存储 没有的补齐 并 调用方法存储一个地区名AreaName（最下一级的名称）
          countryId: basic.city[0] || null,
          provinceId: basic.city.length>=2?basic.city[1]:(basic.city[0] || null),
          cityId: basic.city.length>=3?basic.city[2]:(basic.city.length===2?basic.city[1]:(basic.city[0] || null)),
          areaName: getLocFromId(basic.city)[getLocFromId(basic.city).length-1],

          price: Number.parseFloat(basic.price) || null,
          depositAmount: Number.parseFloat(basic.deposit) || null,
          originalPicturesCount: basic.originalPhoto,
          refinedPicturesCount: basic.finishingPhoto,
          makeupsCount: basic.makeup,
          clothesCount: basic.clothing,
          shootGroupsCount: basic.theme,
          shootCounts: basic.staffNum,
          advanceBookingDays: basic.reservation,

          // serviceDuration: basic.serviceTime + '小时', // 传给后台的需要是个字符串, 带上单位
          serviceDuration: basic.serviceTime, // 传给后台的需要是个字符串, 带上单位

          deliveryDays: basic.deliveryTime,
          otherFeature: formatImgArr(basic.photographerDetail),
          style: formatImgArr(basic.feature),
          samplesShow: (() => {
            let res = null
            if (
              !this.basicFormData.styles ||
              this.basicFormData.styles.length === 0 ||
              !this.basicFormData.styles[0]
            ) {
              return res
            }

            this.basicFormData.styles.forEach(item => {
              if (item && item.imgs && item.imgs.length && item.imgs[0]) {
                item.imgs = item.imgs.map(img => ({
                  url: img.url,
                  height: img.height,
                  width: img.width
                }))
              }
            })
            if (this.basicFormData.styles.length === 1) {
              res = JSON.stringify(this.basicFormData.styles[0].imgs)
            } else {
              res = JSON.stringify(this.basicFormData.styles.map(item => ({
                title: item.name,
                pic: item.imgs
              })))
            }
            return res
          })(),
          serviceCities: extra.location,
          shootScene: extra.scene,
          product: extra.product,
          dedicatedService: extra.service,
          shootEquipment: extra.device,
          valueAddedServices: extra.premium,
          shootDescription: extra.explanation
        }
        return res
      }
    },

    //******先表单校验submitForm() 再数据整理transformBFData() */

    // 直接保存
    // 会保存为下架状态
    async saveDirectly () {
      if (this.seriesId) {
        this.update(false)
      } else {
        await this.create(false)
        this.$router.replace('/A-b?tab=disabled')
      }
    },

    // 校验后保存
    // 会保存为上架状态
    saveWithCheck () {
      if (this.seriesId) {
        this.update()
      } else {
        this.create()
      }
    },

    // 创建套系
    // isSaveAndEnable 是否"保存并上架"
    async create (isSaveAndEnable = true) {
      let isFormValid
      let tips
      if (isSaveAndEnable) {
        isFormValid = await this.submitForm('basic-form') && await this.submitForm('extra-form')
        tips = '[创建] [上架状态]'
      } else {
        isFormValid = true
        tips = '[创建] [下架状态]'
      }

      if (isFormValid) {
        console.log(tips, '套系: ', this.basicFormData, this.extraFormData)
        this.$openLoading('edit-series-container')
        try {
          const query = this.transformBFData('BackEnd', [this.basicFormData, this.extraFormData])
          query.delisting = !isSaveAndEnable//只保存时 传入的isSaveAndEnable为false 取反后为true
          console.log(tips, '的表单: ', query)
          const res = await series.series.createSeries(query)
          console.log(tips, '的结果: ', res)
          this.isFormSaved = true
          if (isSaveAndEnable) {
            this.$message.success('上架成功')
            this.$router.replace('/A-b')
          } else {
            this.$message.success('保存成功')
          }
        } catch (e) {
          console.error(e)
          if (isSaveAndEnable) {
            this.$message.error('上架失败')
          } else {
            this.$message.error('保存失败')
          }
        }
        this.$closeLoading()
      }
    },

    // 更新套系
    // isSaveAndEnable 是否"保存并上架"
    async update (isSaveAndEnable = true) {
      let isFormValid
      let tips
      if (isSaveAndEnable) {
        isFormValid = await this.submitForm('basic-form') && await this.submitForm('extra-form')
        tips = '[更新] [上架状态]'
      } else {
        isFormValid = true
        tips = '[更新] [下架状态]'
      }

      if (isFormValid) {
        this.$openLoading('edit-series-container')
        try {
          const query = this.transformBFData('BackEnd', [this.basicFormData, this.extraFormData])
          query.delisting = !isSaveAndEnable//只保存时 传入的isSaveAndEnable为false 取反后为true
          query.id = this.seriesId//更新时需要传入商品id
          console.log(tips, '的表单: ', query)
          const res = await series.series.updateSeries(query)
          console.log(tips, '的结果: ', res)
          this.isFormSaved = true
          if (isSaveAndEnable) {
            this.$message.success('上架成功')
            this.$router.replace('/A-b')
          } else {
            this.$message.success('保存成功')
          }
        } catch (e) {
          console.error(e)
          if (isSaveAndEnable) {
            this.$message.error('上架失败')
          } else {
            this.$message.error('保存失败')
          }
        }
        this.$closeLoading()
      }
    },

    // 提交表单
    async submitForm (formName) {
      console.log('校验: ', formName)
      let isValid = true
      // validate
      //https://element.eleme.cn/#/zh-CN/component/form#form-item-methods
      // 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      // Function(callback: Function(boolean, object))
      let isFormValidated = await new Promise((resolve) => {
        this.$refs[formName].validate((valid, invalidFields) => {
          if (valid) {
            resolve(true)
          } else {
            this.$message({
              type: 'warning',
              message: '请检查必填信息完整后再进行上架哦'
            })

            // 跳转到第一个填写不合法的字段
            invalidFields = Object.keys(invalidFields)
            let gotoThisField
            for (const field of this.basicFormFields) {
              if (invalidFields.includes(field)) {
                gotoThisField = field
                break
              }
            }
            console.log(123, invalidFields, this.basicFormFields, gotoThisField)

            console.log(123, this.$refs[gotoThisField].$el)

            this.activeTabName = 'basic'
            setTimeout(() => {
              this.$refs[gotoThisField].$el.scrollIntoView({
                block: 'center',
                behavior: 'smooth'
              })
            }, 0)

            isValid = false
            resolve(false)
          }
        })
      })

      // 提交表单
      if (isFormValidated) {
        console.log('校验成功')
      }

      return isValid
    },

    // 网页卸载前
    // beforeunload () {
    //   if (window.location.pathname === '/EditSeries' && !this.isFormSaved) {
    //     return '表单未保存'
    //   } else {
    //     return null
    //   }
    // },
  },

  async created () {
    this.basicFormData.styles = this.$deepClone(this.defaultStyles)
    if (this.$route.query && this.$route.query.id) {
      this.seriesId = this.$route.query.id
      console.log('要编辑的套系id是: ', this.$route.query.id)
      await this.getSeriesData()
      if (
        this.basicFormData.styles &&
        this.basicFormData.styles.length &&
        this.basicFormData.styles[0] &&
        this.basicFormData.styles[0].name
      ) {
        this.activeStyleName = this.basicFormData.styles[0].name//控制风格区域高亮
      }
    } else {
      this.isUploadDisabled = false//无旧数据需要填充时 直接启用各个上传组件 有旧数据时在getSeriesData方法中获取数据完毕后启用
    }
    this.isLoaded = true//加载完毕
  },
  mounted () {
    // 设置网页卸载前提示保存
    // document.body.onbeforeunload = this.beforeunload
  },
  beforeRouteLeave (to, from, next) {
    if (!this.isFormSaved) {
      this.$confirm('表单修改后尚未保存, 确认离开?', {
        confirmButtonText: '继续编辑',
        cancelButtonText: '离开',
        type: 'warning',
        showClose: false
      }).then(() => {
        const isStillLoggedIn = localStorage.getItem('Token') // 有些时候, 跳转可能会导致退出登录
        if (isStillLoggedIn) {
          next(false)
        } else {
          this.$message.warning('检测到您已退出登录, 无法继续编辑')
          next()
        }
      }).catch(() => {
        next()
      })
    } else {
      next()
    }
  },
  destroyed () {
    // document.body.onbeforeunload = null
  }

}
</script>
<style lang="less" scoped>
.edit-series-container {
  background: #f8fafb;
}
.edit-series {
  display: flex;
  // width: 1400px;
  margin: 0 auto;
  background: #fff;
  font-size: 16px;
  color: #1d252a;

  // 通用
  .flex {
    display: flex;
  }

  /deep/ .el-tabs__item:focus.is-active.is-focus:not(:active) {
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
  }
  // 编辑区域
  .edit-area {
    min-width: 720px;
    // min-width: 1400px;

    // overflow: hidden;
    padding: 60px 60px;
    padding-bottom: 240px;

    // 后退按钮
    .back-btn {
      position: relative;
      width: 14px;
      cursor: pointer;
      margin-left: 10px;
      transform: translateY(51px);
      z-index: 10;
    }

    // tab
    .top-tab {
      /deep/ .el-tabs__item {
        height: 80px;
        line-height: 80px;
        text-align: center;
        width: 240px;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
        color: #cccccc;
        outline: none;
        &.is-active {
          color: #1b2125;
        }
      }
      /deep/ .el-tabs__active-bar {
        height: 1px;
      }
      /deep/ .el-tabs__nav-wrap::after {
        height: 1px;
      }
    }

    // 标题
    .form-title {
      font-size: 24px;
      margin: 70px 0;
    }

    // 重置form
    /deep/ .el-form {
      .el-form-item__label {
        color: #cccccc;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        margin-bottom: 6px;
        padding: 0;
        &::before {
          display: none; // 小红点
        }
      }
      .el-form-item {
        margin-bottom: 38px;
      }
      .el-input {
        height: 54px;
        input {
          height: 54px;
          border-radius: 3px !important;
          transition: border 0.1s;
          &:focus + .el-input-group__append {
            // input后面的append边框高亮
            border: 1px solid #222;
            transition: border 0.1s;
          }
        }
      }
      .el-input-group__append {
        transform: translateX(-2px);
        background: #fff;
        color: #cccccc;
        border-left: 1px solid rgb(213, 219, 222);
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        padding-left: 20px;
        padding-right: 20px;
        font-size: 12px;
      }
      .is-error .el-input-group__append {
        border: 1px solid rgb(245, 108, 108) !important;
        transition: border 0.1s;
      }
    }

    // 基础表单
    .edit-basic-form {
      // 已经上传了几张
      .uploaded-num {
        display: inline-block;
        float: right;
        padding: 0 8px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: #d4dce3;
        font-weight: bold;
        color: #fff;
        border-radius: 20px;
        transform: translateY(-26px);
      }
      // 套餐名称
      .series-name {
        width: 99.5%;
      }
      // 一行有两个input
      /deep/ .item-2 {
        .el-input {
          width: 346px;
          margin-right: 25px;
        }
      }
      // 一行有三个input
      /deep/ .item-3 {
        .el-input {
          width: 223px;
          margin-right: 24px;
        }
      }

      // 选择城市
      /deep/ .select-city {
        input {
          width: 344px;
        }
      }

      // 摄影师详情页
      .photographer-detail-container {
        justify-content: space-between;
        .examples {
          flex-shrink: 0;
          flex-grow: 1;
          align-items: center;
          box-sizing: border-box;
          padding-top: 28px;
          display: flex;
          flex-direction: column;

          .examples-title {
            color: #cccccc;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 16px;
          }
          .example-list {
            width: 190px;
            height: 190px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: space-between;
          }
        }
      }

      // 摄影师详情页
      .photographer-detail-tips {
        font-size: 14px;
        color: #CCCCCC;
        // transform: translateY(-20px);
      }

      // 小标题
      .little-title {
        font-weight: bold;
        font-size: 12px;
        padding: 42px 0;
        color: #cccccc;
      }

      // 风格
      .styles {
        // 顶栏
        .styles-tab-bar {
          position: relative;
          .styles-btn {
            position: absolute;
            width: 88px;
            height: 34px;
            line-height: 34px;
            padding: 0;
            z-index: 10;
          }
          .styles-add-btn {
            right: 0;
          }
          .styles-rename-btn {
            right: 97px
          }
          /deep/ .el-tabs {
            .el-tabs__item {
              font-size: 14px;
            }
            .el-tabs__item.is-active {
              color: #1989fa;
            }
            .el-tabs__active-bar {
              background: #1989fa;
            }
            .el-tabs__new-tab {
              display: none;
            }
            .el-icon-close {
              margin-left: 4px;
              font-size: 12px;
            }
          }
        }
      }

      // 服务细节
      .feature-container {
        display: flex;
        justify-content: space-between;
        position: relative;
        .example {
          width: 160px;
          // position: absolute;
          // right: -135px;
          // top: -16px;
          margin-top: -20px;
          flex-shrink: 0;
          .example-title {
            text-align: center;
            color: #cccccc;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 16px;
          }
          .img-container {
            border-radius: 4px 8px 8px 4px;
            width: 100%;
            height: 400px;
            overflow-y: auto;
            img {
              width: 100%;
              cursor: zoom-in;
              border-radius: 4px;
            }
            &::-webkit-scrollbar {
              width: 4px;
              height: 4px;
            }
            &::-webkit-scrollbar-thumb {
              border-radius: 3px !important;
              background: #ccc;
            }
          }
        }
      }
    }

    // 补充表单
    .edit-extra-form {
      /deep/ .el-textarea {
        margin-bottom: 4px;
        textarea {
          border-radius: 3px;
        }
      }
    }

    // 提交栏
    .bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 175px;
      .save-directly {
        width: 150px;
      }
      .back {
        color: #788995;
        cursor: pointer;
      }
      .buttons {
        /deep/ .el-button {
          height: 54px;
          box-shadow: 0px 2px 7px 0px rgba(120, 137, 149, 0.25);
        }
      }
      .next {
        width: 250px;
      }
    }

    // 底部提示
    .bottom-tips {
      font-size: 14px;
      color: #999999;
      float: right;
      margin-top: 15px;
      transform: translateX(-67px);
    }
  }

  // 预览
  .preview-area {
    background: #f8fafb;
    flex-shrink: 0;
    width: 390px;
    .like-a-phone {
      width: 375px;
      background: #fff;
      margin-left: 15px;
    }
    .preview-title {
      font-size: 24px;
      margin-left: 50px;
      margin-top: 50px;
      margin-bottom: 22px;
    }
  }
}
</style>
