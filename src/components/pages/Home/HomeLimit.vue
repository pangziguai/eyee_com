<template>
    <div class="homeLimit">
        <div class="limit">
            <div class="left">
                <p>限量发售</p>
                <p>LIMITED SALE</p>
            </div>
            <div class="right" @click='toLimit'>
                <a href="#">查看更多></a>
            </div>
        </div>
        <mt-swipe :auto="0" :show-indicators="false">
            <mt-swipe-item v-for='(item,index) in limitList' :key="index">
               <img v-lazy="item.picurl">
               <div class="bottom">
                   <div class="endTime">
                        <p class="end">结束时间：</p>
                        <p class="time">{{item.endtime | getDate}}</p>
                   </div>
                   <div class="price">
                       <p class="sale">￥{{item.saleprice.toFixed(2)}}</p>
                       <p class="spe">￥{{item.specialprice.toFixed(2)}}</p>                  
                   </div>
               </div>
            </mt-swipe-item>
        </mt-swipe>
        <div class="sup">
            <img src="https://files.eyee.com/Shop/system/main/17d7b4b9477b4771bbbf036add4c7790.jpg" alt="" />
        </div>
    </div>
</template>
<script> 
    import Vue from 'vue';
    import Axios from 'axios';
    import { Swipe, SwipeItem } from 'mint-ui';
    import 'mint-ui/lib/style.css';
    export default {
        name:'HomeLimit',
        data(){
            return{
                limitList:[]
            }
        },
        components: {
            'mt-swipe': Swipe,
            'mt-swipe-item': SwipeItem
        },
        methods:{
            getLimitData(){
                Axios.post('/api/api/Marketing/LimitSales',{"version":"2.6.5","lang":"zh","os":"h5","deviceid":"h5","sign":"57fd100ffa0cffd84b5376b95c221620","param":"%7B%7D","extend":"/api/Marketing/LimitSales"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        this.limitList = res.data.data;
                    }else{
                        console.log(res.statusText);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            },
            toLimit(){
                this.$router.push('/mall/xianliang');
                window.localStorage.setItem('sele','限量');
            }
        },
        created(){
            this.getLimitData();
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .homeLimit{
        .limit{
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
        .mint-swipe{
            .w(313);
            .h(216);
            margin:15px auto;
            border-radius: 16px;
            img{
                .w(313);
                .h(160);
            }
            .bottom{
                .w(313);
                .h(57);
                .padding(0,8,0,8);
                box-sizing: border-box;
                display:flex;
                justify-content:space-between;
                .end{
                    color:#999;
                    .fs(12);
                }
                .time{
                    color:#999;
                    .fs(14);
                    font-weight: bolder;
                    margin-top: 5px;
                }
                .price{
                    .sale{
                        color:#999;
                        .fs(12);
                        font-weight: bolder;
                        margin-top: 5px;
                        text-decoration: line-through;
                    }
                    .spe{
                        .fs(18);
                        color:#333;
                        font-weight: bolder;
                    }
                }
                
            }
        }
        .sup{
            .w(355);
            .h(120);
            margin:20px 10px 0;
            img{
                width:100%;
                height:100%;
                border-radius: 10px;
            }
        }
    }   
</style>