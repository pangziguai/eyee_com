<template>
    <div class="main">
        <div class="mainTop">
            <div class="shoes" v-for='(item,index) in  mainList1' :key='index'>
                <img v-lazy="item.imgurl">
                <p>{{item.seriesname}}</p>
            </div>
        </div> 
        <div class="mainCenter">
            <div class="good" v-for='(item,index) in mainList2' :key='index'>
                <img v-lazy='item.imgurl'>
            </div>
        </div>
        <div class="mainBottom">
            <div class="box" v-for='(item,index) in mainList3' :key='index'>
                <p class='black'>{{item.title}}</p>
                <p class="grey">{{item.detail}}</p>
            </div>
        </div>
    </div>
   
</template>
<script> 
    import Vue from 'vue';
    import Axios from 'axios';
    export default {
        name:'Shoes-main',
        data(){
            return{
                mainList1:[],
                mainList2:[],
                mainList3:[]
            }
        },
        methods:{
            getMainData(){
                Axios.get('/api/capi/product/qiuxie/open/firstpageshow?os=0')
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        this.mainList1 = res.data.data.serieslist;
                        this.mainList2 = res.data.data.tags;
                        this.mainList3 = res.data.data.others;
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
            this.getMainData();
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .mainTop{
        .w(375);
        display:flex;
        flex-wrap:wrap;
        margin-top: 10px;
        .fs(12);
        .shoes{
            display:flex;
            align-items:center;
            flex-direction:column;
            .w(93);
            .h(90);
            .padding(0,0,0,5);
            box-sizing: border-box;
            color:#333;
            img{
                .w(68);
                .h(60);
            }
        }
    }
    .mainCenter{
        .w(375);
        display:flex;
        margin-top: 15px;
        justify-content:space-between;
        .good{
            .w(85);
            .h(60);
            img{
                width:100%;
                height:100%;
            }
        }
    }
    .mainBottom{
        .w(375);
        box-sizing: border-box;
        margin-top: 25px;
        margin-bottom: 15px;
        .padding(0,10,0,10);
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        .box{
            .w(173);
            .h(60);
            .fs(14);
            .padding(0,0,0,8);
            box-sizing: border-box;
            border-radius: 10px;
            border:1px solid #ccc;
            margin-top: 8px;
            display:flex;
            flex-direction:column;
            justify-content:center;
            .black{
                color:#333;
            }
            .grey{
                color:#777;
                .fs(12);
            }
        }
    }
    .mainBottom .box:nth-child(1){
        background: url('../../../../static/images/4.png');
        background-size: 173px 60px;
    }
    .mainBottom .box:nth-child(2){
        background: url('../../../../static/images/2.png');
        background-size: 173px 60px;
    }
    .mainBottom .box:nth-child(3){
        background: url('../../../../static/images/3.png');
        background-size: 173px 60px;
    }
    .mainBottom .box:nth-child(4){
        background: url('../../../../static/images/1.png');
        background-size: 173px 60px;
    }
</style>