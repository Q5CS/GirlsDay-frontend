<template>
  <div class="reply-box">
    <transition name="fade">
      <div class="reply-box" v-if="show">
        <van-field
          class="reply-input"
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          :placeholder="placeholder"
          :maxlength="maxlength"
          show-word-limit
        />
        <div class="reply-action">
          <van-button class="van-button" size="small" @click="$emit('cancel')"
            >取消</van-button
          >
          <van-button
            class="van-button"
            size="small"
            type="primary"
            @click="handleReply"
            :loading="posting"
            >发送</van-button
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Button, Checkbox, Divider, Field, Icon, Toast } from "vant";
import { postBlessing } from "@/api/bless";

export default {
  props: {
    show: Boolean,
    placeholder: {
      type: String,
      default: "留下你的祝福..."
    },
    maxlength: {
      type: String,
      default: "140"
    }
  },
  components: {
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [Divider.name]: Divider,
    [Field.name]: Field,
    [Icon.name]: Icon
  },
  data() {
    return {
      showReplyBox: false,
      message: "",
      posting: false
    };
  },
  methods: {
    handleReply() {
      if (this.message === "") {
        alert("请输入回复内容！");
        return;
      }
      this.posting = true;
      let data = {
        message: this.message
      };
      postBlessing(data)
        .then(res => {
          Toast.success(res.message);
          this.posting = false;
          this.message = "";
          this.$emit("after-post");
        })
        .catch(() => {
          this.posting = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.reply-box {
  margin-top: 10px;
  .reply-input {
    border: 1px solid #e8e8e8;
    border-radius: 3px;
  }
  .reply-action {
    margin-top: 8px;
    text-align: right;
    .anonymous-checkbox {
      float: left;
      margin-top: 5px;
    }
    .van-button + .van-button {
      margin-left: 8px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
