<template>
  <div>
    <span class='jq-hand jq-a' @click="backPrev">返回上一页({{ second }}s)</span>
  </div>
</template>

<script>
export default {
  name: 'backBtnGroup',
  data () {
    return {
      second: 5,
      timer: null
    }
  },
  methods: {
    backHome () {
      // console.log(this.$config)
      this.$router.replace({
        name: this.$config.homeName
      })
    },
    backPrev () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backPrev()
      else this.second--
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
