import Vue from "vue"

export const saveTrade = ({state,commit},tradeData)=>{
  commit("updateTrade",tradeData);
  let trade = {
    purchase: state.purchase,
    sale: state.sale
  }
  Vue.http.put("https://product-purchase-sale-process-default-rtdb.firebaseio.com/trade.json",trade)
  .then(response => {
    console.log(response)
  })
}

export const getTradeResult = ({commit})=>{
    Vue.http.get("https://product-purchase-sale-process-default-rtdb.firebaseio.com/trade.json")
    .then(response => {
        if(response.body != null){
            commit("updateTrade",response.body)
        }
       
        
    })
}