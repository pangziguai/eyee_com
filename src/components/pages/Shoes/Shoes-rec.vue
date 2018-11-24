<template>
    <div class="rec">
        <h2>-为你推荐-</h2>
        <div class="shoesBox"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled='loading'
        infinite-scroll-distance="20"
        >
            <div class="shoe" v-for='(item,index) in shoesList' :key='index'>
                <div class="cover">
                    <img v-lazy="item.imageurl" alt="" />
                </div>
                <p class="name">{{item.productname}}</p>
                <p class="price">{{item.price.toFixed(2)}}</p>
            </div>
        </div>
    </div>
</template>
<script> 
    import Vue from 'vue';
    import Axios from 'axios';
    import {Toast} from 'mint-ui';
    export default {
        name:'Shoes-rec',
        data(){
            return{
                shoesList:[],
                current:0,
                size:20,
                total:10000 ,
                loading:false
            }
        },
        methods:{
            loadMore(){
                this.getRecData();
            },
            getRecData(){
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
                Axios.get(`/api/capi/product/qiuxie/open/recommend?page=${this.current + 1}&size=${this.size}`)
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        toast.close();
                        this.loading = false;
                        this.current = this.current + 1;
                        this.shoesList = this.shoesList.concat(res.data.data.list);
                        this.total = Math.ceil(res.data.data.sumcount / res.data.data.pagesize);
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
        created(){
            this.getRecData();
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .rec{
        h2{
            .fs(14);
            color:#333;
            text-align: center;
            margin-bottom: 25px;
        }
        .shoesBox{
            .w(375);
            display:flex;
            .padding(0,8,0,8);
            box-sizing: border-box;
            flex-wrap:wrap;
            justify-content:space-between;
            font-weight: bolder;
            text-align: center;
            .shoe{
                .w(167);
                .h(158);
                .fs(12);
                box-sizing: border-box;
                .cover{
                    .w(167);
                    .h(110);
                    display:flex;
                    justify-content:center;
                    img{
                        .w(110);
                        .h(110); 
                    }
                }
                .name{
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    color:#333;
                }
                .price{
                    color:#999;
                    margin-top: 5px;
                }
            }
        }
    }
</style>