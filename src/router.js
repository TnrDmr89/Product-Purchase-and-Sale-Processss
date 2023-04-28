import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductList from './assets/components/shared/ProductList'
import ProductPurchase from './assets/components/shared/ProductPurchase'
import ProductSale from './assets/components/shared/ProductSale'

Vue.use(VueRouter);

const routes = [
    {path:"/",component:ProductList},
    {path:"/urun-alim",component:ProductPurchase},
    {path:"/urun-satis",component: ProductSale},
    {path:"*", redirect:"/"}
]

export const router = new VueRouter({
  mode:"history",
  routes
})
