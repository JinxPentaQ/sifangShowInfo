<template>
  <div class="wrap">
    <div class="white_bg">
      <div style="padding:14px 24px 14px 24px;">
        <p>链类型</p>
        <van-tabs type="card" v-model="active" @click="qrchange">
          <van-tab title="erc20">
            <div id="erc"></div>
            <van-cell class="bankInfo">
              <template>
                <span class="bank_title">{{erc}}</span>
                <img
                  src="../../assets/copy.png"
                  alt
                  class="copy"
                  v-clipboard:copy="erc"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                />
              </template>
            </van-cell>
          </van-tab>
          <van-tab title="trc20">
            <div id="trc" ref="trc"></div>
            <van-cell class="bankInfo">
              <template>
                <span class="bank_title">{{trc}}</span>
                <img
                  src="../../assets/copy.png"
                  alt
                  class="copy"
                  v-clipboard:copy="trc"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                />
              </template>
            </van-cell>
          </van-tab>
          <van-tab title="omni">
            <div id="omni" ref="omni"></div>
            <van-cell class="bankInfo">
              <template>
                <span class="bank_title">{{omni}}</span>
                <img
                  src="../../assets/copy.png"
                  alt
                  class="copy"
                  v-clipboard:copy="omni"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                />
              </template>
            </van-cell>
          </van-tab>
        </van-tabs>
        <div class="qr">
          <img :src="orderInfo.pay_code" alt class="qr_img" />
        </div>
        <p class="amount">
          <span class="amount_tips">支付时请输入此金额</span>
          <span class="amount_amount">
            <strong>
              <label>￥{{orderInfo.amount}}</label>
            </strong>
          </span>
        </p>
      </div>
      <img style="height:20px;width:100%;" src="../../assets/lineb.png" alt />
      <div style="padding:14px 24px 24px 24px;">
        <p class="title">
          <strong>订单状态</strong>
        </p>
        <p class="orderInfo">
          订单类型：
          <span>usdt</span>
        </p>
        <p class="orderInfo">
          订单编号：
          <span style="font-size:12px;">{{orderInfo.order_no}}</span>
        </p>
        <p class="orderInfo">
          有效期：
          <span>
            <van-count-down
              :time="sec"
              format=" mm 分 ss 秒"
              style="display:inline-block;color:#F56C6C;"
              @finish="finish"
            />
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { CountDown, CellGroup, Icon, Tab, Tabs, Cell,Toast } from "vant";
import QRCode from "qrcodejs2";
export default {
  components: {
    [CountDown.name]: CountDown,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Cell.name]: Cell,
    [Toast.name]: Cell,
  },
  data() {
    return {
      orderInfo: {
        amount: "0"
      },
      sec: 0,
      erc: "",
      trc: "",
      omni: "",
      active: 0
    };
  },

  methods: {
    //获取信息
    getData() {
      var _this = this;
      _this.$axios
        .post("index.php?s=OTCUser.pcode&time=" + this.$route.query.time)
        .then(res => {
          if (res.data.data == "end") {
            this.$router.push({ path: "end" });
          } else {
            this.orderInfo = res.data.data;
            this.orderInfo.amount = (this.orderInfo.amount / 100).toFixed(2);
            this.sec = this.orderInfo.time * 1000;
            let pay_code = this.orderInfo.pay_code.split(",");
            this.erc = pay_code[0];
            this.trc = pay_code[1];
            this.omni = pay_code[2];
            this.qrerc();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //btc
    qrerc() {
      let qr = new QRCode("erc", {
        width: 195,
        height: 195, // 高度
        text: this.erc // 二维码内容
      });
    },
    //trc
    qrhtrc() {
      let qr = new QRCode("trc", {
        width: 195,
        height: 195, // 高度
        text: this.trc // 二维码内容
      });
    },
    //hbtc
    qromni() {
      let qr = new QRCode("omni", {
        width: 195,
        height: 195, // 高度
        text: this.omni // 二维码内容
      });
    },
    //切换销毁二维码
    qrchange() {
      if (this.active == 0) {
        this.$refs.trc.innerHTML = "";
        this.$refs.omni.innerHTML = "";
      } else if (this.active == 1) {
        this.$nextTick(function() {
          this.qrhtrc();
        });
        // this.$refs.omni.innerHTML = "";
      } else if (this.active == 2) {
        this.$nextTick(function() {
          this.qromni();
        });
        this.$refs.trc.innerHTML = "";
      }
    },
    //复制
    onCopy() {
      Toast.success("复制成功");
    },
    onError() {
      Toast.fail("复制失败");
    },
    finish() {
      this.$router.push({ path: "end" });
    }
  },
  mounted() {
    this.getData();
    this.sec = 300000;
  }
};
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  background-color: #e9f0f0;
  position: absolute;
  .white_bg {
    width: 90%;
    height: 95%;
    background-color: #ffffff;
    margin: 0 auto;
    border-radius: 24px;
    margin-top: 14px;
    .bankInfo {
      font-size: 12px;
      color: #606266;
      .bank_title {
        padding-left: 15px;
      }
    }
  }
  .title {
    text-align: center;
    font-size: 18px;
    margin: 0;
    margin-bottom: 20px;
  }
  #erc,
  #trc,
  #omni {
    width: 195px;
    margin: 0 auto;
    margin-top: 24px;
    img {
      margin: 0 auto;
    }
  }
  .qr_tips {
    text-align: center;
    color: #009dff;
    font-size: 12px;
    margin-top: 16px;
  }
  .amount {
    margin: 8px 0;
    .amount_tips {
      text-align: left;
      color: #606266;
      font-size: 14px;
      line-height: 30px;
    }
    .amount_amount {
      float: right;
      color: #f56c6c;
      font-size: 24px;
    }
    .divider_line {
      width: 100%;
    }
  }
  .orderInfo {
    color: #606266;
    font-size: 14px;
  }
}
</style>
<style lang="less">
.van-tabs__nav--card {
  border: 1px solid #7cb5a4;
}
.van-tabs__nav--card .van-tab.van-tab--active {
  color: #fff;
  background-color: #7cb5a4;
}
.van-tabs__nav--card .van-tab {
  color: #7cb5a4;
  line-height: 28px;
  border-right: 1px solid #7cb5a4;
}
</style>
