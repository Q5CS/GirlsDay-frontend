<template>
  <div class="wish-detail">
    <van-loading v-if="loading" size="80px" style="padding: 20px 0" vertical
      >加载中......</van-loading
    >

    <div class="wish-container" v-if="!loading">
      <van-notice-bar
        text="若心愿已被实现，请点击确认按钮！"
        v-if="data.status === 200 && userinfo.id === data.uid"
      />
      <van-notice-bar
        text="若您已实现该心愿，请联系女生确认！"
        v-if="data.status === 200 && userinfo.id === data.assigned_uid"
      />
      <van-cell-group>
        <van-cell title="类别" :value="data.type | wishTypeFilter" />
        <van-cell
          title="许愿人"
          :value="
            `${data.user_info.qz5z_grade}${data.user_info.qz5z_class} ${data.user_info.name}`
          "
        />
        <van-cell title="许愿人 QQ" :value="data.qq" />
        <van-cell
          title="认领人"
          :value="
            `${data.assigned_user_info.qz5z_grade}${data.assigned_user_info.qz5z_class} ${data.assigned_user_info.name}`
          "
          v-if="data.status >= 200"
        />
      </van-cell-group>
      <light-timeline class="wish-timeline" :items="timeLine"></light-timeline>
      <div class="wish-body">
        <div class="wish-content">
          {{ data.content }}
        </div>
        <img
          class="wish-image"
          :src="data.file_json[0].path + '!contentImg1'"
          v-if="data.file_json && data.file_json.length"
        />
      </div>

      <div style="margin: 10px;" v-if="data.status < 300">
        <van-button
          round
          block
          type="primary"
          v-if="
            data.status <= 100 &&
              !userinfo.is_female &&
              userinfo.id !== data.uid
          "
          :disabled="!canClaimWish"
          @click="handleClaimWish(data.id)"
        >
          {{ canClaimWish ? "认领该心愿" : "已有未完成的心愿，无法认领" }}
        </van-button>
        <div
          class="wish-actions"
          v-if="
            data.status <= 100 &&
              (userinfo.id === data.uid || userinfo.id === data.assigned_uid)
          "
        >
          <van-button
            class="wish-action-button"
            round
            block
            type="primary"
            @click="handleEditWish(data.id)"
          >
            修改
          </van-button>
          <van-button
            class="wish-action-button"
            round
            block
            type="danger"
            @click="handleDeleteWish(data.id)"
          >
            删除
          </van-button>
        </div>
        <div
          class="wish-actions"
          v-if="
            data.status > 100 &&
              data.status < 300 &&
              (userinfo.id === data.uid || userinfo.id === data.assigned_uid)
          "
        >
          <van-button
            class="wish-action-button"
            round
            block
            type="primary"
            v-if="userinfo.id === data.uid"
            @click="handleCompeleteWish(data.id)"
          >
            确认实现
          </van-button>
          <van-button
            class="wish-action-button"
            round
            block
            type="danger"
            @click="handleUnClaimWish(data.id)"
          >
            取消认领
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Button,
  Cell,
  CellGroup,
  Dialog,
  Loading,
  Toast,
  NoticeBar
} from "vant";
import {
  getWish,
  deleteWish,
  claimWish,
  unClaimWish,
  completeWish
} from "@/api/wish";
import { mapGetters } from "vuex";
export default {
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Loading.name]: Loading,
    [NoticeBar.name]: NoticeBar
  },
  data() {
    return {
      loading: true,
      id: undefined,
      data: {},
      timeLine: []
    };
  },
  computed: {
    ...mapGetters(["userinfo", "claimedWishes", "stat"]),
    canClaimWish: function() {
      if (!this.claimedWishes) return true;
      let n = 0; // 未完成的任务数量
      this.claimedWishes.forEach(ele => {
        if (ele.status < 300) {
          n++;
        }
      });
      return n < this.stat.max_claimed_and_in_progress_wishes;
    }
  },
  filters: {
    wishTypeFilter(val) {
      const map = {
        1: "实物类",
        2: "其他"
      };
      return map[val];
    }
  },
  activated() {
    this.id = this.$route.params.id;
    this.getWishDetail(this.id);
  },
  methods: {
    getWishDetail(id) {
      this.loading = true;
      getWish(id)
        .then(res => {
          if (!res || !res.wish) {
            alert("获取数据出错，请重试或联系管理员！");
            history.back();
          }
          this.loading = false;
          this.data = res.wish;
          // 然后做个 timeline
          this.createTimeLine();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    createTimeLine() {
      this.timeLine = [];
      this.timeLine.push({
        tag: this.data.created_at,
        color: this.data.status == 100 ? " #f77984" : "#dcdcdc",
        type: "circle",
        content: `${this.data.user_info.name}许下了心愿`
      });
      if (this.data.status >= 200) {
        this.timeLine.push({
          tag: this.data.assigned_at,
          color: this.data.status == 200 ? " #f77984" : "#dcdcdc",
          type: "circle",
          content: `心愿被${this.data.assigned_user_info.name}认领`
        });
      }
      if (this.data.status >= 300) {
        this.timeLine.push({
          tag: this.data.completed_at,
          color: this.data.status == 300 ? " #f77984" : "#dcdcdc",
          type: "star",
          content: `心愿被实现啦！`
        });
      }
    },
    handleEditWish(id) {
      this.$router.push({ path: `/wish/edit/${id}` });
    },
    handleDeleteWish(id) {
      Dialog.confirm({
        title: "是否删除？",
        message: "是否删除你的心愿？删除后不可恢复！"
      })
        .then(() => {
          Toast.loading({
            duration: 0,
            mask: true,
            message: "删除中..."
          });
          return deleteWish(id);
        })
        .then(() => {
          return Dialog.alert({
            title: "删除成功",
            message: "该心愿已被删除！"
          });
        })
        .then(() => {
          Toast.clear();
          this.$router.push({ path: "/wish/myWish" });
          this.$store.dispatch("GetUserInfo");
        })
        .catch(() => {
          Toast.clear();
        });
    },
    handleClaimWish(id) {
      Dialog.confirm({
        title: "是否认领？",
        message: `每人只能同时实现 ${this.stat.max_claimed_and_in_progress_wishes} 个心愿，是否确认认领？`
      })
        .then(() => {
          Toast.loading({
            duration: 0,
            mask: true,
            message: "认领中..."
          });
          return claimWish(id);
        })
        .then(() => {
          return Dialog.alert({
            title: "认领成功",
            message: "该心愿已成功被你认领！"
          });
        })
        .then(() => {
          Toast.clear();
          this.getWishDetail(id);
          this.$store.dispatch("GetUserInfo");
        })
        .catch(() => {
          Toast.clear();
        });
    },
    handleUnClaimWish(id) {
      Dialog.confirm({
        title: "是否取消认领？",
        message: "取消认领后，该心愿将重新回到心愿墙！"
      })
        .then(() => {
          Toast.loading({
            duration: 0,
            mask: true,
            message: "取消认领中..."
          });
          return unClaimWish(id);
        })
        .then(() => {
          return Dialog.alert({
            title: "取消认领成功",
            message: "该心愿已被取消认领！"
          });
        })
        .then(() => {
          Toast.clear();
          this.getWishDetail(id);
          this.$store.dispatch("GetUserInfo");
        })
        .catch(() => {
          Toast.clear();
        });
    },
    handleCompeleteWish(id) {
      Dialog.confirm({
        title: "是否确认实现？",
        message: "该操作不可撤销哦！"
      })
        .then(() => {
          Toast.loading({
            duration: 0,
            mask: true,
            message: "确认实现中..."
          });
          return completeWish(id);
        })
        .then(() => {
          return Dialog.alert({
            title: "确认实现成功",
            message: "该心愿已被确认实现！"
          });
        })
        .then(() => {
          Toast.clear();
          this.getWishDetail(id);
          this.$store.dispatch("GetUserInfo");
        })
        .catch(() => {
          Toast.clear();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.wish-timeline {
  margin-top: 0;
}

.wish-body {
  padding: 10px;
  .wish-content {
    font-size: 14px;
    line-height: 18px;
  }
  .wish-image {
    max-width: 100%;
    max-height: 600px;
    display: block;
    margin: 10px auto;
  }
}

.wish-actions {
  display: flex;
  .wish-action-button {
    margin: 5px;
    flex: 1;
  }
}
</style>
