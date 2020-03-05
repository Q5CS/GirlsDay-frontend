<template>
  <div class="wish-list">
    <waterfall
      :col="2"
      :gutterWidth="gutterWidth"
      :data="data"
      v-if="data && data.length"
    >
      <template>
        <div class="cell-item" v-for="item in data" :key="item.id">
          <wish-box :ele="item"></wish-box>
        </div>
      </template>
    </waterfall>
    <p v-if="!loading && !data" style="text-align:center">
      很遗憾，这里啥也没有
    </p>
    <div style="margin: 16px;">
      <van-button
        round
        block
        type="primary"
        size="small"
        :disabled="loading"
        :loading="loading"
        loading-text="少女祈祷中..."
        @click="handleLoadMore()"
      >
        换一批
      </van-button>
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
import WishBox from "./WishBox";
import { getWishes } from "@/api/wish";

export default {
  props: {
    limit: {
      type: Number,
      default: 20
    },
    isGraduate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: true,
      query: {
        limit: this.limit,
        is_graduate: this.isGraduate
      },
      data: []
    };
  },
  computed: {
    itemWidth() {
      return 138 * 0.5 * (document.documentElement.clientWidth / 375);
    },
    gutterWidth() {
      return 9 * 0.5 * (document.documentElement.clientWidth / 375);
    }
  },
  components: {
    [Button.name]: Button,
    WishBox
  },
  mounted() {
    this.getWishList();
  },
  methods: {
    getWishList() {
      this.loading = true;
      getWishes(this.query)
        .then(res => {
          this.data = res.wishes;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleLoadMore() {
      this.data = [];
      this.getWishList();
    }
  }
};
</script>

<style lang="scss">
.wish-list {
  padding: 3px;
}
</style>
