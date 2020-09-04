<template>
  <!-- <error-content code="404" desc="Oh~~您的页面好像飞走了~" :src="src"/> -->
  <error-content :src="src" :desc='$t("errorpage.405")'/>
</template>

<script>
// import error404 from '@/assets/images/error-page/error-404.svg'
import error405 from '@/assets/images/405.png'
import errorContent from './error-content.vue'
export default {
  name: 'error_405',
  components: {
    errorContent
  },
  data () {
    return {
      src: error405,
      // desc:'页面正在建设中，请期待...'
    }
  }
}
</script>
