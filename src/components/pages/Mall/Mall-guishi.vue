<template>
    <div class="mall-guishi">
        <div class="onact">
            <h2>-正在进行-</h2>
            <div class="act" v-for='(item,index) in onList' :key='index'>
                <img :src="item.logourl" alt="" />
                <p>结束时间：<span>{{item.endtime | getDate}}</span></p>
            </div>
        </div>
        <div class="offList">
            <h2>-即将开始-</h2>
            <div class="act" v-for='(item,index) in offList' :key='index'>
                <img :src="item.logourl" alt="" />
                <p>开始时间：<span>{{item.begintime | getDate}}</span></p>
            </div>
            <h3>已经到底了~~</h3>
        </div>
    </div>
</template>
<script> 
    import Vue from 'vue';
    import Axios from 'axios';
    export default {
        name:'Mall-guishi',
        data(){
            return {
                onList:[],
                offList:[]
            }
        },
        methods:{
            getActData(){
                Axios.post('/api/api/Marketing/GetSpecialSaleV238',{"version":"2.6.5","lang":"zh","os":"h5","deviceid":"h5","sign":"57fd100ffa0cffd84b5376b95c221620","param":"%7B%7D","extend":"/api/Marketing/GetSpecialSaleV238"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        for(let i = 0;i < res.data.data.list.length;i++){
                            if(res.data.data.list[i].isactive){
                                this.onList.push(res.data.data.list[i]);
                            }else{
                                this.offList.push(res.data.data.list[i]);
                            }
                        }
                        console.log(this.onList,this.offList);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
        },
        created(){
            this.getActData();
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .mall-guishi{
        margin-top: 115px;
        h2{
            .fs(14);
            text-align: center;
        }
        h3{
            .fs(14);
            color:#777;
            text-align: center;
            .h(100);
        }
    }
    .act{
        .w(355);
        .h(142);
        margin:15px auto 15px;
        position:relative;
        img{
            width:100%;
            height:100%;
        }
        p{
            color:#fff;
            position:absolute;
            top:70%;
            left:25%;
            .fs(14);
            span{
               font-weight: bold;
            }
        }
    }
</style>