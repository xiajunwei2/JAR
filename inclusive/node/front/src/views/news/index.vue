<template>
  <div class="article">
      <div class="art-title">{{detail.title}}</div>
      <div class="art-src">信息来源： {{detail.source}}</div>
      <div class="art-ctx" v-html="detail.content">

      </div>
  </div>
</template>

<script>
import("./index.less");
import Axios from 'axios';
export default {
    data(){
        return {
            art:require("@/assets/images/art.jpg"),
            zcfwList:[],
            newsList:[],
            detail:{},
            type:{
                'zc':'zcfwList',
                'news':'newsList',
            }
        }
    },
    created(){
        // this.getData();
        if(localStorage.getItem('newsItem')){
            this.detail = JSON.parse(localStorage.getItem('newsItem'));
        }
    },
    methods:{
        getData(){
            // Axios.get('/static/data.json').then(res=>{
            //     if(res.status==200){
            //         this.zcfwList = res.data.zc;
            //         this.newsList = res.data.news;
            //         this.getDetail();
            //     }
            // });
        },
        getDetail(){
            // let type = this.$route.query.type?this.$route.query.type:'zc'
            // let arr = this[this.type[this.$route.query.type]];
            // let details = arr.filter(item=>item.id==this.$route.query.id);
            // this.detail = details && details.length>0?details[0]:{};
        }

    }
}
</script>
