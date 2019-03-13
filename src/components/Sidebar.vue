<template>
    <div class="userinfo" id="sidebar">
        <div v-if="isLoading"></div>
        <div class="user-wrapper">
            <div class="bar">个人信息</div>
            <div class="user">
                <router-link :to="{
                    name:'user_info',
                    params:{
                        name:userinfo.loginname
                    }
                }">
                    <img :src="userinfo.avatar_url" alt="">
                </router-link>
                <span class="name">{{userinfo.loginname}}</span>
                <p>积分{{userinfo.score}}</p>
            </div>
        </div>
        <div class="topics">
            <div class="bar">作者最近主题</div>
            <ul>
                <li v-for="(item,index) in userinfo.recent_topics">
                    <router-link :to="{
                        name:'post_count',
                        params:{
                            id:item.id,
                            name:item.author.loginname
                        }
                    }">
                        {{item.title}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="replies">
            <div class="bar">作者最近回复</div>
            <ul>
                <li v-for="item in userinfo.recent_replies">
                    <router-link :to="{
                        name:'post_count',
                        params:{
                            id:item.id,
                            name:item.author.loginname
                        }
                    }">
                        {{item.title}}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'Sidebar',
    data(){
        return {
            userinfo:{},
            isLoading:true
        }
    },
    methods:{
        getData(){
            this.$axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
                .then((res)=>{
                    this.userinfo = res.data.data;
                    this.isLoading = false;
                },(err)=>{
                    console.log(err)
                })
        }
    },
    beforeMount() {
        this.getData()
    },
}
</script>

<style scoped lang="scss">
    .userinfo {
        float: right;
        margin-left: 20px;
        width: 290px;
        > .user-wrapper, .topics, .replies {
            margin-bottom: 15px;
            background: #fff;
            > .bar {
                background: #F6F6F6;
                padding: 15px;
                color: #444;
                font-size: 13px;
            }
        }
        > .user-wrapper {
            >.user{
                padding: 10px;
                img {
                    vertical-align: middle;
                    height: 48px;
                    width: 48px;
                }
                >.name{
                    margin-left: 5px;
                    color: #778087;
                    font-size: 16px;
                }
                >p{
                    margin-top: 10px;
                    font-size: 14px;
                }
            }

        }
        > .topics, .replies {
            > ul>li {
                font-size: 14px;
                padding: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                > a {
                    color: #778087;
                }
            }
        }
    }
</style>