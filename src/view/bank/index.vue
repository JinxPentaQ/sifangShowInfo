<template>
  <div class="wrap">
    <div class="order_amount">
      <span class="amount">￥{{orderInfo.order_amount}}</span>
    </div>
    <van-cell class="bankInfo">
      <template>
        <img class="fornt_icon" src="../../assets/Wallet.png" alt />
        <span class="bank_title">转账金额：{{orderInfo.order_amount}}</span>
        <img
          src="../../assets/copy.png"
          alt
          class="copy"
          v-clipboard:copy="orderInfo.order_amount"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        />
      </template>
    </van-cell>
    <van-cell class="bankInfo">
      <template>
        <img class="fornt_icon" src="../../assets/Credit Card.png" alt />
        <span class="bank_title">银行卡号：{{orderInfo.pay_no}}</span>
        <img
          src="../../assets/copy.png"
          alt
          class="copy"
          v-clipboard:copy="orderInfo.pay_no"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        />
      </template>
    </van-cell>
    <van-cell class="bankInfo">
      <template>
        <img class="fornt_icon" src="../../assets/User.png" alt />
        <span class="bank_title">收款姓名：{{orderInfo.pay_name}}</span>
        <img
          src="../../assets/copy.png"
          alt
          class="copy"
          v-clipboard:copy="orderInfo.pay_name"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        />
      </template>
    </van-cell>
    <van-cell class="bankInfo">
      <template>
        <img class="fornt_icon" src="../../assets/Building.png" alt />
        <span class="bank_title">银行名称: {{orderInfo.pay_organ}}</span>
        <img
          src="../../assets/copy.png"
          alt
          class="copy"
          v-clipboard:copy="orderInfo.pay_organ"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        />
      </template>
    </van-cell>
    <van-cell class="bankInfo">
      <template>
        <img class="fornt_icon" src="../../assets/Building.png" alt />
        <span class="bank_title">开户行：{{orderInfo.pay_local}}</span>
        <img
          src="../../assets/copy.png"
          alt
          class="copy"
          v-clipboard:copy="orderInfo.pay_local"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        />
      </template>
    </van-cell>
 
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
    <div style="font-size:14px;color:#ff976a;margin:8px 0 8px 0;margin-left:10px;">
      <van-icon name="warning" style="padding-top:5px;" />
      <span style="vertical-align: bottom;padding-left:5px;">转账备注必填，否则不能及时到账</span>
    </div>
    <div class="tips">
      <p>1.支持所有手机银行转账，也可使用微信、支付宝、云闪付转银行卡</p>
      <!-- <p>2.付款转账时，备注留言请复制粘贴如，上“备注号”</p> -->
    </div>
    <div style="padding:14px 24px 24px 24px;">
      <p class="title">
        <strong>订单状态</strong>
      </p>
      <p class="orderInfo">
        订单类型：
        <span>银行卡转账</span>
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
      bankInfo: {},
      sec: 0,
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
          }  else {
            this.orderInfo = res.data.data;
            // this.bankInfo = JSON.parse(res.data.data.pay_code);
            // this.orderInfo.amount = (this.orderInfo.amount / 100).toFixed(2);
            this.sec = parseInt(new Date(this.orderInfo.end_time.replace(/\//g,"-")).getTime()) - new Date().getTime();
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
      Toast.fail("复制失败请重试！！");
    },
    finish() {
      // this.$router.push({ path: "end" });
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    this.timer = setInterval(this.getData, 5000);
    this.sec = 300;
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
  height: 88px;
  background-color: #009dff;
  color: #ffffff;
  font-size: 40px;
  line-height: 88px;
  text-indent: ;
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
  vertical-align: middle;
}
.tips {
  color: #909399;
  font-size: 10px;
  padding-left: 16px;
  padding-right: 10px;
  margin-top: 16px;
}
.van-cell__value--alone {
  color: #606266;
}
.van-cell {
  background-color: #f7f6f9;
}
.title {
  text-align: center;
  font-size: 18px;
  margin: 0;
  margin-bottom: 20px;
}
.orderInfo {
  color: #606266;
  font-size: 14px;
}
</style>
