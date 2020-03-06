<template>
  <div class="home">
    <div class="banner">
      <img src="@/assets/image/banner.jpg" />
    </div>
    <!-- <van-notice-bar :text="noticeText" /> -->
    <!-- <div class="now-progress">
      你许下了的正在等待实现
    </div>
    <div class="now-progress">
      你的心愿已被领取，正在实现中
    </div>
    <div class="now-progress">
      你的心愿已被实现
    </div>
    <div class="now-progress">有个心愿已被你领取，请加油实现哦！</div> -->
    <div class="action-wrap">
      <div
        class="action-box"
        @click="$router.push({ path: '/wish/myWish' })"
        v-if="userinfo.is_female"
        style="margin-bottom: 10px"
      >
        <div class="drifting-bottle"></div>
        <div class="action-text">
          <h3>我的心愿</h3>
          <span>点这里许愿或查看许下的心愿</span>
        </div>
        <van-icon class="action-arrow" name="arrow" color="#666666" />
      </div>
      <div
        class="action-box"
        @click="$router.push({ path: '/wish/myClaimedWish' })"
      >
        <div class="drifting-bottle"></div>
        <div class="action-text">
          <h3>我的任务</h3>
          <span>点这里查看我认领的心愿</span>
        </div>
        <van-icon class="action-arrow" name="arrow" color="#666666" />
      </div>
    </div>
    <van-tabs v-model="activeTab">
      <van-tab title="在校生专场">
        <wish-list :isGraduate="false"></wish-list>
      </van-tab>
      <van-tab title="毕业生专场">
        <wish-list :isGraduate="true"></wish-list>
      </van-tab>
    </van-tabs>
    <p class="copyright">
      主办：泉州五中学生会策划部
      <br />
      协办：泉州五中电研社
    </p>
  </div>
</template>

<script>
import { Icon, Tab, Tabs } from "vant";
import { mapGetters } from "vuex";
import WishList from "./components/WishList";

export default {
  name: "Home",
  components: {
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    // [NoticeBar.name]: NoticeBar,
    WishList
  },
  data() {
    return {
      activeTab: 0
      // noticeText: "你的心愿已被实现！"
    };
  },
  computed: {
    ...mapGetters(["userinfo"]),
    name: function() {
      return this.$store.getters.userinfo.name;
    }
  },
  methods: {
    // handleAction() {
    //   if (this.userinfo.is_female) {
    //     this.$router.push({ path: "/wish/myWish" });
    //   } else {
    //     this.$router.push({ path: "/wish/myClaimedWish" });
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  img {
    max-width: 100%;
  }
}

.home {
  background: #fcf4e7;
  min-height: calc(100vh - 50px);
  .action-wrap {
    width: 100%;
    padding: 10px 20px;
    .action-box {
      border: solid 1px #e9e9e9;
      border-radius: 10px;
      background: #fff;
      height: 60px;
      display: flex;
      align-items: center;
      position: relative;
      .drifting-bottle {
        height: 55px;
        width: 50px;
        margin-left: 10px;
        background: url("../../assets/image/drifting_bottle.png");
        background-size: cover;
      }
      .action-text {
        margin-left: 10px;
        h3 {
          font-size: 16px;
          font-weight: bold;
          margin: 0;
          line-height: 30px;
        }
        span {
          font-size: 12px;
          color: #666666;
          line-height: 20px;
        }
      }
      .action-arrow {
        position: absolute;
        right: 10px;
      }
    }
  }
}

.copyright {
  margin: 0;
  padding: 20px 0;
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  color: gray;
}
</style>
