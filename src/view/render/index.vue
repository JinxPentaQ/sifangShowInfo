<template>
  <div class="wrap">
    <div style="text-align:center;margin-top:100px;">
      <van-loading size="24px" style="dislplay:inline-block"> </van-loading>
        您好，您该笔订单的入款信息正在火速为您准备中，
        <br/>
        请不要关闭该页面。
        <br/>
        稍后会显示在该页面中，谢谢您耐心的等待！
        <br/>
        倒计时：(
        <van-count-down :time="time" format=" ss" style="dislplay:inline-block" />)
    </div>
  </div>
</template>

<script>
import { Cell, CountDown, Icon, Toast, Loading } from "vant";
export default {
  components: {
    [Cell.name]: Cell,
    [CountDown.name]: CountDown,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Loading.name]: Loading
  },
  data() {
    return {
      str: "",
      timer: "",
      time: 99000
    };
  },

  methods: {
    //获取url
    getQueryString() {
      this.str = window.location.href.split("?")[1]; //获取url中"?"符后的字串
      if (this.str) {
        this.getData();
      }
    },
    //获取信息
    getData() {
      var _this = this;
      _this.$axios
        // .post("index.php?s=OTCUser.pcode&time=" + this.str)
        .get("PageController/getOngoingOrder?order_no=" + this.str)
        .then(res => {
          if(res.data.data.pay_info_type === 1) {
            this.$router.push({ path: "btc", query: { time: this.str } });
            clearInterval(this.timer);
          }else {
            window.location.href(res.data.data.address)
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getQueryString();
    this.timer = setInterval(this.getData, 5000);
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
.van-count-down {
  display: inline-block;
}
</style>
