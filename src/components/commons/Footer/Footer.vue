<template>
    <footer>
        <ul>
            <li v-for='(item,index) in footerList' :key='index' @click='change(index,item.path)'>
                <img :src="item.url">
                <!-- <img :src="item.acturl" v-if="item.status"> -->
                <span>{{item.title}}</span>
            </li>
        </ul>
    </footer>
</template>
<script> 
    export default {
        name:'Footer',
        data(){
            return{
                footerList:[
                    {title:'首页',url:'//files.eyee.com/mcdn/static/img/menu/m_home.png',status:1,acturl:'//files.eyee.com/mcdn/static/img/menu/m_home1.png',path:'/home'},
                    {title:'资讯',url:'//files.eyee.com/mcdn/static/img/menu/m_news.png',status:0,acturl:'//files.eyee.com/mcdn/static/img/menu/m_news1.png',path:'/info'},
                    {title:'球鞋',url:'//files.eyee.com/mcdn/static/img/menu/m_sneaker.png',status:0,acturl:'//files.eyee.com/mcdn/static/img/menu/m_sneaker1.png',path:'/shoes'},
                    {title:'购物',url:'//files.eyee.com/mcdn/static/img/menu/m_shop.png',status:0,acturl:'//files.eyee.com/mcdn/static/img/menu/m_shop1.png',path:'/mall'},
                    {title:'我的',url:'//files.eyee.com/mcdn/static/img/menu/m_user.png',status:0,acturl:'//files.eyee.com/mcdn/static/img/menu/m_user1.png',path:'/mine'},
                ]
            }
        },
        methods:{
            change(num,path){
                for(let i = 0;i < this.footerList.length;i++){
                    this.footerList[i].status = 0;
                }
                this.footerList[num].status = 1;
                this.$router.push(path);
            }
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    footer{
        width:100%;
        .h(50);
        position: fixed;
        bottom:0;
        left:0;
        z-index: 999;
        background-color: #fff;
        ul{
            box-shadow: 0 -2px 4px 0 rgba(238, 238, 238, 0.5);
            overflow: hidden;
            li{
                width:20%;
                .h(50);
                float: left;
                display: flex;
                flex-direction: column;
                align-items:center;
                justify-content:center;
                img{
                    .w(28);
                    .h(28);
                }
                span{
                    .fs(12);
                    color:#666;
                }
            }
        }
    }
</style>