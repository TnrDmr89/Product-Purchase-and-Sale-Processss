export const updateTrade = (state,tradeData)=>{
    console.log(tradeData.count)
    if(tradeData.count){
            state.purchase += parseFloat(tradeData.purchase) * parseInt(tradeData.count);
            state.sale += parseFloat(tradeData.sale) * parseInt(tradeData.count);
    }
    else{
        state.purchase = tradeData.purchase;
        state.sale = tradeData.sale;
    }
  state.balance = parseFloat(state.sale) - parseFloat(state.purchase)
}
