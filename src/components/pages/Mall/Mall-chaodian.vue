<template>
    <div class="mall-chaodian">
        <div class="chaoSwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for='(item,index) in category' :key='index' :style="{ 'background-image': 'url(' + item.data.logourl + ')','background-repeat':'no-repeat','background-size':'cover' }" :class='selected == item.sel?"sele":""' @click='change(item.sel,item.catId)'>
                </div>
            </div>
        </div>
        <Chaodian :currentId='nowId'></Chaodian>
    </div>
</template>
<script> 
    import Vue from 'vue';
    import Axios from 'axios';
    import Swiper from 'swiper';
    import Chaodian from './Chaodian.vue';
    export default {
        name:'Mall-chaodian',
        data(){
            return {
                category:[],
                selected:0,
                nowId:'730645d9f6444d7db732bf153f4d8b37'
            }
        },
        components:{
            Chaodian
        },
        methods:{
            getBannerData(){
                Axios.post('/api/api/Base/CategoryAll',{"version":"2.6.5","lang":"zh","os":"h5","deviceid":"h5","sign":"57fd100ffa0cffd84b5376b95c221620","param":"%7B%7D","extend":"/api/Base/CategoryAll"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        for(let i = 0;i < res.data.data.length;i++){
                            let obj = {};
                            if(res.data.data[i].haschildren){
                                obj.data = res.data.data[i];
                                obj.sel = i;
                                this.category.push(obj);
                            }
                        }
                        this.category[0].catId = '730645d9f6444d7db732bf153f4d8b37';
                        this.category[1].catId = '3f95dbadd82743138ca7c84a986d58d6';
                        this.category[2].catId = 'c06f0f1475c54069b06be76d2cb2de12';
                        this.category[3].catId = '3ade3929d6294007a34d5d4b22384b91';
                        this.category[4].catId = 'f7e8118eb8f64dcbabd4802a51f27557';
                        this.category[5].catId = '79f787b3cb4c4362af57e3bc23cec965';
                        this.category[6].catId = '7f3cdb69bd394cdba9f6a9151d8b7dd6';
                        this.category[7].catId = '888286e02de04ee9964d3f374ee096f3';
                        Vue.nextTick(()=>{
                            this.initSwiper3();
                        })
                    }else{
                        console.log(res.statusText);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            },
            initSwiper3(){
                var swiper5 = new Swiper('.chaoSwiper', {
                    freeMode : true,
                    width:117,
                });
            },
            change(num,id){
                this.selected = num;
                this.nowId = id;
            }
        },
        mounted(){
            this.getBannerData();
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    @import '../../../../node_modules/swiper/dist/css/swiper.min.css';
    .chaoSwiper{
        overflow:hidden;
        margin:98px 15px 0;
        .swiper-slide{
            .h(35);
            background-position: center center;
            margin-right: 5px;
            border:1px solid #fff;
        }
        .sele{
            border:1px solid #ffc700;
        }
    }
    .chaodian{
        margin-top: 10px;
    }
</style>