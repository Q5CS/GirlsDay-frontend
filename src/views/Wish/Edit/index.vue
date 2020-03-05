<template>
  <div class="edit-wish">
    <van-form @submit="onSubmit">
      <van-field name="radio" label="心愿类型">
        <template #input>
          <van-radio-group v-model="wishForm.type" direction="horizontal">
            <van-radio name="1">实物类</van-radio>
            <van-radio name="2">其他</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="wishForm.qq"
        name="qq"
        label="QQ"
        type="number"
        placeholder="请输入 QQ 号"
        :rules="[{ required: true, message: '请填写 QQ 号' }]"
      />
      <van-field
        v-model="wishForm.message"
        name="message"
        label="心愿"
        rows="3"
        autosize
        type="textarea"
        placeholder="请输入心愿内容"
        maxlength="140"
        show-word-limit
        :rules="[{ required: true, message: '请填写心愿内容' }]"
      />
      <van-field name="uploader" label="图片(可选)">
        <template #input>
          <div
            class="uploaded-img-box"
            v-for="(item, index) in wishForm.file_json"
            :key="item.path"
          >
            <van-image
              width="80"
              height="80"
              fit="cover"
              :src="item.path"
              @click="handleImagePreview(index)"
            />
            <van-button
              class="delete-btn"
              type="warning"
              size="small"
              v-on:click.stop.prevent="handleDeleteItem(index)"
              >删除</van-button
            >
          </div>
          <van-uploader
            class="uploader"
            :class="{ hasFile: wishForm.file_json.length }"
            multiple
            :max-count="1"
            :after-read="onRead"
            v-if="!wishForm.file_json || wishForm.file_json.length < maxUpload"
          />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {
  Button,
  Dialog,
  Field,
  Form,
  Image,
  ImagePreview,
  RadioGroup,
  Radio,
  Toast,
  Uploader,
  Notify
} from "vant";
import { uploadPic, getWish, saveWish } from "@/api/wish";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isEdit: false,
      maxUpload: 1,
      wishForm: {
        type: "1",
        qq: "",
        message: "",
        file_json: []
      }
    };
  },
  computed: {
    ...mapGetters(["userinfo"])
  },

  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Form.name]: Form,
    [Image.name]: Image,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Uploader.name]: Uploader
  },
  activated() {
    if (process.env.NODE_ENV !== "development" && !this.userinfo.is_female) {
      alert("你想干蛤？！");
      history.back();
    }
    this.id = this.$route.params.id;
    if (this.id) {
      this.isEdit = true;
      this.getWishInfo(this.id);
    } else {
      this.isEdit = false;
      this.wishForm = {
        type: "1",
        qq: "",
        message: "",
        file_json: []
      };
    }
  },
  methods: {
    getWishInfo(id) {
      Toast.loading({
        duration: 0,
        mask: true,
        message: "加载中..."
      });
      getWish(id)
        .then(res => {
          if (!res || !res.wish) {
            alert("获取数据出错，请重试或联系管理员！");
            history.back();
          }
          res = res.wish;
          this.wishForm = {
            id: id,
            type: res.type.toString(),
            qq: res.qq,
            message: res.content,
            file_json: res.file_json
          };
          Toast.clear();
        })
        .catch(() => {
          Toast.clear();
        });
    },
    onSubmit() {
      // console.log(this.wishForm);
      Toast.loading({
        duration: 0,
        mask: true,
        message: "保存中..."
      });
      saveWish(this.wishForm)
        .then(() => {
          Toast.clear();
          return Dialog.alert({
            title: "保存成功",
            message: "恭喜，心愿保存成功！"
          });
        })
        .then(() => {
          this.$store.dispatch("GetUserInfo");
          this.$router.push({ path: "/wish/myWish" });
        })
        .catch(() => {
          alert("保存失败，请重试！");
          Toast.clear();
        });
    },
    handleImagePreview(index) {
      ImagePreview({
        images: this.wishForm.file_json.map(obj => obj.path),
        startPosition: index
      });
    },
    handleDeleteItem(index) {
      const that = this;
      Dialog.confirm({
        message: "是否删除这张图片？",
        beforeClose: function(action, done) {
          if (action === "confirm") {
            that.wishForm.file_json.splice(index, 1);
            Notify({
              type: "warning",
              message: "删除成功，请记得保存！！！"
            });
            done();
          } else {
            done();
          }
        }
      }).catch(() => {});
    },
    onRead(file) {
      // console.log(file);
      const maxSize = 10;
      if (file.file.size > maxSize * 1024 * 1024) {
        alert(`文件大小需要在 ${maxSize}M 以内！`);
        return;
      }
      Toast.loading({
        duration: 0,
        mask: true,
        message: "上传中..."
      });
      const data = new FormData();
      data.append("file", file.file);
      uploadPic(data)
        .then(response => {
          // console.log(response);
          this.wishForm.file_json.push({ path: response.path });
          // console.log(this.wishForm.file_json);
          Toast.clear();
          Notify({
            type: "warning",
            message: "上传成功，请记得保存！！！"
          });
        })
        .catch(() => {
          Toast.clear();
          Notify({ type: "danger", message: "图片上传失败！" });
        });
    }
  }
};
</script>

<style lang="scss">
.edit-wish {
  .uploader.hasFile {
    margin-top: -35px;
  }
  .uploaded-img-box {
    width: 80px;
    display: inline-block;
    vertical-align: top;
    margin: 10px;
  }
  .delete-btn {
    display: block;
    margin: 5px auto 0 auto;
  }
}
</style>
