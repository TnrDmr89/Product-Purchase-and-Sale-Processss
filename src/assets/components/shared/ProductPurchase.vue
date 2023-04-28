<template>
<div class="container">
        <div class="row">
            <div class="col-6 offset-3 pt-3 card mt-5 shadow">
                <div class="card-body">
                    <h3>Ürün İşlemleri</h3>
                    <hr>
                    <div class="form-group">
                        <label>Ürün Adı</label>
                        <input type="text" class="form-control" v-model="product.name" placeholder="Ürün adını giriniz..">
                    </div>
                    <div class="form-group">
                        <label>Adet</label>
                        <input type="number" class="form-control"
                        v-model="product.count" placeholder="Ürün adetini giriniz..">
                    </div>
                    <div class="form-group">
                        <label>Birim Alış Fiyat</label>
                        <input type="number" class="form-control"
                        v-model="product.purchasePrice" placeholder="Ürün fiyatı giriniz..">
                    </div>
                    <div class="form-group">
                        <label>Birim Satış Fiyat</label>
                        <input type="number" class="form-control"
                        v-model="product.salePrice" placeholder="Ürün fiyatı giriniz..">
                    </div>
                    <div class="form-group">
                        <label>Açıklama</label>
                        <textarea cols="30" rows="5"
                        v-model="product.description" placeholder="Ürüne ait bir açıklama giriniz..." class="form-control"></textarea>
                    </div>
                    <hr>
                    <button class="btn btn-primary" :disabled="isDisable" @click="save">Kaydet</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            product:{
              name:"",
              count:null,
              purchasePrice: null,
              salePrice: null,
              description:""
            },
            clickButton: false
        }
    },
    methods:{
        save(){
           this.clickButton = true;
           this.$store.dispatch("saveProduct",this.product)
        }
    },
    computed:{
        isDisable(){
          if(this.product.name.length > 0 && this.product.count > 0 && this.product.purchasePrice > 0 && this.product.salePrice > 0
           && this.product.description.length > 0 ){
            return false;
           }
           return true;
        }
    },
    beforeRouteLeave(to,from,next){
      if(!this.clickButton && this.$store.getters.getProductList.length == 0){
        if(confirm("Ürün kaydedilmedi yine de ayrılmak istiyor musunuz?")){
            next();
        }  
           next(false);
       }else{
        next();
       }

    }
}
 
</script>

<style>

</style>