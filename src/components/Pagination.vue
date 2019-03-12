<template>
    <div class="pagination">
        <button class="btn-direction" @click="changeBtn">&lt;&lt;</button>
        <button v-for="btn in pagebtns" @click="changeBtn(btn)" :class="[{currentPage:btn===currentPage},'pagebtn']">{{btn}}</button>
        <button class="btn-direction" @click="changeBtn">&gt;&gt;</button>
    </div>
</template>
<script>
export default {
    name:'Pagination',
    data(){
        return {
            pagebtns:[1,2,3,4,5,'...'],
            currentPage:1,
        }
    },
    methods:{
        changeBtn(btn){
            if(typeof btn !== 'number' && typeof btn !== 'string'){
                // btn为点击动作事件
                var text = btn.currentTarget.innerHTML;
                switch(text){
                    case '&lt;&lt;':
                        this.currentPage--;
                        break;
                    case '&gt;&gt;':
                        this.currentPage++
                        break;
                }
            }else if (typeof btn === 'string'){
                // btn为省略号...
                return false;
            }else{
                //btn为数字页码
                this.currentPage = btn;
            }
            if(this.currentPage === this.pagebtns[1]){
                this.pagebtns.splice(0,1,1);
            }
            if(this.currentPage === this.pagebtns.length-1 ){
                this.pagebtns.splice(0,1,'...');
            }
            if(this.currentPage < 2 ){
                console.log(this.pagebtns);
                this.currentPage = 1;
            }
            if(this.currentPage > this.pagebtns.length-2){
                this.currentPage = this.pagebtns.length -1 ;
            }
            // console.log(this.currentPage);
            this.$emit('handleList',this.currentPage);
        }
    }
}
</script>

<style scoped lang="scss">
    .pagination{
        >button{
            font-size: 14px;
            vertical-align: top;
            padding: 10px 15px;
            line-height: 14px;
            border: 1px solid #ddd;
            margin-left:-1px;
            background: #fff;
            &.btn-direction{
                font-family:'simsun'
            }
            &:hover{
                background:#eee;
            }
            &:focus{
                outline: none;
            }
            &:first-child{
                border-top-left-radius: 14px;
                border-bottom-left-radius: 14px;
            }
            &:last-child{
                border-top-right-radius: 14px;
                border-bottom-right-radius: 14px;
            }
        }
        >.currentPage{
            color: #80bd01;
        }
    }
</style>