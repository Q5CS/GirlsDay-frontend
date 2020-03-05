<template>
  <div class="me">
    <div class="banner">
      <img src="@/assets/image/banner.jpg" />
    </div>
    <img class="logo" :src="userinfo.avatar" />
    <van-cell-group>
      <van-cell title="姓名" :value="userinfo.name" />
      <van-cell title="性别" :value="userinfo.sex" />
      <van-cell title="年段" :value="userinfo.qz5z_grade" />
      <van-cell title="班级" :value="userinfo.qz5z_class" />
      <van-cell title="学号" :value="userinfo.qz5z_number" />
      <!-- <van-cell title="个人资料" is-link to="/user/profile" /> -->
      <van-cell title="退出" is-link @click="handleLogout()" />
    </van-cell-group>
    <div class="text">
      <p class="copyright">
        © 2020 Fly3949
        <br />
        All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
import { CellGroup, Cell, Dialog, Field, Toast } from "vant";
import { mapGetters } from "vuex";

export default {
  name: "Me",
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Dialog.Component.name]: Dialog.Component,
    [Field.name]: Field
  },
  computed: {
    ...mapGetters(["userinfo"])
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("LogOut").then(() => {
        this.$router.push({
          name: "login"
        });
        Toast.success("退出成功");
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  img {
    max-width: 100%;
  }
}

.me {
  .logo {
    margin: 10px auto 20px auto;
    display: block;
    max-width: 20%;
    border-radius: 100%;
    border: 2px #fff solid;
  }
  .text {
    text-align: center;
    .copyright {
      font-size: 12px;
      color: gray;
    }
  }
}
</style>
