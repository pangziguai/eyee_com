<template>
    <div class="info">
        <Search></Search>
        <div class="newsSwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for='(item,index) in navlist' :key='index' :class='selected == item.iPath?"sel":""' @click='toggle(item.iPath,item.categoryid,item.sort)'>
                    {{item.title}}
                </div>
            </div>
        </div>
        <List :iPath='selected' :category='categoryid' :sort='type'></List>
    </div>
</template>
<script>
    import Search from './Info-Search.vue';
    import List from './Info-List.vue';
    import Swiper from 'swiper';
    export default {
        name:'info',
        data(){
            return {
                navlist:[
                    {title:"推荐",iPath:'tuijian',categoryid:'',sort:0},
                    {title:"人气",iPath:'renqi',categoryid:'',sort:1},
                    {title:"潮流",iPath:'chaoliu',categoryid:'d07535683cfc4759be4256b8a1d905b0',sort:0},
                    {title:"鞋履",iPath:'xielv',categoryid:'8bdacbae7683429a858bcfab549321f9',sort:0},
                    {title:"视频",iPath:'shipin',categoryid:'46c1127ea1bb43a19044acc207157708',sort:0},
                    {title:"娱乐",iPath:'yule',categoryid:'6cba246a79614644a1d1101957d251b3',sort:0},
                    {title:"音乐",iPath:'yinyue',categoryid:'62c9171af22240c99c2212df194277b4',sort:0},
                    {title:"生活",iPath:'shenghuo',categoryid:'a9673d0ff9204f71af386cf796de3d5c',sort:0},
                    {title:"正妹",iPath:'zhengmei',categoryid:'da05e4c4678d46a58e0809f8ba20c29c',sort:0},
                    {title:"专题",iPath:'zhaunti',categoryid:'6290686662bd414d8cd4348cead18a69',sort:0},
                    {title:"From Honeyee",iPath:'from',categoryid:'2d61302584eb45b492bc76ca91a60e0b',sort:0}
                ],
                selected:'tuijian',
                categoryid:'',
                type:0
            }
        },
        components:{
            Search,List
        },
        methods:{
            initSwiper(){
                var swiper1 = new Swiper('.newsSwiper', {
                    freeMode : true,
                    freeModeMomentum:true,
                    width:35,
                });
            },
            toggle(path,id,type){
                this.selected = path;
                this.categoryid = id;
                this.type = type;
            }
        },
        mounted(){
            this.initSwiper();
        },
        created(){
            window.localStorage.removeItem('sele');
        }
    }
</script>
<style lang='less'>
    @import '../../../../node_modules/swiper/dist/css/swiper.min.css';
    @import '../../../styles/main.less';
    .info{
        height:100%;
        .newsSwiper{
            .h(36);
            .fs(14);
            margin-left: 10px;
            overflow: hidden;
            .swiper-slide{
                display:flex;
                align-items:center;
                color:#333;
                justify-content:center;
                box-sizing: border-box;
                margin-right: 12px;
            }
            .swiper-slide:last-child{
                .w(100) !important;
            }
            .sel{
                border-bottom: 2px solid #333;
            }
        }
    }
    
</style>