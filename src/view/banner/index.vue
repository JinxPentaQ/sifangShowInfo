<template>
  <div class="banner-body">
    <div class="banner-popover">
      <div class="advice-title">
        <img src="../../assets/advice.png" alt="">
      </div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <img :src="item.img" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="register-content">
      <p class="title">安全注册网址通道</p>
      <div class="register-btns">
        <a :href="url1" _blank>通道一</a>
        <a :href="url2" _blank>通道二</a>
        <a :href="url3" _blank>通道三</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  data() {
    return {
      activeId: "1",
      activeTimer: null,
      isMobile: true,
      bannerList: [
        {
          id: "1",
          name: "福利彩票，百万大奖",
          isEditor: true,
          img: require("../../assets/banner/bg1.png"),
        },
        {
          id: "2",
          name: "感恩大回馈，豪礼送不停",
          isEditor: false,
          img: require("../../assets/banner/bg2.png"),
        },
        {
          id: "3",
          name: "累计充值，豪礼送不停",
          isEditor: false,
          img: require("../../assets/banner/bg3.png"),
        },
        {
          id: "4",
          name: "会员招募，火热进行中",
          isEditor: false,
          img: require("../../assets/banner/bg4.png"),
        },
        {
          id: "5",
          name: "红包雨，每天都不停",
          isEditor: false,
          img: require("../../assets/banner/bg5.png"),
        },
      ],
      url1: "https://www.0768fa.com/r/66666",
      url2: "https://www.0768fa.com/r/88888",
      url3: "https://www.0768fa.com/r/99999",
    };
  },
  methods: {
    // 当前选中tab
    getActiveInfo() {
      return this.bannerList.find((item) => item.id === this.activeId);
    },
  },
  created() {},
  beforeDestroy() {
    clearInterval(this.activeTimer);
    this.activeTimer = null;
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.banner-body {
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  background: #000000;
  overflow: scroll;
  .banner-popover {
    width: 326px;
    height: 553px;
    background: linear-gradient(342.45deg, #232020 37.61%, #4B4B4B 87.55%);
    background-blend-mode: multiply, normal, normal;
    box-shadow: inset 0px 2px 6px rgba(255, 255, 255, 0.23);
    border-radius: 24px;
    margin: 0 auto;
    margin-top: 44px;
    .advice-title {
      width: 188px;
      height: 50px;
      background: url('../../assets/adviceBg.png');
      background-size: contain;
      background-repeat: no-repeat;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      img { 
        width: 110px;
        height: 25px;
        margin-top: 4px;
      }
    }
  }
  .my-swipe {
    width: 294px;
    height: 481px;
    margin: 0 16px;
    .van-swipe-item {
      img {
        width: 294px;
        height: 481px;
      }
    }
  }
  .register-content {
    margin-top: 24px;
    padding-bottom: 44px;
    .title {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      color: #e0c190;
      margin-bottom: 16px;
      text-align: center;
    }
    .register-btns {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      a {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 101.33px;
        height: 40px;
        background: linear-gradient(180deg, #dcc098 0%, #fac45a 100%), #ffffff;
        border-radius: 24px;
        line-height: 40px;
        font-weight: 400;
        font-size: 12px;
        line-height: 17px;
        color: #440002;
        margin-right: 10px;
        text-decoration: none;
      }
    }
  }
}
</style>