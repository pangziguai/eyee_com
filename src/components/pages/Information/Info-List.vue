<template>
    <div class="info-list"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled='loading'
    infinite-scroll-distance="20"
    >
        <div class="details" v-for='(item,index) in infoList' :key='index'>
            <img v-lazy.conatiner="item.coverurl"> 
            <div class="word">
                <p class="top">{{item.title}}</p>
                <p class='center'>{{item.categoryname}}</p>
                <p class="bottom">{{item.publishtime | getTime}}<span><i class="fa fa-newspaper-o" aria-hidden="true"></i>{{item.readcount}}</span></p>
            </div>
        </div>
    </div>
</template>
<script> 
    import Vue from 'vue';
    import Axios from 'axios';
    import {Toast} from 'mint-ui';
    export default {
        name:'info-List',
        props:['iPath','category','sort'],
        data(){
            return {
                infoList:[],
                loading:false,
                current:0,
                total:10000
            }
        },
        methods:{
            loadMore(){
                this.getInfoData();
            },
            getInfoData(){
                if (this.now == this.total) {
                    Toast({
                        message: '已经到底了',
                        position:'bottom',
                        duration: 1000
                    });
                    return false;
                }
                let toast = Toast({
                    message: '数据加载中',
                    iconClass: "fa fa-spinner fa-spin",
                    duration: -1
                });
                this.loading=true;
                Axios.post('/api/api/article/searchV236',{"version":"2.6.5","lang":"zh","os":"h5","deviceid":"h5","sign":"","param":`{'pageindex':${this.current + 1},'sorttype':${this.sort},'categoryid':'${this.category}'}`,"extend":"/api/article/searchV236"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        toast.close();
                        this.loading = false;
                        this.infoList = this.infoList.concat(res.data.data.article.list);
                        this.total = Math.ceil(res.data.data.sumcount / res.data.data.pagesize);
                        this.current = res.data.data.article.pageindex;
                    }else{
                        console.log(res.statusText);
                    }
                })
                .catch((err)=>{
                    toast.close();
                    this.loading = false;
                    console.log(err);
                })
            }
        },
        watch:{
            iPath:function(newV,oldV){
                this.current = 0;
                this.infoList = [];
                this.getInfoData();
            }
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .info-list{
        .details{
            margin: 20px auto;
            .w(371);
            .h(120);
            .padding(0,13,0,13);
            box-sizing: border-box;
            display:flex;
            justify-content:space-between;
            .word{
                display:flex;
                justify-content:space-between;
                flex-direction:column;
               .top{
                    .fs(14);
                    color:#333;
                    font-weight: bold;
                }
                .center{
                    .fs(12);
                    color:#999;
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
            img{
                .w(150);
                margin-right: 5px;
            }  
        } 
        
    }
</style>
