<template>
    <div>
        <div class="loading" v-if="isLoading"></div>
        <div class="post_content" v-else id="content">
            <div class="header">
                <div class="title">{{post.title}}</div>
                <ul>
                    <li>• 发布于{{post.create_at | forTimeDate}}&nbsp;</li>
                    <li>• 作者
                        <router-link :to="{
                            name:'user_info',
                            params:{
                                name:post.author.loginname
                            }
                        }">
                            {{post.author.loginname}}&nbsp;
                        </router-link> 
                    </li>
                    <li>• {{post.visit_count}}次浏览&nbsp;</li>
                    <li>• 来自&nbsp;{{post | tabFormatter}}</li>
                </ul>
            </div>
            <div class="content">
                <div v-html="post.content"></div>
            </div>
            <div class="reply-wrapper" v-if="post.replies.length > 0 ">
                <div class="num">{{post.replies.length}} 回复</div>
                <div v-for="(reply,index) in post.replies" class="reply">
                    <div class="user-wrapper">
                        <router-link :to="{
                            name:'user_info',
                            params:{
                                name:'reply.author.loginname'
                            }
                        }">
                            <img :src="reply.author.avatar_url" alt="">
                        </router-link>
                        <span class="name">{{reply.author.loginname}}</span>
                        <span class="time">{{index+1}}楼• {{reply.create_at | forTimeDate}}</span>
                    </div>
                    <p v-html="reply.content"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Articles',
    data(){
        return {
            isLoading:true,
            post:{}
        }
    },
    methods:{
        getData(){
            this.$axios.get('https://cnodejs.org/api/v1/topic/'+ this.$route.params.id)
                .then((res)=>{
                    this.post = res.data.data;
                    this.isLoading = false;
                },(err)=>{
                    console.log(err);
                })
        }
    },
    beforeMount() {
        this.getData();
    },
    watch:{
        $route(to,from){
            this.getData();
        }
    }

}
</script>

<style lang="scss">
    @import url('../assets/markdown-github.css');
    .post_content {
        border-radius: 6px;
        margin-right:305px;
        
        > .header {
            border-bottom: 2px solid #E5E5E5;
            padding: 10px 20px 15px 20px;
            background: #fff;
            white-space:normal;

            > .title {
                font-size: 25px;
                font-weight: 700;
                margin: 8px 0;
            }
            > ul {
                display: flex;
                > li {
                    font-size: 13px;
                    color: #838383;
                }
                >li a{
                    color:#838383;
                    &:hover{
                        text-decoration:underline;
                    }
                }
            }
        }
        > .content{
            padding: 20px;
            background: #fff;
            white-space:normal;
        }
    }
    .reply-wrapper{
        background: #fff;
        border-radius: 3px;
        margin-top: 14px;
        > .num{
            background: #F6F6F6;
            padding: 13px 8px;
            font-size: 14px;
        }
        > .reply{
            border-bottom: 1px solid #E5E5E5;
            padding:11px 11px 30px 11px;
            
            > .user-wrapper{
                display: flex;
                align-items: center;
                img {
                    width: 30px;
                    height: 30px;
                }
                > .name{
                    font-size: 12px;
                    font-weight: 700;
                    color: #666;
                    margin: 0 8px;
                }
                > .time{
                    font-size: 11px;
                }
            }
            >p{
                margin-left: 40px;
            }
        }
    }
    .markdown-text p, 
    .preview p {
        white-space: pre-wrap;
        word-wrap: break-word;
    }
</style>