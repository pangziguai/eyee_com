<template>
    <div class="mall-pinpai">
        <div class="brand" v-for='(item,index) in brandsList' :key="index">
            <div class="cover" :style="{ 'background-image': 'url(' + item.coverurl + ')','background-repeat':'no-repeat','background-size':'cover'}">
                <img v-lazy="item.logourl" alt="" />
                <span>{{item.name}}</span>
            </div>
              <div class="bottom">
                  <div v-for='good in item.products' @click='toDetail(good.id)'>
                      <img v-lazy="good.mainpic">
                      <p>
                         <span class='low' v-if='good.specialprice'>￥{{good.specialprice.toFixed(2)}}</span><span v-if='good.specialprice' class='high'>￥{{good.saleprice.toFixed(2)}}</span><span v-if='!good.specialprice' class='low'>￥{{good.saleprice.toFixed(2)}}</span>
                      </p>
                      <p class="name">
                          <span v-if='good.businesstype == 1'>（官方店）</span>
                          <span v-if='good.businesstype == 2'>（买手店）</span>
                          <span v-if='good.businesstype == 3'>（专营店）</span>
                          <span class='busname'>{{good.businessname}}</span>
                      </p>
                  </div>
              </div>
        </div>
    </div>
</template>
<script> 
    import Vue from 'vue';
    import Axios from 'axios';
    export default {
        name:'Mall-pinpai',
        data(){
            return {
                brandsList:[]
            }
        },
        methods:{
            getBrands(){
                Axios.post('/api/api/Base/BrandHotSale',{"version":"2.6.5","lang":"zh","os":"h5","deviceid":"h5","sign":"57fd100ffa0cffd84b5376b95c221620","param":"%7B%7D","extend":"/api/Base/BrandHotSale"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        this.brandsList = res.data.data;
                        console.log(res.data.data);
                    }else{
                        console.log(res.statusText);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            },
            toDetail(goodId){
                this.$router.push({name: 'detailothers', params:{goodId}});
            }
        },
        created(){
            this.getBrands();
        },
        destroyed(){
            window.localStorage.setItem('sele','品牌');
        },
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .mall-pinpai{
        margin-bottom: 100px;
        margin-top: 95px;
    }
    .brand{
        margin-bottom: 10px;
        .w(340);
        .h(320);
        margin: 15px auto;
        border-radius: 16px;
        box-shadow: rgb(204, 204, 204) 0px 4px 10px 1px;
        .cover{
            .w(340);
            .h(178);
            border-radius: 10px;
            margin-bottom: 5px;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            img{
                .w(60);
                .h(60);
                border-radius: 60px;
            }
            span{
                .fs(18);
                color:#fff;
            }
        }
        .center{
            .w(340);
            .h(30);
            .fs(12);
            .padding(0,0,0,15);
            display:flex;
            align-items:center;
            .name{
                .fs(16);
            }
        }
        .bottom{
            .w(340);
            .h(154);
            .fs(12);
            .padding(5,5,5,5);
            box-sizing: border-box;
            display:flex;
            justify-content:space-between;
            .cover{
                width: 100%;
                .h(130);
            }
            div{
                .w(100);
                .h(141);
                text-align: center;
                img{
                    .w(88);
                    .h(88);
                }
                .high{
                    color:#999;
                    text-decoration: line-through;
                    font-weight: bolder;
                }
                .low{
                    color:#333;
                    font-weight: bolder;
                }
                .name{
                    text-overflow:ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
        }
    }
    .brand:nth-child(18) .cover{
        background-color: #ccc !important;
    }
</style>