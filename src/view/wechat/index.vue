<template>
  <div class="wrap">
    <div class="order_amount" style="font-weight:400;">
      <p class="wechat_title">微信转手机号码支付</p>
      <p style="font-weight:600;">
        <span class="amount">￥{{orderInfo.amount}}</span>
      </p>
    </div>
    <van-cell class="bankInfo">
      <template>
        <img class="fornt_icon" src="../../assets/Wallet.png" alt />
        <span class="bank_title">转账金额：{{orderInfo.amount}}</span>
        <img
          src="../../assets/copy.png"
          alt
          class="copy"
          v-clipboard:copy="orderInfo.amount"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        />
      </template>
    </van-cell>
    <van-cell class="bankInfo">
      <template>
        <img class="fornt_icon" src="../../assets/iPhone X.png" alt />
        <span class="bank_title">转账号码：{{orderInfo.pay_code}}</span>
        <img
          src="../../assets/copy.png"
          alt
          class="copy"
          v-clipboard:copy="orderInfo.pay_code"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        />
      </template>
    </van-cell>
    <!-- <van-cell class="bankInfo">
      <template>
        <img class="fornt_icon" src="../../assets/Mail Opened.png" alt />
        <span class="bank_title">转账说明</span>
        <img src="../../assets/copy.png" alt class="copy" />
      </template>
    </van-cell>-->
    <van-cell class="bankInfo">
      <template>
        <img class="fornt_icon" src="../../assets/User.png" alt />
        <span class="bank_title">收款人姓名：{{orderInfo.code_name}}</span>
        <img
          src="../../assets/copy.png"
          alt
          class="copy"
          v-clipboard:copy="orderInfo.code_name"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        />
      </template>
    </van-cell>
    <van-cell class="bankInfo">
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
    </van-cell>
    <div style="font-size:14px;color:#ff976a;margin:8px 10px;">
      <van-icon name="warning" style="padding-top:5px;" />
      <span style="vertical-align: bottom;padding-left:5px;">转账备注必填，否则不能及时到账</span>
    </div>
    <div class="tips">
      <p>1.点击“复制打开微信首页”</p>
      <p>2.在微信首页，点击右上角+号-→"收付款"→下拉到底部"向银行卡或机号转账"</p>
      <p>3.点击"向手机号转账"- +分别粘贴"号码"、"金额"、"说明"→点击确认钮完成付款</p>
    </div>
    <div>
      <van-cell title="剩余时间">
        <template>
          <span>
            <van-count-down
              :time="sec"
              format=" mm 分 ss 秒"
              style="display:inline-block;color:#F56C6C;"
              @finish="finish"
            />
          </span>
        </template>
      </van-cell>
      <van-cell title="订单编号" :value="orderInfo.order_no" style="font-size:12px;" />
      <van-cell title="订单类型" value="微信手机号转账" style="font-size:12px;" />
    </div>
  </div>
</template>

<script>
import { Cell, CountDown, Icon, Toast } from "vant";
export default {
  components: {
    [Cell.name]: Cell,
    [CountDown.name]: CountDown,
    [Icon.name]: Icon,
    [Toast.name]: Toast
  },
  data() {
    return {
      orderInfo: {},
      sec: 0,
      bankInfo: {}
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
            this.bankInfo = JSON.parse(res.data.data.pay_code);
            this.orderInfo.amount = (this.orderInfo.amount / 100).toFixed(2);
            this.sec = this.orderInfo.time * 1000;
          }
        })
        .catch(err => {
          console.log(err);
        });
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
  background-color: #f7f6f9;
  position: absolute;
}
.order_amount {
  width: 100%;
  height: 106px;
  background-color: #67c23a;
  color: #ffffff;
  font-size: 40px;
  text-indent: 20px;
  .amount {
    margin-bottom: 20px;
  }
  p {
    color: rgba(255, 255, 255, 1);
    margin: 0;
    padding-top: 20px;
  }
  .wechat_title {
    font-size: 14px;
  }
}
.bankInfo {
  font-size: 12px;
  color: #606266;
  .bank_title {
    padding-left: 15px;
  }
}

.fornt_icon {
  vertical-align: middle;
}
.copy {
  float: right;
  vertical-align: middle;
}
.tips {
  color: #909399;
  font-size: 10px;
  padding-left: 16px;
  margin-top: 16px;
}
.van-cell__value--alone {
  color: #606266;
}
.van-cell {
  background-color: #f7f6f9;
}
</style>
