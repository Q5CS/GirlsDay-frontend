<template>
  <div class="bless">
    <div class="banner">
      <img src="@/assets/image/banner.jpg" />
    </div>
    <div class="comment-header">
      <span class="comment-number">{{ total }} 条祝福</span>
      <span class="add-comment" @click="showReplyBox = true"
        ><van-icon name="edit" size="20" color="#f77984" />写祝福</span
      >
      <reply-box
        :show="showReplyBox"
        @cancel="showReplyBox = false"
        @after-post="
          () => {
            showReplyBox = false;
            getBlessings();
          }
        "
      />
      <van-divider class="comment-divider"></van-divider>
    </div>
    <van-loading v-if="loading" size="80px" style="padding: 20px 0" vertical
      >加载中......</van-loading
    >
    <div class="blessing" v-for="item in blessings" :key="item.id">
      <Note :blessing="item" :color="colors[(item.id * 114514) % 3]"></Note>
    </div>
    <van-pagination
      class="pagination"
      v-if="total !== 0"
      v-model="currentPage"
      :total-items="total"
      :items-per-page="blessingsPerPage"
      @change="getBlessings()"
    />
  </div>
</template>

<script>
import { Divider, Icon, Loading, Pagination } from "vant";
import ReplyBox from "./components/ReplyBox";
import Note from "./components/Note";
import { getBlessings } from "@/api/bless";

export default {
  name: "Bless",
  data() {
    return {
      currentPage: 1,
      blessingsPerPage: 10,
      blessings: {},
      total: 0,
      loading: true,
      showReplyBox: false,
      colors: ["#FFC0CB", "#77C1F0", "#A3D63B"]
    };
  },
  components: {
    [Divider.name]: Divider,
    [Icon.name]: Icon,
    [Loading.name]: Loading,
    [Pagination.name]: Pagination,
    ReplyBox,
    Note
  },
  mounted() {
    this.getBlessings();
  },
  methods: {
    getBlessings() {
      let query = {
        limit: this.blessingsPerPage,
        page: this.currentPage
      };
      this.loading = true;
      this.blessings = {};
      getBlessings(query)
        .then(res => {
          this.total = res.total;
          this.blessings = res.data;
          this.loading = false;
          // console.log(this.blessings);
        })
        .catch(() => {
          alert("加载错误");
          this.loading = false;
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

.bless {
  background: #fcf4e7;
  min-height: calc(100vh - 50px);
  .comment-header {
    padding: 12px 12px 0 12px;
    .comment-number {
      color: #656d71;
    }
    .add-comment {
      float: right;
      color: #f77984;
      .van-icon {
        vertical-align: middle;
      }
    }
  }
  .comment-divider {
    margin: 12px 0;
  }
  .blessing {
    padding: 5px 10px;
  }
  .pagination {
    padding: 20px 0;
  }
}
</style>
