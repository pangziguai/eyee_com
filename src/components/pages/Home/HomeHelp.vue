<template>
    <div class="homeHelp">
        <div class="help">
            <div class="left">
                <p>助力</p>
                <p>DISCOUNTS</p>
            </div>
            <div class="right">
                <a href="#">查看更多></a>
            </div>
        </div>
        <mt-swipe :auto="0" :show-indicators="false">
            <mt-swipe-item v-for='(item,index) in helpList' :key='index'>
                <img v-lazy="item.productimageurl" alt="" />
                <div class="right">
                    <p class="price">
                        <span class='minprice'>￥{{item.minprice.toFixed(2)}}</span>
                        <span class='saleprice'>{{item.saleprice.toFixed(2)}}</span>
                    </p>
                    <p class="name">
                        {{item.productname}}
                    </p>
                    <p class="shop">
                        <span v-if='item.businesstype == 1'>（官方店）</span>
                        <span v-if='item.businesstype == 2'>（买手店）</span>
                        <span v-if='item.businesstype == 3'>（专营店）</span>
                        {{item.businessname}}
                    </p>
                    <div class="number">
                        <p class="num">{{item.successcount}} 人</p>
                        <p>助力成功</p>
                    </div>
                    <button>邀请助力</button>
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
        name:'HomeHelp',
        data(){
            return{
                helpList:[]
            }
        },
        components: {
            'mt-swipe': Swipe,
            'mt-swipe-item': SwipeItem
        },
        methods:{
            getHelpData(){
                Axios.post('/api/capi/cut/open/getCutProductList',{"page":1,"size":10})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        this.helpList = res.data.data.list;
                    }else{
                        console.log(res.statusText);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            },
        },
        created(){
            this.getHelpData();
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .homeHelp{
        .help{
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
            .h(155);
            .w(340);
            box-sizing: border-box;
            .padding(10,10,10,10);
            margin: 25px auto;
            box-shadow: rgb(204, 204, 204) 0px 4px 10px 1px;
            border-radius: 14px;
            img{
                .w(140);
                .h(140);
                vertical-align: top;
            }
            .right{
                .w(160);
                .h(140);
                float:right;
                position:relative;
                .fs(14);
                .price{
                    font-weight: bolder;
                    margin-top: 10px;
                    .minprice{
                        .fs(14);
                        color:#333;
                        margin-right: 10px;
                    }
                    .saleprice{
                        .fs(12);
                        text-decoration: line-through;
                        color:#999;
                    }   
                }
                .name,.shop{
                    .fs(12);
                    color:#999;
                    margin-top:6px;
                    text-overflow:ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .number{
                    .fs(12);
                    color:#999;
                    margin-top: 10px;
                }
                button{
                    background-color: #ffc700;
                    border-radius: 6px;
                    .padding(6,10,6,10);
                    border:1px solid #ffc700;
                    position: absolute;
                    top:99px;
                    left: 76px;
                }
            }
        }
    }   
</style>