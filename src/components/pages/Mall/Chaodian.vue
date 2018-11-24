<template>
    <div class="chaodian" 
    v-infinite-scroll="loadMore"
        infinite-scroll-disabled='loading'
        infinite-scroll-distance="20" >
        <div class="shopsList" v-for='(item,index) in shopsList' :key='index'>
            <div class="cover">
                <section>
                    <img :src="item.logourl" alt="" />
                    <div class='shops'>
                        <p class='shop'>
                            <span>{{item.businessname}}</span>
                        </p>
                        <p class='yellow'>领券</p>
                    </div>
                </section>
            </div>
            <div class="productsList">
                <div class="product" v-for='good in item.products' @click='toDetail(good.id)'>
                    <img :src="good.mainpic" alt="" />
                    <p class="price">
                        <span class='low' v-if='good.specialprice'>￥{{good.specialprice.toFixed(2)}}</span><span v-if='good.specialprice' class='high'>￥{{good.saleprice.toFixed(2)}}</span><span v-if='!good.specialprice' class='low'>￥{{good.saleprice.toFixed(2)}}</span>
                    </p>
                    <p class="name">
                        {{good.brandname}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script> 
    import Vue from 'vue';
    import Axios from 'axios';
    import {Toast} from 'mint-ui';
    export default {
        name:'Chaodian',
        data(){
            return {
                shopsList:[],
                now:0,
                loading:false,
                total:10000
            }
        },
        props:['currentId'],
        methods:{
            loadMore(){
                this.getList();
            },
            getList(){
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
                Axios.post('/api/api/Business/GetListByCategory',{"version":"2.6.5","lang":"zh","os":"h5","deviceid":"h5","sign":"10579fd3421ffcf4b0885393d463adf5","param":`{'pageindex':${this.now + 1},'pagesize':6,'categoryid':'${this.currentId}'}`,"extend":"/api/Business/GetListByCategory"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        toast.close();
                        this.loading = false;
                        this.shopsList = this.shopsList.concat(res.data.data.list);
                        this.total = Math.ceil(res.data.data.sumcount / res.data.data.pagesize);
                        this.now += 1;
                        console.log(this.shopsList);
                    }else{
                        console.log(res.statusText);
                    }
                })
                .catch((err)=>{
                    toast.close();
                    this.loading = false;
                    console.log(err);
                })
            },
            toDetail(goodId){
                this.$router.push({name: 'detailothers', params:{goodId}});
            }
        },
        watch:{
            currentId:function(){
                this.now = 0;
                this.shopsList = [];
                this.getList();
            }
        },
        created(){
            this.getList();
        },
        destroyed(){
            window.localStorage.setItem('sele','潮店');
        },

    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .shopsList{
        .w(359);
        margin:0 auto 30px;
        box-sizing: border-box;
        border-radius: 10px;
        box-shadow: 0px 0px 7px 0px #e3e3e3;
        .h(500);
        .fs(12);
        .cover{
            .h(125);
            overflow:hidden;
            img{
                .w(320);
                .h(180);
                display: block;
                position: absolute;
                top: 0;
            }
            section{
                position: relative;
                overflow: hidden;
                padding-top: 35%;
                margin-bottom: 10px;
                border-radius: 4px;
                .h(125);
                .shops{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    .h(125);
                    background-color: rgba(0, 0, 0, 0.5);
                    flex-direction: column;
                    display:flex;
                    flex-direction:column;
                    justify-content:center;
                    align-items:center;
                    .shop{
                        .fs(12);
                        .w(119);
                        .h(30);
                        color:#fff;
                        border-bottom: 1px solid #fff;
                        border-top: 1px solid #fff;
                        text-align: center;
                        .lh(30);
                        margin-bottom: 5px;
                    }
                    .yellow{
                        .w(30);
                        .h(18);
                        color:#fff;
                        background-color: #ffc700;
                        text-align: center;
                    }
                }
            }
        }
        .productsList{
            .padding(0,8,0,8);
            display:flex;
            flex-wrap:wrap;
            box-sizing: border-box;
            justify-content:space-between;
            margin-top: 10px;
            .product{
                .w(112);
                .h(164);
                img{
                    .w(111);
                    .h(111);
                    margin:0 auto;
                }
                p{
                    text-align: center;
                }
                .price{
                    font-weight: bolder;
                    .low{
                        color:#333;
                    }
                    .high{
                        color:#999;
                        text-decoration: line-through;
                    }
                }
                .name{
                    text-overflow:ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
        }
    }
</style>