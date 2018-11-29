import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
import Home from '../components/pages/Home/Home.vue'
import Info from '../components/pages/Information/Information.vue'
import Shoes from '../components/pages/Shoes/Shoes.vue'
import Mall from '../components/pages/Mall/Mall.vue'
import MallFenlei from '../components/pages/Mall/Mall-fenlei.vue'
import MallChaodian from '../components/pages/Mall/Mall-chaodian.vue'
import MallGuishi from '../components/pages/Mall/Mall-guishi.vue'
import MallPinpai from '../components/pages/Mall/Mall-pinpai.vue'
import MallXianliang from '../components/pages/Mall/Mall-xianliang.vue'
import MallZhekou from '../components/pages/Mall/Mall-zhekou.vue'
import Mine from '../components/pages/Mine/Mine.vue'
import DetailShoes from '../components/commons/Details/DetailShoes'
import DetailOthers from '../components/commons/Details/DetailOthers'
import ShoppingCart from '../components/commons/ShoppingCart/ShoppingCart.vue'
export default new Router({
    routes: [
        {path: '/',redirect:'/home'},
        {path:'/home',component:Home,name:'home'},
        {path:'/info',component:Info,name:'info'},
        {path:'/shoes',component:Shoes,name:'shoes'},
        {path:'/mall',component:Mall,name:'mall',children:[
            {path:'',component:MallFenlei,name:'fenlei'},
            {path:'pinpai',component:MallPinpai,name:'pinpai'},
            {path:'guishi',component:MallGuishi,name:'guishi'},
            {path:'chaodian',component:MallChaodian,name:'chaodian'},
            {path:'zhekou',component:MallZhekou,name:'zhekou'},
            {path:'xianliang',component:MallXianliang,name:'xianliang'},
        ]},
        {path:'/mine',component:Mine,name:'mine'},
        {path:'/detailshoes/:goodId',component:DetailShoes,name:'detailshoes'},
        {path:'/detailothers/:goodId',component:DetailOthers,name:'detailothers'},
        {path:'/shoppingCart',component:ShoppingCart,name:'shoppingcart'},
    ]
})
