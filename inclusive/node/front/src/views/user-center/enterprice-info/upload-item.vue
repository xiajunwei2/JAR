<template>
  <div class="upload">
    <Upload :show-upload-list="false" :on-success="upSuccess" :before-upload="beforeUpImg"
            :format="['jpg','jpeg','png']" v-bind="$attrs"
            :headers="headers">
      <img :src="upLoadImg" alt="" v-if="upLoadImg && uptype != 2">
      <div class="up-btn" v-if="uptype==1 && !upLoadImg">
        <Icon type="md-add" size="30" v-if="!upLoadImg"/>
      </div>
      <div class="btn-up" v-if="uptype==2">
        <Icon type="md-refresh"/>
        <span>重新上传</span>
      </div>
    </Upload>
    <div class="text" v-if="uptype==1 && !upLoadImg">{{ text }}</div>
  </div>
</template>
<script>
import {getToken} from "@/utils/localStorage"

/**
 * @param uptype 1 方框样式 2 按钮样式
 */
export default {
  name: 'UploadItem',
  props: {
    formName: {type: String, default: ''},
    text: {type: String, default: '上传图片'},
    uptype: {type: Number, default: 1},
    fileUrl: {type: String}
  },
  data() {
    return {
      headers: '',
      upLoadImg: ''
    }
  },
  watch: {
    fileUrl: {
      handler: function (nval) {
        if (nval) {
          this.upLoadImg = nval;
        }
      }
    }
  },
  created() {
    this.headers = {
      token: getToken(),
      Authorization: 'Bearer ' + getToken()
    }
  },
  methods: {
    change() {
      this.$emit('update:formName', '测试');
    },
    upSuccess(res, file) {
      console.log(res)
      if (res.content.value)
        this.upLoadImg = res.content.value
      // console.log(this.upLoadImg)
      let uploadFile = res && res.content || '';
      // this.$emit('update:formName',file.url);
      this.$emit('upload', uploadFile)
    },
    beforeUpImg(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt20M = file.size / 1024 / 1024 < 4;
      if (!isJPG && !isPNG) {
        this.$Notice.warning({
          title: '提示',
          desc: '上传图片必须是JPG/JPEG/PNG/ 格式!'
        });
      }
      if (!isLt20M) {
        this.$Notice.warning({
          title: '提示',
          desc: '上传图片大小不能超过 4MB!'
        });
      }
      return (isJPG || isPNG) && isLt20M;
    },
  }
}
</script>
<style lang="less" scoped>
.upload {
  margin: 0 auto;
  cursor: pointer;
  //padding: 2px;

  img {
    //margin: 1px;
    width: 129px;
    height: 129px;
  }

  .up-btn {
    width: 62px;
    height: 62px;
    border: 1px solid rgba(194, 194, 194, 0.5);
    text-align: center;
    color: rgba(194, 194, 194, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .btn-up {
    width: 96px;
    height: 29px;
    line-height: 29px;
    background: rgba(245, 245, 250, 1);
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 300;
    color: rgba(194, 194, 194, 1);
    text-align: center;
    border-radius: 5px;
  }

  .text {
    text-align: center;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(194, 194, 194, 1);
    cursor: default;
  }
}
</style>
