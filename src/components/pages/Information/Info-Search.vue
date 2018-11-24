<template>
    <div class="info-search">
        <div class="search">
            <i class="fa fa-search" aria-hidden="true"></i>
            <input type="text" placeholder='Search'>
        </div>
    </div>
</template>
<script> 
    export default {
        name:'info-search',
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .search{
        .w(356);
        .h(40);
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
</style>