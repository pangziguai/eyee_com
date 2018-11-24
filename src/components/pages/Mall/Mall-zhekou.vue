<template>
    <div class="mall-zhekou">
        <ul>
            <li v-for = '(item,index) in disList' :key='index' :class='selected == item.title?"sel":""' @click='change(item.title,item.sorttype,item.ordertype)'>{{item.title}}</li>
        </ul>
        <Zhekou :sele='selected' :sortBy='sort' :orderBy='order'></Zhekou>
    </div>
</template>
<script>
    import Zhekou from './Zhekou.vue';
    export default {
        name:'Mall-zhekou',
        components:{
            Zhekou
        },
        data(){
            return {
                disList:[
                    {title:'人气',sorttype:1,ordertype:0},
                    {title:'销量',sorttype:2,ordertype:0},
                    {title:'新品',sorttype:0,ordertype:0},
                    {title:'价格',sorttype:3,ordertype:1},
                ],
                selected:'人气',
                sort:1,
                order:0
            }
        },
        methods:{
            change(str,type1,type2){
                this.selected = str;
                this.sort = type1;
                this.order = type2;
            }
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .mall-zhekou{
        margin-top: 95px;
        ul{
            .fs(14);
            color:#999;
            overflow:hidden;
            padding-left: 15px;
            border-top: 1px solid #f2f2f2;
            position:fixed;
            top:95px;
            left:0;
            background-color: #fff;
            width: 100%;
            li{
                float:left;
                margin-right: 10px;
                .lh(40);
                .h(40);
            }
            .sel{
                color:#333;
            }
        }
    }
</style>