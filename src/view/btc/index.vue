<template>
  <div class="wrap">
    <div class="white_bg">
      <div style="padding:14px 24px 14px 24px;">
        <!-- <p>Chain type</p> -->
        <!-- <van-tabs type="card" v-model="active" @click="qrchange">
          <van-tab title="btc">
            <div id="btcr"></div>
            <van-cell class="bankInfo">
              <template>
                <span class="bank_title">{{btc}}</span>
                <img
                  src="../../assets/copy.png"
                  alt
                  class="copy"
                  v-clipboard:copy="btc"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                />
              </template>
            </van-cell>
          </van-tab>
          <van-tab title="hbtc">
            <div id="hbtcr" ref="qrhbtc"></div>
            <van-cell class="bankInfo">
              <template>
                <span class="bank_title">{{hbtc}}</span>
                <img
                  src="../../assets/copy.png"
                  alt
                  class="copy"
                  v-clipboard:copy="hbtc"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                />
              </template>
            </van-cell>
          </van-tab>
        </van-tabs> -->
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
      <img style="height:20px;width:100%;" src="../../assets/liney.png" alt />
      <div style="padding:14px 24px 24px 24px;">
        <p class="title">
          <strong>订单信息</strong>
        </p>
        <p class="orderInfo">
          订单编号：
          <span style="font-size:12px;">{{orderInfo.order_no}}</span>
        </p>
        <p class="orderInfo">
          渠道货币名称：
          <span style="font-size:12px;">{{orderInfo.channel_currency_name}}</span>
        </p>
        <p class="orderInfo">
          渠道Code：
          <span style="font-size:12px;">{{orderInfo.channel_code}}</span>
        </p>
        <p class="orderInfo">
          货币Code：
          <span style="font-size:12px;">{{orderInfo.currency_code}}</span>
        </p>
        <p class="orderInfo">
          名称：
          <span style="font-size:12px;">{{orderInfo.name}}</span>
        </p>
        <p class="orderInfo">
          账号：
          <span style="font-size:12px;">{{orderInfo.account}}</span>
        </p>
        <p class="orderInfo">
          组织/银行：
          <span style="font-size:12px;">{{orderInfo.organization}}</span>
        </p>
        <p class="orderInfo">
          地址：
          <span style="font-size:12px;">{{orderInfo.address}}</span>
        </p>
        <p class="orderInfo">
          链名称：
          <span style="font-size:12px;">{{orderInfo.chain}}</span>
        </p>
        <p class="orderInfo">
          创建时间：
          <span style="font-size:12px;">{{orderInfo.create_time}}</span>
        </p>
        <!-- <p class="orderInfo">
          有效期：
          <span>
            <van-count-down
              :time="sec"
              format=" mm 分 ss 秒"
              style="display:inline-block;color:#F56C6C;"
              @finish="finish"
            />
          </span>
        </p> -->
      </div>
    </div>
  </div>
</template>
<script>
import { CountDown, CellGroup, Icon, Tab, Tabs, Toast,Cell } from "vant";
import QRCode from "qrcodejs2";
export default {
  components: {
    [CountDown.name]: CountDown,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
  },
  data() {
    return {
      orderInfo: {
        amount: "0"
      },
      sec: 0,
      btc: "",
      hbtc: "",
      active: 0
    };
  },

  methods: {
    //获取信息
    getData() {
      var _this = this;
      _this.$axios
      .get("PageController/getOngoingOrder?order_no=" + this.$route.query.time)

        .then(res => {
          if (res.data.data == "end") {
            this.$router.push({ path: "end" });
          } else {
            this.orderInfo = res.data.data;
            // this.orderInfo.amount = (this.orderInfo.amount / 100).toFixed(2);
            // this.sec = this.orderInfo.time * 1000;
            // let pay_code = this.orderInfo.pay_code.split(",");
            // this.btc = pay_code[0];
            // this.hbtc = pay_code[1];
            // this.qrbtc();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //btc
    qrbtc() {
      let btcQR = new QRCode("btcr", {
        width: 195,
        height: 195, // 高度
        text: this.btc // 二维码内容
      });
    },
    //hbtc
    qrhbtc() {
      let hbtcQR = new QRCode("hbtcr", {
        width: 195,
        height: 195, // 高度
        text: this.hbtc // 二维码内容
      });
    },
    //切换销毁二维码
    qrchange() {
      if (this.active == 1) {
        this.$nextTick(function() {
          this.qrhbtc();
        });
      } else {
        this.$refs.qrhbtc.innerHTML = "";
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
  background-color: #fcf5e4;
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
  #btcr,
  #hbtcr {
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
  border: 1px solid #f2cc7a;
}
.van-tabs__nav--card .van-tab.van-tab--active {
  color: #fff;
  background-color: #f2cc7a;
}
.van-tabs__nav--card .van-tab {
  color: #f2cc7a;
  line-height: 28px;
  border-right: 1px solid #f2cc7a;
}
// .van-tabs__nav--card .van-tab{
//     color: #ee0a24;
//     line-height: 28px;
//     border-right: 1px solid #ee0a24;
// }

// }
</style>
