<template>
  <div class="note">
    <div class="note">
      <div
        class="content"
        :style="
          `background: linear-gradient(-30deg, transparent 1.25em, ${color} 0px);`
        "
      >
        {{ blessing.content }}
        <van-divider
          :style="{ borderColor: '#ffffff', marginBottom: '0.5em' }"
        ></van-divider>
        <div class="note-footer">
          <van-icon class="poster-icon" name="user-o" size="14" />
          <span class="poster-name">{{ blessing.user_info.name }}</span>
          <van-icon class="post-time-icon" name="clock-o" size="14" />
          <span class="post-time">{{ blessing.created_at | timeFilter }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Divider, Icon } from "vant";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

export default {
  components: {
    [Divider.name]: Divider,
    [Icon.name]: Icon
  },
  props: {
    blessing: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      default: "#FFC0CB"
    }
  },
  filters: {
    timeFilter: function(val) {
      return dayjs(val).fromNow();
    }
  }
};
</script>

<style lang="scss" scoped>
.note {
  border-radius: 0.5em;
  .content {
    width: 100%;
    outline: none;
    padding: 1.2em 1.2em 0.8em 1.2em;
    color: #fff;
    box-sizing: border-box;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    position: relative;
    background: #9acd32;
    /* Fallback */
    background: linear-gradient(-30deg, transparent 1.25em, #9acd32 0);
    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      background: linear-gradient(
          to left top,
          transparent 50%,
          rgba(0, 0, 0, 0.2) 0,
          rgba(0, 0, 0, 0.4)
        )
        100% 0 no-repeat;
      width: 1.44337567em;
      height: 2.5em;
      -webkit-transform: translateY(1.05662433em) rotate(30deg);
      transform: translateY(1.05662433em) rotate(30deg);
      -webkit-transform-origin: top right;
      transform-origin: top right;
      border-top-left-radius: 0.5em;
      box-shadow: -0.2em -0.2em 0.3em -0.1em rgba(0, 0, 0, 0.2);
    }
    .note-footer {
      .poster-icon {
        vertical-align: middle;
      }
      .poster-name {
        vertical-align: middle;
        font-size: 14px;
        margin-left: 2px;
      }
      .post-time-icon {
        vertical-align: middle;
        margin-left: 10px;
      }
      .post-time {
        vertical-align: middle;
        font-size: 14px;
        margin-left: 2px;
      }
    }
  }
}
</style>
