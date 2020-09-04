<template>
  <div class="radio-group">
    <!-- <label class="title">{{title}}</label> -->
    <span
       v-for="(item, index) in options"
       :key="index"
       class="radio-link">
      <div class="radio-list">
        <div class="radio-area">
          <label>
            <span>
              <input 
                type="radio"
                :value="typeof item == 'string' ? item : item.value"
                class="radio-input"
                v-model="selectedValue"
                :disabled="typeof item == 'string' ? false : item.disabled == true ? true :false">
              <span class="radio-select"
                :class="typeof item == 'string' ? '' : item.disabled == true ? 'radio-selectDisabled' : '' ">
              </span>
            </span>
            <span class="select-list-item">{{typeof item == 'string' ? item : item.label}}</span>
          </label>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'myRadio',
  data () {
    return {
      selectedValue: ''
    }
  },
  props: {
    value:[String,Number],
    title: String,
    options: [String, Array]
  },
  created () {
    // console.log(typeof (this.options));
    if (typeof (this.options) == 'string') {
      this.options = eval("(" + this.options + ")");
    }
  },
  methods: {
  },
  computed: {
  },
  watch: {
    selectedValue () {
      this.$emit('input', this.selectedValue)
    },
    value(nv){
      this.selectedValue = nv
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.radio-group{
  display: inline-block;
}
.title {
  color: #888;
  font-size: 10px;
  text-align: left;
  line-height: 6px;
  display: block;
  padding: 0rem 2px;
}
.radio-link {
  /* background-color: #fff; */
  box-sizing: border-box;
  color: inherit;
  /* min-height: 20px; */
  display:inline-block;
  /* overflow: hidden; */
  position: relative;
  text-decoration: none;
  margin-right: 40px;
}

.radio-list {
  height: 10px;
  line-height: 10px;
  width: 100%;
  padding: 0rem 2px;
  box-sizing: border-box;
}

.radio-grouprea,
.radio-grouprea label {
  height: 10px;
  width: 100%;
  display: block;
}

.radio-input {
  display: none;
}

.radio-select {
  box-sizing: border-box;
  display: inline-block;
  background-color: #fff;
  border-radius: 100%;
  border: 1px solid #ccc;
  position: relative;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.radio-selectDisabled {
  background-color: #d9d9d9;
  border-color: #ccc;
}

.radio-input:checked + .radio-select {
  background-color: @redColor;
  border-color: @redColor;
}

.radio-input:checked + .radio-select::after {
  background-color: #fff;
  -webkit-transform: scale(1);
  transform: scale(1);
}

.radio-select::after {
  content: ' ';
  border-radius: 100%;
  top: 5px;
  left: 5px;
  position: absolute;
  width: 8px;
  height: 8px;
  -webkit-transition: -webkit-transform 0.2s;
  transition: -webkit-transform 0.2s;
  transition: transform 0.2s;
  transition: transform 0.2s, -webkit-transform 0.2s;
  -webkit-transform: scale(0);
  transform: scale(0);
}
label{
  font-weight: normal;
}
.select-list-item {
  font-size: 1.6rem;
  vertical-align: middle;
  margin-left: 4px;
  color:#40434b;
}
</style>
