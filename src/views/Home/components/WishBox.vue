<template>
  <div class="wish-box" @click="viewWish()">
    <div class="card-wrap">
      <div class="card">
        <div class="card-header">
          <div class="poster-name">{{ ele.user_info.name }}</div>
          <div class="poster-class">
            {{ ele.user_info.qz5z_grade + ele.user_info.qz5z_class }}
          </div>
        </div>
        <div class="card-body">
          <img
            :src="ele.file_json[0].path + '!listImg1'"
            v-if="ele.file_json && ele.file_json.length"
          />
          <div class="post-content">{{ ele.content }}</div>
        </div>
        <div class="card-footer">
          <div class="post-time">{{ ele.created_at }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ele: {
      type: Object,
      required: true
    }
  },
  methods: {
    viewWish() {
      this.$router.push({ path: `/wish/detail/${this.ele.id}` });
    }
  }
};
</script>

<style lang="scss" scoped>
.card-wrap {
  padding: 3px;
  .card {
    background: #fff;
    border: solid 1px #e4e4e4;
    border-radius: 3px;
    .card-header {
      padding: 10px;
      .poster-name {
        font-size: 14px;
        line-height: 14px;
      }
      .poster-class {
        margin-top: 8px;
        font-size: 12px;
        line-height: 12px;
        color: #666666;
      }
    }
    .card-body {
      img {
        width: 100%;
        max-height: 300px;
      }
      .post-content {
        padding: 10px;
        font-size: 14px;
        line-height: 16px;
        word-break: break-all;
        white-space: normal;
      }
    }
    .card-footer {
      .post-time {
        padding: 10px;
        font-size: 12px;
        color: #666666;
      }
    }
  }
}
</style>
