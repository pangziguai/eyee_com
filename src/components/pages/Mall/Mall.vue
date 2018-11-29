<template>
    <div class="mall">
        <div class="mall-fix">
            <div class="mall-top">
                <div class="top"> 
                    <div class="left">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <input type="text" placeholder='Search'>
                    </div>
                    <div class="right" @click='toCar'>
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
            <ul class="mall-nav">
                <li v-for='(item,index) in navList' :key='index' :class='selected == item.title? "sel":""' @click='change(item.title,item.path)'>
                    {{item.title}}
                </li>
            </ul>
        </div>
        
        <router-view></router-view>
    </div>
</template>
<script> 
    export default {
        name:'Mall',
        components:{
            
        },
        data(){
            return {
                navList:[
                    {title:'分类',path:''},
                    {title:'品牌',path:'pinpai'},
                    {title:'潮店',path:'chaodian'},
                    {title:'鬼市',path:'guishi'},
                    {title:'限量',path:'xianliang'},
                    {title:'折扣',path:'zhekou'}
                ],
                selected:localStorage.getItem('sele') || '分类'
            }
        },
        methods:{
            change(item,str){
                this.selected = item;
                window.localStorage.setItem('sele',this.selected);
                console.log(this.selected);
                this.$router.replace('/mall/'+str);
            },
            toCar(){
                this.$router.push('/shoppingCart');
            }
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .mall-top{
        .top{
            display:flex;
            .right{
                display:flex;
                flex-direction:column;
                justify-content:center;
                text-align: center;
                .w(56);
                .h(48);
                color:#666;
                i{
                    .fs(24);
                }
            }
            .left{
                .w(290);
                .h(43);
                margin:5px auto;
                background-color: #f2f2f2;
                display:flex;
                align-items:center;
                .padding(0,0,0,10);
                input{
                    border:none;
                    background-color: #f2f2f2;
                    outline: none;
                    margin-left:10px;
                    .h(30);
                    .w(200);
                }
                i{
                    color:#ccc;
                    .fs(22);
                }
            }
        }
    }
    .mall-nav{
        padding-left: 15px;
        overflow: hidden;
        li{
            float: left;
            .fs(14);
            color:#333;
            text-align: center;
            margin-right: 15px;
            .h(40);
            .w(28);
            .lh(40);
        }
        .sel{
            border-bottom: 2px solid #333;
        }
    }
    .mall-fix{
        .w(375);
        position:fixed;
        top:0;
        left:0;
        z-index: 999;
        background-color: #fff;
    }
</style>