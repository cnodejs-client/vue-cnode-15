<template>
    <div id="app">
        <top-header></top-header>
        <div class="main">
            <router-view name="slidebar"></router-view>
            <router-view name="main"></router-view>
        </div>
    </div>
</template>
<script>
    import topHeader from './components/Header'
    import PostList from './components/PostList'

    export default{
        name:'App',
        components:{
            topHeader,
            PostList
        }
    }
</script>
<style lang="scss">
    .main{
        width:80%;
        margin:16px auto 30px;
    }
</style>