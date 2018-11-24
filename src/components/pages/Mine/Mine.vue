<template>
    <div class="mine">
        <div class="close" @click='back'>
            <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <div class="login">
            <span>登录</span>
            <div class="in">
                <span>手机号码</span>
                <input type="text" class="num" placeholder='请输入手机号码' v-model='uname'>
                <input type="text" class="pass" placeholder='请输入密码' v-model='pass'>
                <button @click='toLogin'>登录</button>
            </div>
            
        </div>
    </div>
</template>
<script>
    export default {
        name:'Mine',
        data(){
            return{
                uname:'',
                pass:''
            }
        },
        methods:{
            toLogin(){
                if(this.uname == '' || this.pass == ''){
                    alert('用户名或密码不能为空');
                }else{
                    localStorage.setItem('name',this.uname);
                    this.$router.replace('/home');
                }
            },
            back(){
                this.$router.replace('/home');
            },
            created(){
                window.localStorage.removeItem('sele');
            }
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .mine{
        background:url('https://files.eyee.com/Shop/system/main/cc6faa4927014fdd85e348453945e305.jpg');
        .w(375);
        .h(667);
        background-size: 375px 667px;
        position:relative;
        .close{
            .w(30);
            .h(40);
            .fs(26);
            .lh(40);
            text-align: center;
            color:#fff;
            position:absolute;
            top:10px;
            left:10px;
        }
        .login{
            .w(310);
            .h(508);
            .padding(200,0,0,0);
            box-sizing: border-box;
            margin:0 auto;
            span{
                .fs(18);
                color:#fff;
            }
            input{
                .w(280);
                .padding(0,0,0,15);
                .h(45);
                border:none;
                border-bottom: 1px solid #f2f2f2;
                background: none;
                outline: none;
            }
            button{
                .w(295);
                .h(45);
                .fs(16);
                color:#fff;
                background-color: #ffc700;
                border:none;
                border-radius: 15px;
                margin-top: 45px;
            }
        }
    }
</style>