export const getTrade = (state)=>{
  return {
    purchase: state.purchase,
    sale: state.sale,
    balance: state.balance
  }
}