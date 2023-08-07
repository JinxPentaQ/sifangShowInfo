<template>
  <div class="wrap">
    <div
      style="text-align:center;margin-top:100px;background-color:#7DB4A4;padding:50px 0;font-size:18px;color:white;"
    >
      <van-icon name="passed" />   订单已结束
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
            this.sec = this.orderInfo.time;
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
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  background-color: #E6EFEE;
  // background-color: #FCF5E4;
  position: absolute;
}
</style>
