<template>
  <div class="login">
    <div class="text">
      <h2>登录</h2>
      <p class="tip">
        泉州五中女生节
      </p>
    </div>
    <p style="text-align:center">
      <!-- <van-button type="primary" @click="handleLogin">登录</van-button> -->
      <a :href="loginUrl">
        <van-button type="primary">点此登录</van-button>
      </a>
    </p>
    <img class="oauth-logo" src="@/assets/image/oauth_logo.png" />
  </div>
</template>

<script>
import { Button, Popup, Toast, NavBar } from "vant";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
    [NavBar.name]: NavBar
  },
  computed: {
    loginUrl() {
      return (
        process.env.VUE_APP_OAUTH_URL +
        (this.$route.query.redirect ? this.$route.query.redirect : "auth")
      );
    }
  },
  activated() {
    if (this.$store.getters.token) {
      let redirect = decodeURIComponent(this.$route.query.redirect || "/");
      this.$router.push({
        path: redirect
      });
    } else if (this.$route.query.code) {
      this.handleQz5zLogin(this.$route.query.code);
    }
  },
  methods: {
    handleQz5zLogin(code) {
      Toast.loading({
        duration: 0,
        mask: true,
        message: "登录中..."
      });
      this.$store
        .dispatch("LoginByOauth", { code })
        .then(() => {
          return this.$store.dispatch("GetUserInfo");
        })
        .then(() => {
          Toast.clear();
          let redirect = decodeURIComponent(
            (this.$route.query.state != "auth" && this.$route.query.state) ||
              "/"
          );
          this.$router.push({
            path: redirect
          });
        })
        .catch(() => {
          // console.log(err);
          Toast.clear();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.oauth-logo {
  margin: 100px auto 0 auto;
  display: block;
  max-width: 40%;
  opacity: 0.5;
}
.login {
  padding-top: 15px;
}
.text {
  text-align: center;
  .tip {
    font-size: 14px;
    color: gray;
  }
}
</style>
