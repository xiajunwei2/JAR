export default {
  data(){
    return {
      // 分页数据
      pageMap:{
        current:1,
        size:10,
        total:0
      },
      dataLists:[],// 列表数据
      keywords:'', //搜索关键词
      pageState:1,
      loading:true,
    }
  },
  methods: {
    handlePage(page){
      this.pageMap.current = page;
      this.getDatas();
    },
    handleResponse({err,data}){
      this.loading = false;
      if(err) return;
      this.pageMap.total = data.total || 0;
      this.dataLists = data.records || [];
      this.pageState = this.dataLists.length === 0?2:3;
    },
    clearKeywords(){
      if(!this.keywords) return;
      this.keywords = '';
      this.$store.state.keywords = '';
      this.$router.replace(this.$route.path);
      this.getDatas();
    }
  },
  created () {
    this.getLists();
    this.keywords = this.$route.query.k || '';
  },
}