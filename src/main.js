// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './styles/reset.less'
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUi);
Vue.config.productionTip = false

Vue.filter('getDate', function (value) {
    let months = new Date(value).getMonth() + 1;
    let days = new Date(value).getDate();
    let hours = new Date(value).getHours() > 9?new Date(value).getHours():'0' + new Date(value).getHours();
    let minutes = new Date(value).getMinutes() > 9?new Date(value).getMinutes():'0' + new Date(value).getMinutes();
    let seconds = new Date(value).getSeconds() > 9?new Date(value).getSeconds():'0' + new Date(value).getSeconds();
    return months + '月' + days + '日' + hours + ':' + minutes + ':' + seconds;
})
Vue.filter('getTime', function (value) {
    let ms = new Date().getTime() - new Date(value).getTime();
    let days = Math.floor(ms/1000/60/60/24);
    let hours = Math.floor(ms/1000/60/60);
    let minutes = Math.floor(ms/1000/60);
    if(days){
        if(days > 7){
           return '7天前'; 
        }else{
            return days + '天前';
        } 
    }else{
        if(hours){
            return hours + '小时前';
        }else{
            if(minutes){
                return minutes + '分钟前';
            }else{
                return "刚刚";
            }
        }
    }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
