<template>
    <div class="zhekou" v-infinite-scroll="loadMore"
        infinite-scroll-disabled='loading'
        infinite-scroll-distance="20" >
        <div class="good" v-for='(item,index) in  goodsList' :key ='index' @click='toDetail(item.id)'>
            <img :src="item.mainpic" alt="" />
            <p class="price">
                <span class='low' v-if='item.specialprice'>￥{{item.specialprice.toFixed(2)}}</span><span v-if='item.specialprice' class='high'>￥{{item.saleprice.toFixed(2)}}</span><span v-if='!item.specialprice' class='low'>￥{{item.saleprice.toFixed(2)}}</span>
            </p>
            <p class="brand">
                {{item.brandname}}
            </p>
            <p class="goodname">
                {{item.name}}
            </p>
            <p class="shop">
              <span v-if='item.businesstype == 1'>（官方店）</span>
              <span v-if='item.businesstype == 2'>（买手店）</span>
              <span v-if='item.businesstype == 3'>（专营店）</span>
              <span class='name'>{{item.businessname}}</span>
            </p>
        </div>
    </div>
</template>
<script> 
    import Vue from 'vue';
    import Axios from 'axios';
    import {Toast} from 'mint-ui';
    export default {
        name:'zhekou',
        props:['sele','orderBy','sortBy'],
        data(){
            return {
                goodsList:[],
                loading:false,
                current:0,
                now:0,
                total:1000
            }
        },
        methods:{
            loadMore(){
                this.getGoodsData();
            },
            getGoodsData(){
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
                Axios.post('/api/api/Product/DiscountSearch',{"version":"2.6.5","lang":"zh","os":"h5","deviceid":"h5","sign":"909f4c6c620a025ea2ddb6bb4b3aa15b","param":`{ 'pageindex':${this.now + 1},'sorttype':${this.sortBy},'ordertype':${this.orderBy},'issearchall':1,'brandid':""}`,"extend":"/api/Product/DiscountSearch"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        toast.close();
                        this.loading = false;
                        this.goodsList = this.goodsList.concat(res.data.data.list);
                        this.total = Math.ceil(res.data.data.sumcount / res.data.data.pagesize);
                        this.now += 1;
                        console.log(this.goodsList);
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
            sortBy:function(){
                this.current = 0;
                this.goodsList = [];
                this.getGoodsData();
            }
        },
        destroyed(){
            window.localStorage.setItem('sele','折扣');
        },
        created(){
            this.getGoodsData();
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .zhekou{
        .w(375);
        margin-top: 135px;
        display:flex;
        justify-content:space-between;
        .padding(15,10,0,10);
        .fs(12);
        flex-wrap:wrap;
        box-sizing: border-box;
        .good{
            .w(168);
            .h(240);
            img{
                .w(160);
                .h(160);
            }
            .price{
                font-weight: bold;
                .low{
                    color:#333;
                }
                .high{
                    color:#999;
                    text-decoration: line-through;
                }
            }
            .goodname{
                color:#999;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
            }
            .shop{
                color:#333;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
                .name{
                    color:#999;
                }
            }
        }
    }
</style>
