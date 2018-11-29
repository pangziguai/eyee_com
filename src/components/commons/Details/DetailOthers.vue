<template>
    <div class="detailothers">
        <div class="back" @click='back'>
            <i class="fa fa-angle-left" aria-hidden="true"></i>
        </div>
        <div class="cart" @click='toCar'>
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        </div>
        <mt-swipe :auto="0" :continuous='false'>
            <mt-swipe-item v-for='(item,index) in mainpic' :key='index'>
                <img :src="item">
            </mt-swipe-item>
        </mt-swipe>
        <div class="namebox">
            <div class="price">
                <span v-if='details.specialprice' class='high'>￥{{details.saleprice.toFixed(2)}}</span>
                <span class='low' v-if='details.specialprice'>￥{{details.specialprice.toFixed(2)}}</span>
                <span v-if='!details.specialprice' class='low'>￥{{details.saleprice.toFixed(2)}}</span>
            </div>
            <div class="goodname">
                {{details.name}}
            </div>
        </div>
        <div class="shopbox">
            <img :src="details.brandlogo" >
            <p class="name">
                {{details.brandname}}
            </p>
            <p class="demo">
                {{details.brandmemo}}
            </p>
        </div>
        <div class="detail">
            <p class="num">商品编号：<span>{{details.prokey}}</span></p>
            <p class="made">材质：<span>{{details.texture}}</span></p>
            <p class="color">颜色：<span>{{details.colorattribute}}</span></p>
        </div>
        <div class="shop">
            <img :src="details.businessheadportraiturl" alt="" />
            <div class="shopname">
                <span class='name'>{{details.businessname}}</span>
                <span v-if='details.businesstype == 1'>（官方店）</span>
                <span v-if='details.businesstype == 2'>（买手店）</span>
                <span v-if='details.businesstype == 3'>（专营店）</span>
            </div>
            <div class="to">
                进店逛逛
            </div>
        </div>
        <div class="tocar">
            <div class="car" @click='toCart'>加入购物车</div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import Axios from 'axios';
    import { Swipe, SwipeItem } from 'mint-ui';
    import {Toast} from 'mint-ui';
    import 'mint-ui/lib/style.css';
    export default {
        name:'Detailothers',
        data(){
            return{
                goodId:'',
                details:[],
                mainpic:[]
            }
        },
        components: {
            'mt-swipe': Swipe,
            'mt-swipe-item': SwipeItem
        },
        methods:{
            getDetails(){
                this.goodId = this.$route.params.goodId;
                let toast = Toast({
                    message: '数据加载中',
                    iconClass: "fa fa-spinner fa-spin",
                    duration: -1
                });
                Axios.post('/api/api/Product/DetailV236',{"version":"2.6.5","lang":"zh","os":"h5","deviceid":"h5","sign":"c816569316a46fa5962fc89a6cf9da3a","param":`{ 'productId':'${this.goodId}'}`,"extend":"/api/Product/DetailV236"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        toast.close();
                        this.loading = false;
                        this.details = res.data.data.info;
                        this.mainpic = this.details.mainpic.split('|');
                        this.details.num = 1;
                    }else{
                        console.log(res).statusText;
                    }
                })
                .catch((err)=>{
                    toast.close();
                    this.loading = false;
                    console.log(err);
                })
            },
            back(){
                this.$router.go(-1);
            },
            toCart(){
                let toast = Toast({
                    message: '成功加入购物车！',
                    iconClass: "fa fa-check-circle",
                    duration: 1500
                });
                let currentId = this.details.id;
                let pushItem = this.details;
                let goodsList = localStorage.getItem('goodsList');
                if(goodsList == null){
                    let newList = [];
                    newList.push(pushItem);
                    window.localStorage.setItem('goodsList',JSON.stringify(newList));
                }else if(goodsList != null){
                    let newList = JSON.parse(goodsList);
                    let ids = newList.map(function(item){
                        return item.id;
                    });
                    if (ids.indexOf(currentId) != -1){
                        newList.forEach(function(item){
                            if(item.id == currentId){
                                item.num = item.num + 1;
                                window.localStorage.setItem('goodsList',JSON.stringify(newList));
                            }
                        })
                    }else{
                        newList.push(pushItem);
                        window.localStorage.setItem('goodsList',JSON.stringify(newList));
                    }
                    
                }
            },
            toCar(){
                this.$router.push('/shoppingCart');
            }
        },
        mounted(){
            this.getDetails();
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .detailothers{
        .mint-swipe{
            .w(375);
            .h(375);
            img{
                width:100%;
                height:100%;
            }
        }
        .namebox{
            .w(375);
            .h(126);
            .fs(16);
            color:#333;
            margin-top: 8px;
            border-bottom: 3px solid #eee;
            .price{
                font-weight: bolder;
                .w(149);
                .h(42);
                background-color: #eee;
                .padding(0,0,0,15);
                box-sizing: border-box;
                display:flex;
                align-items:center;
                .high{
                    color:#999;
                    .fs(12);
                    text-decoration: line-through;
                }
            }
            .goodname{
                .w(355);
                .h(40);
                margin:15px 0 15px 20px;
            }
        }
        .shopbox{
            .w(375);
            .h(235);
            .padding(17,0,17,0);
            box-sizing: border-box;
            color:#333;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            align-items:center;
            border-bottom: 3px solid #eee;
            img{
                border:1px solid #eee;
                border-radius: 50%;
                .w(50);
                .h(50);
            }
            .name{
                text-align: center;
                .fs(14);
            }
            .demo{
                .w(255);
                margin:0 auto;
                .fs(12);
            }
        }
        .detail{
            .w(375);
            .h(170);
            .fs(14);
            color:#333;
            .padding(17,30,17,30);
            .lh(26);
            box-sizing: border-box;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            align-items:center;
            border-bottom: 3px solid #eee;
            span{
                color:#999;
            }
        }
        .shop{
            .w(375);
            .h(75);
            .padding(15,20,15,20);
            box-sizing: border-box;
            display:flex;
            margin-bottom: 60px;
            border-bottom: 1px solid #eee;
            color:#333;
            .fs(12);
            
            img{
                .w(40);
                .h(40);
            }
            .name{
                .fs(14);
            }
            .shopname{
                .w(220);
                margin-left: 10px;
                .lh(40);
            }
            .to{
                border:1px solid #ffc700;
                color:#ffc700;
                border-radius: 10px;
                .w(62);
                .h(24);
                margin-top: 9px;
                text-align: center;
                .lh(24);
            }
        }
        .back{
            .w(30);
            .h(30);
            display:flex;
            justify-content:center;
            align-items:center;
            color:#fff;
            .fs(26);
            position:fixed;
            top:8px;
            left: 8px;
            z-index: 999;
            border-radius: 50%;
            background-color: #333;
            opacity: .6;
        }
        .cart{
            color:#fff;
            position:fixed;
            top:8px;
            right: 8px;
            z-index: 999;
            .fs(26);
            color:#eee;
            opacity:.6;
        }
        .tocar{
            .w(375);
            .h(50);
            position:fixed;
            background-color: #fff;
            bottom: 0;
            left: 0;
            z-index:9999;
            border-top: 1px solid #eee;
            .car{
                .w(120);
                background-color: #333;
                color:#fff;
                .h(50);
                float: right;
                .lh(50);
                text-align: center;
                .fs(16);
            }
        }
    }
</style>