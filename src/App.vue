<template>
  <div id="app" class="app">
    <van-sticky>
      <van-nav-bar
        v-show="title && showNav"
        :title="title"
        left-arrow
        @click-left="onBack"
      />
    </van-sticky>
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar v-model="active" active-color="#f77984">
      <van-tabbar-item
        :icon="item.icon"
        @click="routeTo(item.link)"
        v-for="item in items"
        :key="item.link"
      >
        {{ item.name }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { NavBar, Sticky, Tabbar, TabbarItem } from "vant";

export default {
  name: "App",
  components: {
    [NavBar.name]: NavBar,
    [Sticky.name]: Sticky,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 0,
      items: [
        {
          name: "心愿墙",
          link: "/",
          icon: "home-o"
        },
        {
          name: "祝福墙",
          link: "/bless",
          icon: "flower-o"
        },
        {
          name: "我",
          link: "/user/me",
          icon: "friends-o"
        }
      ]
    };
  },
  mounted() {
    this.handleRouterChange(this.$route);
  },
  computed: {
    title() {
      const { name } = this.$route.meta;
      return name ? name.replace(/-/g, "") : "";
    },
    showNav() {
      return this.$route.meta.hideNav != true;
    }
  },
  methods: {
    routeTo(link) {
      this.$router.push(link);
    },
    onBack() {
      history.back();
    },
    handleRouterChange(to) {
      this.active = null;
      for (var i = 0; i < this.items.length; i++) {
        if (to.path === this.items[i].link) {
          this.active = i;
          break;
        }
      }
    }
  },
  watch: {
    // 监听路由变化，同步处理 TabBar 的高亮
    $route(to) {
      this.handleRouterChange(to);
    }
  }
};
</script>

<style>
.app {
  padding-bottom: 50px; /* footer */
}
</style>
