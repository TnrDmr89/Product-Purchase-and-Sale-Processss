<template>
    <div>
        <nav class="navbar fixed-bottom" style="background-color: #e3f2fd;">
            <span class="navbar-text me-auto">
                <strong>Taner Demir</strong>
            </span>
            <span class="navbar-text navbar-nav my-2 my-lg-0 mx-3">
                <strong>Alış Tutarı : </strong>
                <span class="badge bg-primary">{{ getTrade.purchase }}</span>
            </span>
            <span class="navbar-text navbar-nav my-2 my-lg-0 mr-3 mx-3">
                <strong>Satış Tutarı : </strong>
                <span class="badge bg-primary">{{ getTrade.sale }}</span>
            </span>
            <span class="navbar-text navbar-nav my-2 my-lg-0 mx-3">
                <strong>Bakiye : </strong>
                <span class="badge bg-danger">{{ getTrade.balance }}</span>
            </span>
            <span class="navbar-text navbar-nav my-2 my-lg-0 mx-3">
                <i class="bi bi-cart3" style="font-size: 30px;" data-bs-toggle="modal" data-bs-target="#exampleModal"><span
                        class="position-absolute top-30 start-90 translate-middle badge rounded-pill bg-danger"
                        style="font-size:10px;">
                        {{ saledProductCount }}
                    </span></i>
            </span>
        </nav>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-12 mb-5 card mt-5 shadow">
                                    <div class="card-body table-responsive-md">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Product Name</th>
                                                    <th scope="col">Product Sale Price</th>
                                                    <th scope="col">Sale count</th>
                                                    <th scope="col">Ürün Adeti değiştir</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="product in getSaledProduct" :key="product.key">
                                                    <td>{{ product[0].key }}</td>
                                                    <td>{{ product[0].name }}</td>
                                                    <td>{{ product[0].salePrice }}</td>
                                                    <td>{{ product[0].saleCount }}</td>
                                                    <td>
                                                        <button class="btn btn-primary"
                                                            @click="updateSaledCount(product[0], 1)"
                                                            :disabled="product[0].saleCount == product[0].count">Arttır</button>
                                                            <div v-if="product[0].saleCount == product[0].count">
                                                                <strong style="color:red;">Ürün adetinden daha fazla seçilemez</strong></div>
                                                        <button class="btn btn-warning"
                                                            @click="updateSaledCount(product[0], -1)"
                                                            :disabled="product[0].saleCount == 0">Azalt</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="save" data-bs-dismiss="modal">Save changes</button>
                    </div>
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
            saleCount: 1,
            totalSaledProductCount: null
        }
    },
    computed: {
        ...mapGetters(["getTrade", "getSaledProduct"]),
        saledProductCount(){
            this.totalSaledProductCount = null;
            let product = this.$store.getters.getSaledProduct;
            for(let i = 0; i< product.length; i++){
                this.totalSaledProductCount += product[i][0].saleCount
            }
            return this.totalSaledProductCount
        },
    },
    methods: {
        updateSaledCount(product, count) {
            product.saleCount += count;
            if(product.saleCount == 0){
                this.$store.commit("removeProductInSaledProductList",product)
            }
            this.totalSaledProductCount += count
            this.saleCount = product.saleCount;
            
            
            //modaldaki ürün azaltım ve ekleme işleminde data property değiştiği için saledCount tekrar çalışır
        },
        save() {
           this.$store.dispatch("saveSellProduct",this.$store.getters.getSaledProduct)
        }
    }
}
</script>


<style></style>