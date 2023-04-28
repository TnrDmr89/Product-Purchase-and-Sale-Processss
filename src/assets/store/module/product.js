import Vue from "vue"
import { router } from "../../../router"

const state = {
    productList: [],
    saleProductList: []
}

const getters = {
    getProductList(state) {
        return state.productList
    },
    getProduct(state) {
        return key => state.productList.filter(el => {
            return el.key == key
        })
    },
    getSaledProduct(state) {
        return state.saleProductList
    }
}

const mutations = {
    saveProductList(state, product) {
        state.productList.push(product)
    },
    saveSaledProductList(state, payload) {
        state.saleProductList.push(payload)
        console.log(state.saleProductList)
    },
    addBasket(state, payload) {
        let product = state.productList.filter(element => {
            return element.key == payload.key
        })
        product[0].saleCount = payload.count
        state.saleProductList.push(product)
    },
    resetProductList(state) {
        state.saleProductList = []
    },
    removeProductInSaledProductList(state,product){
      state.saleProductList.pop(product)
      console.log(state.saleProductList)
    }
}

const actions = {
    saveProduct({ dispatch, commit }, product) {
        Vue.http.post("https://product-purchase-sale-process-default-rtdb.firebaseio.com/product.json", product)
            .then(response => {
                product.key = response.body.name
                commit("saveProductList", product)
                let tradeData = {
                    purchase: product.purchasePrice,
                    sale: 0,
                    count: product.count
                }
                dispatch("saveTrade", tradeData)
                router.replace("/")
            })
    },
    initApp({ commit, dispatch }) {
        Vue.http.get("https://product-purchase-sale-process-default-rtdb.firebaseio.com/product.json")
            .then(response => {
                let data = response.body;
                for (let key in data) {
                    data[key].key = key;
                    commit("saveProductList", data[key])
                }
            })
    },
    saveSellProduct({ dispatch, state, commit }, sellProduct) {
        for (let i = 0; i < sellProduct.length; i++) {
            let product = state.productList.filter(element => {
                return element.key == sellProduct[i][0].key
            })

            let totalCount = product[0].count - sellProduct[i][0].saleCount;
            Vue.http.patch("https://product-purchase-sale-process-default-rtdb.firebaseio.com/product/" + sellProduct[i][0].key + ".json", { count: totalCount })
                .then(response => {
                    product[0].count = totalCount;
                    let tradeData = {
                        purchase: 0,
                        sale: product[0].salePrice,
                        count: sellProduct[i][0].saleCount
                    }
                    dispatch("saveTrade", tradeData)
                })
        }
        
        if(router.currentRoute.path == '/urun-satis' || router.currentRoute.path == "/urun-alim"){
            router.replace("/")
            commit("resetProductList")
        }
        else{
            commit("resetProductList")
        }

    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}