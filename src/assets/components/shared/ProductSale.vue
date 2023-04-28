<template>
    <div class="container">
        <div class="row">
            <div class="col-6 offset-3 pt-3 card mt-5 shadow">
                <div class="card-body">
                    <h3>Ürün Çıkışı</h3>
                    <hr>
                    <div class="form-group">
                        <label>Ürün Adı</label>
                        <select class="form-control" v-model="productKey" @change="productSelected">
                            <option v-for="product in getProductList" :disabled="product.count == 0" :value="product.key">
                                {{ product.name }}</option>
                        </select>
                    </div>
                    <div class="card my-2 border border-danger" v-if="product !== null">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 text-center">
                                    <div class="mb-3">
                                        <span class="badge bg-info">Stok : {{ product.count }}</span>
                                        <span class="badge bg-primary">Fiyat : {{ product.salePrice }}</span>
                                    </div>
                                    <p class="border border-warning p-2 text-secondary">{{ product.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Adet</label>
                        <input type="text" v-model.number="product_count" class="form-control" :class="valid"
                            placeholder="Ürün adetini giriniz..">
                        <div :class="isValid == true ? 'valid-feedback': 'invalid-feedback'" v-if="!isValid">
                            Satış miktarı ürün miktarından çok olamaz
                        </div>
                    </div>
                    <hr>
                    <button class="btn btn-primary" @click="addBasket" :disabled="isDisable">Sepete Ekle</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            productKey: null,
            product: null,
            product_count: null,
            clickButton: false,
            isValid: true
        }
    },
    methods: {
        productSelected() {
            this.product = this.$store.getters.getProduct(this.productKey)[0];
            
        },
        addBasket(){
            let product = {
                key: this.productKey,
                count: this.product_count
            }
            this.$store.commit("addBasket",product);
            this.clickButton=true
            this.product_count= null;
            this.product = null;
            this.productKey = null
        }
    },
    computed: {
        ...mapGetters(["getProductList"]),
        isDisable() {
            if (this.productKey !== null && this.product_count > 0 && this.isValid) {
                return false
            }
            return true;
        },
        valid() {
            if (this.product !== null) {
                if (this.product_count > 0 && (this.product_count <= this.product.count)) {
                    this.isValid=true;
                    return 'is-valid';
                } else {
                    this.isValid=false;
                    return 'is-invalid'
                }
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.$store.getters.getSaledProduct.length == 0) {
            if (confirm("Herhangi bir ürün sepete eklenmedi.Yine de ayrılmak istiyor musunuz?")) {
                next();
            }
            next(false);
        } else {
            next();
        }

    }

}
</script>
<style scoped>
.border-danger {
    border-style: dashed !important;
}
</style>