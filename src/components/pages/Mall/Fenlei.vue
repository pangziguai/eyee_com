<template>
    <div class="fenlei">
         <div class="supSwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for='(item,index) in selData' :key='index' :style="{ 'background-image': 'url(' + item.logourl + ')','background-repeat':'no-repeat','background-size':'cover' }">
                </div>
            </div>
        </div>
        <div class="list"
         v-infinite-scroll="loadMore"
        infinite-scroll-disabled='loading'
        infinite-scroll-distance="20" 
        >
            <div class="good" v-for='(item,index) in goodsList' :key='index' @click='toDetail(item.id)'>
                <img :src="item.mainpic" alt="" />
                <p class="price">
                    <span class='low' v-if='item.specialprice'>￥{{item.specialprice.toFixed(2)}}</span><span v-if='item.specialprice' class='high'>￥{{item.saleprice.toFixed(2)}}</span><span v-if='!item.specialprice' class='low'>￥{{item.saleprice.toFixed(2)}}</span>
                </p>
                <p class="brand">
                    {{item.brand}}
                </p>
                <p class="shop">
                  <span v-if='item.businesstype == 1'>（官方店）</span>
                  <span v-if='item.businesstype == 2'>（买手店）</span>
                  <span v-if='item.businesstype == 3'>（专营店）</span>
                  <span class='name'>{{item.businessname}}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script> 
    import Vue from 'vue';
    import Swiper from 'swiper';
    import Axios from 'axios';
    import {Toast} from 'mint-ui';
    export default {
        name:'Fenlei',
        data(){
            return {
                Data:[],
                selData:[],
                goodsList:[],
                shirtMan:[],
                shoesMan:[],
                bag:[],
                others:[],
                shirtFe:[],
                shoesFe:[],
                sports:[],
                eighteen:[],
                loading:false,
                now:0,
                total:10000
            }
        },
        props:['current','currentId'],
        methods:{
            loadMore(){
                this.getList();
            },
            getData(){
                Axios.post('/api/api/Base/CategoryAll',{"version":"2.6.5","lang":"zh","os":"h5","deviceid":"h5","sign":"57fd100ffa0cffd84b5376b95c221620","param":"%7B%7D","extend":"/api/Base/CategoryAll"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        for(let i = 0;i < res.data.data.length;i++){
                            if(!res.data.data[i].haschildren){
                                if(res.data.data[i].parentid == '730645d9f6444d7db732bf153f4d8b37'){
                                    this.shirtMan.push(res.data.data[i]);
                                }else if(res.data.data[i].parentid == '3f95dbadd82743138ca7c84a986d58d6'){
                                    this.shoesMan.push(res.data.data[i]);
                                }else if(res.data.data[i].parentid == 'c06f0f1475c54069b06be76d2cb2de12'){
                                    this.bag.push(res.data.data[i]);
                                }else if(res.data.data[i].parentid == '3ade3929d6294007a34d5d4b22384b91'){
                                    this.others.push(res.data.data[i]);
                                }else if(res.data.data[i].parentid == 'f7e8118eb8f64dcbabd4802a51f27557'){
                                    this.shirtFe.push(res.data.data[i]);
                                }else if(res.data.data[i].parentid == '79f787b3cb4c4362af57e3bc23cec965'){
                                    this.shoesFe.push(res.data.data[i]);
                                }else if(res.data.data[i].parentid == '888286e02de04ee9964d3f374ee096f3'){
                                    this.eighteen.push(res.data.data[i]);
                                }else if(res.data.data[i].parentid == '7f3cdb69bd394cdba9f6a9151d8b7dd6'){
                                    this.sports.push(res.data.data[i]);
                                }
                            }
                        }
                        this.Data.push(this.shirtMan,this.shoesMan,this.bag,this.others,this.shirtFe,this.shoesFe,this.sports,this.eighteen);
                        this.selData = this.Data[0];
                        Vue.nextTick(()=>{
                            this.initSwiper();
                        })
                    }else{
                        console.log(res.statusText);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                });
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
                Axios.post('/api/api/Product/CategorySearch',{"version":"2.6.5","lang":"zh","os":"h5","deviceid":"h5","sign":"","param":`{'issearchall':1,'pageindex':${this.now + 1},'pagesize':18,'categoryid':'${this.currentId}'}`,"extend":"/api/Product/CategorySearch"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        toast.close();
                        this.loading = false;
                        this.goodsList = this.goodsList.concat(res.data.data.list);
                        this.total = Math.ceil(res.data.data.sumcount / res.data.data.pagesize);
                        this.now += 1;
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
            initSwiper(){
                var swiper3 = new Swiper('.supSwiper', {
                    freeMode : true,
                    width:100
                });
            },
            toDetail(goodId){
                this.$router.push({name: 'detailothers', params:{goodId}});
            }
        },
        watch:{
            current:function(){
                this.selData = this.Data[this.current];
                this.initSwiper();
            },
            currentId:function(){
                this.now = 0;
                this.goodsList = [];
                this.getList();
            }
        },
        mounted(){
            this.getData();
            this.getList();
        },
        destroyed(){
            window.localStorage.setItem('sele','分类');
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    @import '../../../../node_modules/swiper/dist/css/swiper.min.css';
    .supSwiper{
        overflow:hidden;
        margin-left: 15px;
        margin-top: 15px;
        .swiper-slide{
            .w(107);
            .h(35);
            background-position: center center;
            margin-right: 15px;
        }
    }
    .list{
        .w(375);
        display:flex;
        justify-content:space-between;
        .padding(15,10,0,10);
        .fs(12);
        flex-wrap:wrap;
        box-sizing: border-box;
        .good{
            .w(117);
            .h(166);
            img{
                .w(113);
                .h(113);
                margin:0 auto;
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
            .shop{
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
            }
        }
    }
</style>