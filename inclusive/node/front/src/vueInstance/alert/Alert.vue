<template>
    <transition :name='transName'>
        <div class="alert-ins-box" v-show='show'>
            <div :class="{
                'alert-content':true,
                'alert-succ':type=='success',
                'alert-succ-large':boxSize=='large',
                'alert-error':type=='error',
                'alert-warning':type=='warning'
            }" @mouseenter="clearTimer" @mouseleave="remove">
                {{content}}
            </div>
        </div>
  </transition>
</template>

<script>
export default {
    data() {
        return {
            show:false,
            content:'',
            type:'',
            duration:0,
            timer:null,
            documentTimer:null,
            isClose:false,
            transName:'fade',
            boxSize:'small'
        }
    },
    methods: {
        add(opts) {
            if(!opts){
                throw new ReferenceError('params of message is required')
                return
            }
            // 保证传入的数据是一个对象
            if(typeof opts !== 'object'){
                throw new ReferenceError('show params of alert component must be object')
                return
            }
            let {duration,content,type,close,size} = opts
            this.boxSize = size || 'small'
            if(!content){
                throw new ReferenceError('content of alert component is required')
                return
            }
            if(duration>10){
                throw new ReferenceError('duration must be less than 10')
                return
            }
            duration = duration>=0?Number(duration):2
            this.show = true
            this.isClose = close || duration===0
            this.content = content
            this.type = type
            this.duration = duration
            this.clearTimer()
            if(this.documentTimer){
                clearTimeout(this.documentTimer)
                document.removeEventListener('click',this.remove)
            }
            this.documentTimer = setTimeout(() => {
                document.addEventListener('click',this.remove)
            }, 100);
            if(duration>0){
                this.timer = setTimeout(() => {
                    this.remove()
                }, duration*1000);
            }
        },
        success(content,duration = 2,size='small'){
            this.transName = 'scale'
            this.add({content,type:'success',duration,size})
        },
        error(content,duration = 3.5,close = true,size='small'){
            this.transName = 'shake'
            this.add({content,type:'error',duration,close,size})
        },
        warning(content,duration = 2.5,close = true,size='small'){
            this.transName = 'shake'
            this.add({content,type:'warning',duration,close,size})
        },
        remove(e) {
            if(e && e.target.classList.contains('alert-content') && (e.type=='mouseenter' || e.type=='click')){
                return
            }
            this.clearTimer()
            this.show = false
            document.removeEventListener('click',this.remove)
        },
        clearTimer(){
            if(this.timer){
                clearTimeout(this.timer)
                this.timer = null
            }
        }
    }
}
</script>
<style lang='less' scoped>
/* message 样式 */
/* div */
    .alert-ins-box{
        position:fixed;
        z-index:99999;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        /* display: table; */
    }
    /* p */
    .alert-ins-box .alert-content{
        text-align: center;
        font-size: 1.6rem;
        color:#000;
        /* text-align: center; */
        min-width: 80px;
        max-width: 600px;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 20px;
        white-space: nowrap;
        padding:20px;
        background:#fff;
        border-radius: 10px;
        opacity: 1;
        transition: all .3s ease-out;
    }
    /* 成功样式 */
    .alert-ins-box .alert-succ{
        background:rgba(0,0,0,0.8);
        border-radius:10px;
        color: #fff;
        font-size:18px;
    }
    .alert-ins-box .alert-succ-large{
        background:rgba(0,0,0,1);
        font-size:16px;
        opacity:1;
        position: relative;
        padding-top: 110px;
        em{
            margin: auto;
            font-size: 40px;
            position: absolute;
            top: 40px;
            left: 130px;

        }
    }
    /* .alert-ins-box .alert-succ::before{
        content:'\e62b';
        background:#4876e8;
    } */
    .alert-ins-box .alert-error{
        background:#fff8f9;
        border:1px solid @orangeColor;
        color:@orangeColor;
        box-shadow: 0 0 6px 1px rgba(249,115,147,.1);
    }
    .alert-ins-box .alert-warning{
        background:#fff8f9;
        border:1px solid orange;
        color:orange;
        box-shadow: 0 0 6px 1px rgba(249,115,147,.1);
    }
    // .alert-ins-box  .em{
    //     display: inline-block;
    //     font-style: normal;
    //     width:20px;
    //     height:20px;
    //     line-height: 20px;
    //     text-align: center;
    //     border-radius: 50%;
    //     color:#fff;
    //     margin-right:5px;
    //     font-size:1.6rem;
    //     }
    // .alert-ins-box .no{
    //     background:@pinkColor;
    // }
    // .alert-ins-box .wr{
    //     background:@pinkColor;
    // }
    // .alert-ins-box  .yes{
    //     background:@redColor;
    // }
    /* .alert-ins-box .alert-error::before{
        content:'\e75d';
        line-height: 25px;
        font-size:12px;
        background:#f97393;
        transform: none;
    }
    .alert-ins-box .alert-warning::before{
        content:'!';
        background:#f97393;
    }
    .alert-ins-box .alert-info::before{
        content:'i';
        background:#1390EA;
    } */
    .alert-ins-box .absolute {
        cursor: pointer;
        position: absolute;
        right:5px;
        top:3px;
        color:#ccc;
    }
    .alert-ins-box .absolute:hover{
        color:#000;
    }
</style>

