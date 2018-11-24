<template>
    <div class="homeCate">
        <div class="cate">
            <div class="left">
                <p>热门分类</p>
                <p>CATEGORIES</p>
            </div>
            <div class="right">
                <a href="#">更多分类></a>
            </div>
        </div>
        <div class="details">
            <div class='brand' v-for='(item,index) in cateList' :key='index'><img v-lazy="item.logourl"></div>
        </div>
        <div class="bottom">
            已经到底啦~
        </div>
    </div>
</template>
<script> 
    import Vue from 'vue';
    import Axios from 'axios';
    export default {
        name:'HomeCate',
        data(){
            return{
                cateList:[]
            }
        },
        methods:{
            getHotData(){
                Axios.post('/api/api/base/HomeOther',{"version":"2.6.5","lang":"zh","os":"h5","deviceid":"h5","sign":"57fd100ffa0cffd84b5376b95c221620","param":"%7B%7D","extend":"/api/base/HomeOther"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        this.cateList = res.data.data.hotcategory;
                        console.log(this.cateList);
                    }else{
                        console.log(res.statusText);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
        },
        created(){
            this.getHotData();
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .homeCate{
        .cate{
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
        .details{
            .w(375);
            .h(245);
            .padding(0,5,0,5);
            box-sizing: border-box;
            .brand{
                .w(111);
                .h(111);
                display:inline-block;
                .padding(0,5,0,5);
                img{
                    width:100%;
                    height:100%;
                    border-radius: 10px;
                }
            }
        }
        .bottom{
            text-align: center;
            .fs(12);
            color:#000;
            .h(150);
            .lh(20);
        }
    }   
</style>