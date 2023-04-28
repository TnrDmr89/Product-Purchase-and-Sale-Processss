<template>
    <div>
        <app-header></app-header>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <app-footer></app-footer>
    </div>
</template>

<script>
import Header from './assets/components/common/Header.vue'
import Footer from './assets/components/common/Footer.vue'
export default {
    components: {
        appHeader: Header,
        appFooter: Footer,
    },
    created(){
        this.$store.dispatch("getTradeResult")
        this.$store.dispatch("initApp")
    }

}
</script>

<style>
body{
    background-color: rgb(193, 166, 166);
}
.fade-enter{
  opacity:0
}
.fade-enter-active{
 transition: opacity .3s ease-out;
}
.fade-leave{
 
}
.fade-leave-active{
    transition: opacity .3s ease-out;
    opacity: 0; 
}
</style>
