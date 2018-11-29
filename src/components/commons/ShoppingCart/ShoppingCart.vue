<template>
    <div class="shoppingCart">
        <div class="top">
            <i class="fa fa-angle-left" aria-hidden="true" @click='back'></i>
            <span>购物车</span>
            <i class="fa fa-headphones" aria-hidden="true"></i>
        </div>
        <div class="main">
            <div class="nothing" v-if='shopList == []'>购物车空空如也</div>
            <div class="something" v-if='shopList != []'>
                <div class="goods" v-for='(item,index) in shopList' :key='index'>
                    <div class="goodsTop">
                        <input type="checkbox" /><span class="shopname">{{item.businessname}} ></span><div class="gai">修改</div>
                    </div>
                    <div class="goodsMain">
                        <input type="checkbox" />
                        <img :src="item.mainpic.split('|')[0]" alt="" />
                        <div class="right">
                            <p class="name">{{item.name}}</p>
                            <p class="price">单价：{{item.specialprice.toFixed(2) || item.saleprice.toFixed(2)}} &times; {{item.num}}</p>
                        </div>
                    </div>
                    <div class="goodsBottom">
                        <button>开始结算</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    export default {
        name:'ShoppingCart',
        data(){
            return{
                shopList:JSON.parse(localStorage.getItem('goodsList')) || [],
            }
        },
        methods:{
            back(){
                this.$router.go(-1);
            }
        },
        mounted(){
            console.log(this.shopList);
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .shoppingCart{
        margin-bottom: 75px;
    }
    .top{
        .w(375);
        .h(48);
        .fs(16);
        display:flex;
        justify-content:space-between;
        align-items:center;
        .padding(0,15,0,15);
        box-sizing: border-box;
        i{
            .fs(24);
            color:#999;
        }
        color:#333;
    }
    .goods{
        .w(355);
        margin:10px auto 15px;
        border:1px solid #eee;
        border-radius: 15px;
        color:#333;
        .fs(14);
        .goodsTop{
            .w(355);
            .h(51);
            display:flex;
            justify-content:space-between;
            align-items:center;
            border-bottom: 1px solid #eee;
            .padding(0,15,0,15);
            box-sizing: border-box;
            .gai{
                .padding(0,0,0,15);
                border-left: 1px solid #ccc;
                color: rgb(175, 60, 3);
                .fs(12);
            }
        }
        .goodsMain{
            .w(355);
            .h(110);
            img{
                .w(77);
                .h(77);
            }
            .right{
                .w(210);
            }
            display:flex;
            justify-content:space-between;
            align-items:center;
            .padding(0,15,0,15);
            box-sizing: border-box;
            border-bottom: 1px solid #eee;
        }
        .goodsBottom{
            .w(355);
            .h(50);
            button{
                background: #333;
                color: #fff;
                border-radius: 4px;
                padding: 8px 15px;
                border: none;
                float:right;
                .w(102);
                .h(41);
                .fs(16);
                text-align: center;
                .lh(32);
                margin-top: 4px;
            }
        }
    }
</style>