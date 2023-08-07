<template>
  <div class="reister-wrap">
    <van-form validate-first>
      <p class="title">注册</p>
      <p class="tips">邮箱仅用于登录和保护账号安全</p>
      <div class="register-field-item">
        <div class="register-field-item-label">昵称</div>
        <van-field v-model="register.user_name" :rules="rules.user_name" />
      </div>
      <div class="register-field-item">
        <div class="register-field-item-label">邮箱</div>
        <van-field v-model="register.user_account" :rules="rules.user_account">
          <template #button>
            <van-button
              class="register-field-item-btn"
              size="small"
              type="default"
              v-show="disabled == false"
              @click="validateBtn"
              >{{ btnTitle }}</van-button
            >
            <van-button
              class="register-field-item-btn"
              size="small"
              type="default"
              v-show="disabled == true"
              disabled
              >{{ btnTitle }}</van-button
            >
          </template>
        </van-field>
      </div>
      <div class="register-field-item">
        <div class="register-field-item-label">验证码</div>
        <van-field v-model="register.code" :rules="rules.code"/>
      </div>
      <div class="register-field-item">
        <div class="register-field-item-label">邀请码</div>
        <van-field v-model="register.invitation" :rules="rules.invitation"/>
      </div>
      <div style="margin: 16px">
        <van-button round block @click="onSubmit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Button, Toast, Row, Col } from "vant";
import Qs from "qs";
import { checkEmail } from '../../utils/validate';
export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  data() {
    return {
      wx_val: "",
      ali_val: "",
      yun_val: "",
      bank_val: "",
      native_ali_val: "",
      phone_val: "",
      usdt_val: "",
      wx_small_val: "",
      code: "",
      disabled: false,
      btnTitle: "发送验证码",
      register: {
        invitation: "",
        user_account: "",
        user_name: "",
        code: "",
      },
      rules: {
        user_name: [{ required: true, message: "请输入昵称" }],
        user_account: [
          { required: true, message: "请输入邮箱" },
          { validator: checkEmail, message: "请输入正确格式的邮箱" },
        ],
        invitation: [{ required: true, message: "请输入邀请码" }],
        code: [{ required: true, message: "请输入验证码" }],
      },
    };
  },
  methods: {
    //发送验证吗倒计时
    validateBtn() {
      if (this.register.user_account) {
        this.SendSms();
        //倒计时
        let time = 60;
        let timer = setInterval(() => {
          if (time == 0) {
            clearInterval(timer);
            this.disabled = false;
            this.btnTitle = "获取验证码";
          } else {
            this.btnTitle = time + "秒后重试";
            this.disabled = true;
            time--;
          }
        }, 1000);
      } else {
        Toast("请输入邮箱");
      }
    },
    //发送验证吗
    SendSms() {
      var _this = this;
      let Params = {
        email: this.register.user_account,
      };
      _this.$axios
        .post("Common_CommonController.sendEmailCode", Qs.stringify(Params))
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //注册
    onSubmit() {
      if (
        this.register.user_account !== '' &&
        !this.register.code !== '' &&
        !this.register.invitation !== '' &&
        !this.register.user_name !== '' 
      ) {
        var _this = this;
        _this.$axios
          .post("User_UserController.register", Qs.stringify(this.register))
          .then((res) => {
            if (res.data.ret == 200) {
              Toast("注册成功");
            } else {
              Toast(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Toast("注册信息不能为空！");
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.reister-wrap {
  width: 100vw;
  height: 100vh;
  background: #17171b;
  padding: 20px 16px;
  box-sizing: border-box;

  .title {
    width: 64px;
    height: 36px;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 36px;
    text-align: center;
    color: #ffffff;
  }

  .tips {
    font-size: 12px;
    color: #fff;
  }

  .register-field-item {
    margin-bottom: 32px;

    .register-field-item-label {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #ffffff;
      margin-bottom: 8px;
    }

    /deep/ .van-field {
      height: 40px;
      border: 1px solid #494852;
      border-radius: 8px;
      background-color: inherit;

      .van-field__body {
        align-items: flex-start;
        height: 18px;
      }

      .van-field__control {
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #ffffff;
      }

      .register-field-item-btn {
        top: -8px;
      }
      .van-field__error-message {
        position: relative;
        top: 12px;
      }
    }
    /deep/ .van-cell {
      overflow: inherit;
    }
  }
}
</style>
