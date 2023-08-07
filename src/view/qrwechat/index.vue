<template>
  <div class="wrap">
    <div class="white_bg">
      <div style="padding:14px 24px 0 24px;">
        <p class="title">
          <strong>订单信息</strong>
        </p>
        <div class="qr">
          <div id="qr" v-show="qrVisible"></div>
          <img v-show="qrVisible == false" :src="orderInfo.pay_local" alt class="qr_img" />
        </div>
        <div class="download" v-show="qrVisible == false">
          <a :href="orderInfo.pay_local" download style="color:#07c160;">
            <van-button plain hairline type="primary" size="small" style="width:50%;">保存二维码</van-button>
          </a>
        </div>
        <div class="download" v-show="qrVisible == true">
          <van-button
            plain
            hairline
            type="primary"
            @click="savePic"
            size="small"
            style="width:50%;"
          >保存二维码</van-button>
        </div>
        <p class="qr_tips">请使用微信付款</p>
        <p class="amount">
          <span class="amount_tips">支付时请输入此金额</span>
          <span class="amount_amount">
            <strong>
              <label>￥{{orderInfo.order_amount}}</label>
            </strong>
          </span>
        </p>
        <a href="weixin://dl" class="open_btn">
          <van-button type="primary" round>打开微信</van-button>
        </a>
      </div>
      <!-- <van-cell class="bankInfo">
        <template>
          <img class="fornt_icon" src="../../assets/Write.png" alt />
          <span class="bank_title">备注：{{orderInfo.remark_id}}</span>
          <img
            src="../../assets/copy.png"
            alt
            class="copy"
            v-clipboard:copy="orderInfo.remark_id"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          />
        </template>
      </van-cell> -->
      <div style="font-size:14px;color:#ff976a;margin:8px 10px;">
        <van-icon name="warning" style="padding-top:5px;" />
        <span style="vertical-align: bottom;padding-left:5px;">转账备注必填，否则不能及时到账</span>
      </div>
      <img style="height:20px;width:100%;" src="../../assets/lineg.png" alt />
      <div style="padding:0 24px 10px 24px;">
        <p class="title">
          <strong>订单状态</strong>
        </p>
        <p class="orderInfo">
          订单类型：
          <span>微信</span>
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
import { CountDown, CellGroup, Icon, Toast, Button, Cell } from "vant";
import QRCode from "qrcodejs2";
export default {
  components: {
    [CountDown.name]: CountDown,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Cell.name]: Cell
  },
  data() {
    return {
      orderInfo: {
        amount: ""
      },
      qrVisible: false,
      sec: 300000,
      timer: "",
    };
  },

  methods: {
    //获取信息
    getData() {
      var _this = this;
      _this.$axios
        // .post("index.php?s=OTCUser.pcode&time=" + this.$route.query.time)
        .get("Task/Comment_CommonController.getOrder?orderNo=" + this.$route.query.time)
        .then(res => {
          if (res.data.data.status > 2 ) {
            this.$router.push({ path: "end" });
            clearInterval(this.timer)
          } else {
            this.orderInfo = res.data.data;
            // this.orderInfo.amount = (this.orderInfo.amount / 100).toFixed(2);
            // this.orderInfo.amount = this.orderInfo.order_amount;
            this.sec = parseInt(new Date(this.orderInfo.end_time.replace(/\//g,"-")).getTime()) - new Date().getTime();
            this.qr();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    finish() {
      this.sec = 300000;
    },
    //二维码
    qr() {
      let qr = new QRCode("qr", {
        width: 195,
        height: 195, // 高度
        text: this.orderInfo.pay_local // 二维码内容
      });
    },
    // 保存生成二维码
    savePic() {
      let myCanvas = document
        .getElementById("qr")
        .getElementsByTagName("canvas");
      let a = document.createElement("a");
      a.href = myCanvas[0].toDataURL("image/png");
      a.download = "付款二维码";
      a.click();
      Toast.success("下载成功");
    },
    //保存图片二维码
    downCom() {
      this.downloadByBlob(this.orderInfo.pay_local, "收款二维码");
    },
    downloadByBlob(url, name) {
      let image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
      image.onload = () => {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, image.width, image.height);
        canvas.toBlob(blob => {
          let url = URL.createObjectURL(blob);
          this.download(url, name);
          // 用完释放URL对象
          URL.revokeObjectURL(url);
        });
      };
    },
    //复制
    onCopy() {
      Toast.success("复制成功");
    },
    onError() {
      Toast.fail("复制失败请重试！！");
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    this.timer = setInterval(this.getData, 5000);
  }
};
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  background-color: #04be02;
  position: absolute;
  .white_bg {
    width: 90%;
    height: 95%;
    background-color: #ffffff;
    margin: 0 auto;
    border-radius: 24px;
    margin-top: 14px;
    .download {
      margin-left: 38%;
      margin-top: 10px;
    }
    .open_btn {
      width: 100%;
      .van-button--normal {
        width: 100%;
      }
    }
  }
  .title {
    text-align: center;
    font-size: 18px;
    margin: 0;
    margin-bottom: 10px;
  }
  .qr {
    width: 195px;
    margin: 0 auto;
    #qr {
      width: 100%;
      height: 100%;
    }
    .qr_img {
      width: 100%;
    }
  }
  .qr_tips {
    text-align: center;
    color: #009dff;
    font-size: 12px;
    margin: 5px;
  }
  .amount {
    margin: 0;
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

.bankInfo {
  font-size: 12px;
  color: #606266;
  .bank_title {
    padding-left: 15px;
  }
  .fornt_icon {
    vertical-align: middle;
  }
  .copy {
    float: right;
    vertical-align: middle;
  }
}
</style>
