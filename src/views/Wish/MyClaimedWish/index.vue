<template>
  <div class="my-claimed-wish">
    <div class="wish-item" v-for="item in claimedWishes" :key="item.id">
      <wish-list-item :ele="item"></wish-list-item>
    </div>
    <p v-if="!claimedWishes" style="text-align:center">
      这里啥也没有，快去认领一个心愿吧！
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import WishListItem from "../components/WishListItem";

export default {
  components: {
    WishListItem
  },
  computed: {
    ...mapGetters(["claimedWishes"])
  },
  activated() {
    if (process.env.NODE_ENV !== "development" && this.userinfo.is_female) {
      alert("这种事让男生来就好啦（");
      history.back();
    }
  }
};
</script>
