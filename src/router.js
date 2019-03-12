import Vue from 'vue'
import Router from 'vue-router'
import PostList from './components/PostList'
import Article from './components/Article'
import UserInfo from './components/Userinfo'
import SideBar from './components/Sidebar'
import Login from './components/Login'
Vue.use(Router);

export default new Router({
    routes:[
        {
            name:'root',
            path:'/',
            components:{
                main:PostList
            }
        },
        {
            name:'post_count',
            path:'/topic/:id&author=:name',
            components:{
                name:Article,
                sidebar:SideBar
            }
        },
        {
            name:'user_info',
            path:'/userinfo/:name',
            components:{
                main:UserInfo
            }
        },
        {
            name:'login',
            path:'/login',
            components:{
                main:Login
            }
        }
    ]
})