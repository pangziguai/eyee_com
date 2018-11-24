<template>
    <div class="homeHot">
        <div class="hot">
            <div class="left">
                <p>人气推荐</p>
                <p>RECOMMENDATIONS</p>
            </div>
            <div class="right" @click='toMall'>
                <a href="#">商城频道></a>
            </div>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for='(item,index) in hotList' :key='index'>
                    <img v-lazy="item.mainpic" alt="" />
                    <p class='price'>
                        <span class='low' v-if='item.specialprice'>￥{{item.specialprice.toFixed(2)}}</span>
                        <span class='low' v-if='!item.specialprice'>￥{{item.saleprice.toFixed(2)}}</span>
                        <span class='high' v-if='item.specialprice'>￥{{item.saleprice.toFixed(2)}}</span>
                    </p>
                    <p class="brand">
                        {{item.brandname}}
                    </p>
                    <p class="bus">
                        <span v-if='item.type == 1'>（官方店）</span>
                        <span v-if='item.type == 2'>（买手店）</span>
                        <span v-if='item.type == 3'>（专营店）</span>
                        <span class='name'>{{item.businessname}}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script> 
    import Vue from 'vue';
    import Axios from 'axios';
    import Swiper from 'swiper';
    export default {
        name:'HomeHot',
        data(){
            return{
                hotList:[]
            }
        },
        methods:{
            getHotData(){
                Axios.post('/api/api/base/HomeOther',{"version":"2.6.5","lang":"zh","os":"h5","deviceid":"h5","sign":"57fd100ffa0cffd84b5376b95c221620","param":"%7B%7D","extend":"/api/base/HomeOther"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        this.hotList = res.data.data.recommendproduct;
                        Vue.nextTick(()=>{
                            this.initSwiper();
                        })
                        console.log(this.hotList);
                    }else{
                        console.log(res.statusText);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            },
            initSwiper(){
                var swiper = new Swiper('.swiper-container', {
                    freeMode : true,
                    freeModeMomentum:true,
                    spaceBetween:0,
                    width:140
                });
            },
            toMall(){
                this.$router.push('/mall');
                window.localStorage.setItem('sele','分类');
            }
        },
        created(){
            this.getHotData();
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../../node_modules/swiper/dist/css/swiper.min.css';
    @import '../../../styles/main.less';
    .homeHot{
        .hot{
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
        .swiper-slide{
            // .w(140) !important;
            .h(196);
            .padding(10,0,10,10);
            margin-right: 5px;
            box-sizing: border-box;
            img{
                .w(130);
                .h(130);
            }
            .price{
                .fs(12);
                font-weight: bolder;
                .high{
                    color:#999;
                    text-decoration: line-through;
                }
                .low{
                    color:#333;
                }
            }
            .brand{
                .fs(12);
            }
            .bus{
                span{
                    .fs(12);
                    color:#333;
                }
                .name{
                    .fs(14);
                    color:#999;
                }
            }
        }
    }   
</style>