<template>
    <div class="homeNews">
        <div class="news">
            <div class="left">
                <p>热门咨询</p>
                <p>HOT NEWS</p>
            </div>
            <div class="right" @click='toInfo'>
                <a href="#">资讯频道></a>
            </div>
        </div>
        <div class="details">
            <img v-lazy="coverurl" class="cover">
            <div class="word">
                <p class="top">{{title}}</p>
                <p class='center'>{{categoryname}}</p>
                <p class="bottom">{{publishtime | getTime}}<span><i class="fa fa-newspaper-o" aria-hidden="true"></i>{{readcount}}</span></p>
            </div>
            <img src="//files.eyee.com/mcdn/static/img/hot.png" class="hot">
        </div>
    </div>
</template>
<script> 
    import Vue from 'vue';
    import Axios from 'axios';
    export default {
        name:'HomeNews',
        data(){
            return{
                coverurl:'',
                title:'',
                publishtime:'',
                categoryname:'',
                readcount:0
            }
        },
        methods:{
            getNewsData(){
                Axios.post('/api/api/article/searchV236',{"version":"2.6.5","lang":"zh","os":"h5","deviceudid":"h5","sign":"17b58bf42695f18941751822cda4da10","param":"%7B%22pageindex%22%3A1%7D","extend":"/api/article/searchV236"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                       this.coverurl = res.data.data.article.list[0].coverurl;
                       this.title = res.data.data.article.list[0].title;
                       this.publishtime = res.data.data.article.list[0].publishtime;
                       this.categoryname = res.data.data.article.list[0].categoryname;
                       this.readcount = res.data.data.article.list[0].readcount;
                       console.log(new Date().getTime() - new Date(this.publishtime).getTime());
                    }else{
                        console.log(res.statusText);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            },
            toInfo(){
                this.$router.push('/info');
            }
        },
        created(){
            this.getNewsData();
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .homeNews{
        .news{
            .w(375);
            .h(75);
            .padding(30,5,15,5);
            box-sizing: border-box;
            .fs(12);
            display:flex;
            justify-content:space-between;
            align-items:center;
            .left{
                border-left:2px solid @home-color;
                .padding(0,0,0,10);
                font-weight: bold;
            }
            .right a{
                color:@home-a;
            }
        }
        .details{
            .w(375);
            .h(120);
            position: relative;
            .padding(0,13,10,13);
            box-sizing: border-box;
            display:flex;
            justify-content:space-between;
            .word{
               .top{
                    .fs(14);
                    color:#333;
                    font-weight: bold;
                }
                .center{
                    .fs(12);
                    color:#999;
                    margin-top: 34px;
                } 
                .bottom{
                    .fs(12);
                    color:#999;
                    span{
                        margin-left: 18px;
                        i{
                            margin-right: 2px;
                        }
                    }
                } 
            }
            .cover{
                .w(120);
                .h(110);
                margin-right: 5px;
            }      
        }
        .hot{
            position:absolute;
            top:0;
            right:0;
            .w(75);
        }
    }
    
</style>