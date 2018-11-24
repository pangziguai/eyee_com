<template>
    <div class="mall-xianliang">
        <div class="inList">
            <div class="limit" v-for='(item,index) in inList' :key="index">
                <img :src="item.picurl" alt="" />
                <p class="name">{{item.title}}</p>
                <p class="price"><span class='low' v-if='item.specialprice'>￥{{item.specialprice.toFixed(2)}}</span><span v-if='item.specialprice' class='high'>￥{{item.saleprice.toFixed(2)}}</span><span v-if='!item.specialprice' class='low'>￥{{item.saleprice.toFixed(2)}}</span></p>
                <p class="shop">
                    <span class='shopname'>{{item.businessname}}</span>
                    <span v-if='item.businesstype == 1'>（官方店）</span>
                    <span v-if='item.businesstype == 2'>（买手店）</span>
                    <span v-if='item.businesstype == 3'>（专营店）</span>
                </p>
                <p class="time">结束时间：<span>{{item.endtime | getDate}}</span></p>
            </div>
        </div>
        <div class="outList"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled='loading'
        infinite-scroll-distance="20">
            <div class="limit" v-for='(item,index) in outList' :key="index">
                <img :src="item.picurl" alt="" />
                <p class="name">{{item.title}}</p>
                <p class="shop">
                    <span class='shopname'>{{item.businessname}}</span>
                    <span v-if='item.businesstype == 1'>（官方店）</span>
                    <span v-if='item.businesstype == 2'>（买手店）</span>
                    <span v-if='item.businesstype == 3'>（专营店）</span>
                </p>
                <p class="price">sold out</p>
            </div>
        </div>
    </div>
</template>
<script> 
    import Vue from 'vue';
    import Axios from 'axios';
    import {Toast} from 'mint-ui';
    export default {
        name:'Mall-xianliang',
        data(){
            return {
                inList:[],
                outList:[],
                now:0,
                loading:false,
                total:10000
            }
        },
        methods:{
            loadMore(){
                this.getEndData();
            },
            getLimitData(){
                Axios.post('/api/api/Marketing/LimitSales',{"version":"2.6.5","lang":"zh","os":"h5","deviceid":"h5","sign":"57fd100ffa0cffd84b5376b95c221620","param":"%7B%7D","extend":"/api/Marketing/LimitSales"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        this.inList = res.data.data;
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            },
            getEndData(){
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
                this.loading = true;
                Axios.post('/api/api/Marketing/LimitSaleEndedPage',{"version":"2.6.5","lang":"zh","os":"h5","deviceid":"h5","sign":"17b58bf42695f18941751822cda4da10","param":`{ 'pageindex':${this.now + 1}}`,"extend":"/api/Marketing/LimitSaleEndedPage"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        toast.close();
                        this.loading = false;
                        this.outList = this.outList.concat(res.data.data.list);
                        this.total = Math.ceil(res.data.data.sumcount / res.data.data.pagesize);
                        this.now += 1;
                    }
                })
                .catch((err)=>{
                    toast.close();
                    this.loading = false;
                    console.log(err);
                })
            }
        },
        created(){
            this.getLimitData();
            this.getEndData();
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .mall-xianliang{
        margin-top: 95px;
        .limit{
            .w(355);
            .h(300);
            margin:15px auto 15px;
            .fs(14);
            color:#333;
            .padding(5,5,5,5);
            box-sizing: border-box;
            border-radius: 10px;
            box-shadow: 0 0 5px 0 #ccc;
            img{
                .w(345);
                border-radius: 10px;
            }
            p{
                text-align: center;
            }
            .name{
                margin-top: 5px;
            }
            .price{
                color:#af3c03;
                font-weight: bold;
                .high{
                    color:#999;
                    text-decoration: line-through;
                }
            }
            .shop{
                .fs(12);
                .shopname{
                    .fs(14);
                }
            }
            .time{
                margin-top: 10px;
                span{
                    font-weight: bolder;
                }
            }
        }
        .outList .limit .price{
            .fs(18);
            color:#999;
            font-weight: bolder;
            margin-top: 10px;
        }
    }
</style>