<template>
  <div class="my-wish">
    <div class="wish-item" v-for="item in wishes" :key="item.id">
      <wish-list-item :ele="item"></wish-list-item>
    </div>
    <p v-if="!wishes" style="text-align:center">
      这里啥也没有，快去许个愿吧！
    </p>
    <div style="padding: 10px">
      <van-button
        round
        block
        type="primary"
        @click="$router.push({ path: '/wish/new' })"
        :disabled="!canWish"
      >
        {{ canWish ? "许个愿" : "心愿数已达到上限" }}
      </van-button>
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
import { mapGetters } from "vuex";
import WishListItem from "../components/WishListItem";

export default {
  components: {
    [Button.name]: Button,
    WishListItem
  },
  computed: {
    ...mapGetters(["userinfo", "wishes", "stat"]),
    canWish: function() {
      if (!this.wishes) {
        return true;
      }
      return this.wishes.length < this.stat.max_wish_num;
    }
  },
  activated() {
    if (process.env.NODE_ENV !== "development" && !this.userinfo.is_female) {
      alert("？");
      history.back();
    }
  }
};
</script>
