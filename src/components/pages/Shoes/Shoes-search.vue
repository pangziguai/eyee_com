<template>
    <div class="search">
        <div class="left">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div class="right">
            <i class="fa fa-search" aria-hidden="true"></i>
            <input type="text" placeholder='Search'>
        </div>
    </div>
</template>
<script> 
    export default {
        name:'Shoes-search',
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .search{
        display:flex;
        .left{
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
        .right{
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
</style>