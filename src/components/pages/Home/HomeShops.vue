<template>
    <div class="homeShops">
        <div class="shops">
            <div class="left">
                <p>潮流店铺</p>
                <p>FASHION SHOPS</p>
            </div>
            <div class="right" @click='toChao'>
                <a href="#">更多店铺></a>
            </div>
        </div>
        <mt-swipe :auto="0" :show-indicators="false">
            <mt-swipe-item v-for='(item,index) in shopList' :key="index">
              <img v-lazy="item.logourl" class="cover">
              <div class="center">
                  <span class='name'>{{item.businessname}}</span>
                  <span v-if='item.type == 1'>（官方店）</span>
                  <span v-if='item.type == 2'>（买手店）</span>
                  <span v-if='item.type == 3'>（专营店）</span>
              </div>
              <div class="bottom">
                  <div v-for='good in item.products'>
                      <img v-lazy="good.mainpic">
                      <p>
                         <span class='low' v-if='good.specialprice'>￥{{good.specialprice.toFixed(2)}}</span><span v-if='good.specialprice' class='high'>￥{{good.saleprice.toFixed(2)}}</span><span v-if='!good.specialprice' class='low'>￥{{good.saleprice.toFixed(2)}}</span>
                      </p>
                      <p class="name">{{good.brandname}}</p>
                  </div>
              </div>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script> 
    import Vue from 'vue';
    import Axios from 'axios';
    import { Swipe, SwipeItem } from 'mint-ui';
    import 'mint-ui/lib/style.css';
    export default {
        name:'HomeShops',
        data(){
            return{
                shopList:[],
            }
        },
        components: {
            'mt-swipe': Swipe,
            'mt-swipe-item': SwipeItem
        },
        methods:{
            getShopsData(){
                Axios.post('/api/api/base/HomeOther',{"version":"2.6.5","lang":"zh","os":"h5","deviceid":"h5","sign":"57fd100ffa0cffd84b5376b95c221620","param":"%7B%7D","extend":"/api/base/HomeOther"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        this.shopList = res.data.data.fashionshop;
                        console.log(this.shopList);
                    }else{
                        console.log(res.statusText);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            },
            toChao(){
                this.$router.push('/mall/chaodian');
                window.localStorage.setItem('sele','潮店');
            }
        },
        created(){
            this.getShopsData();
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .homeShops{
        .shops{
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
            .w(340);
            .h(356);
            margin: 15px auto;
            border-radius: 16px;
            box-shadow: rgb(204, 204, 204) 0px 4px 10px 1px;
            .cover{
                .w(340);
                .h(178);
            }
            .center{
                .w(340);
                .h(30);
                .fs(12);
                .padding(0,0,0,15);
                display:flex;
                align-items:center;
                .name{
                    .fs(16);
                }
            }
            .bottom{
                .w(340);
                .h(154);
                .fs(12);
                .padding(5,5,5,5);
                box-sizing: border-box;
                display:flex;
                justify-content:space-between;
                div{
                    .w(100);
                    .h(141);
                    text-align: center;
                    img{
                        .w(88);
                        .h(88);
                    }
                    .high{
                        color:#999;
                        text-decoration: line-through;
                    }
                    .low{
                        color:#333;
                    }
                    .name{
                        text-overflow:ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
            }
        }
    }   
</style>