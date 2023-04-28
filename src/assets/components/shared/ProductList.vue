<template>
    <div class="container">
        <div class="row">
            <div class="col-12 mb-5 card mt-5 shadow">
                <div class="card-body table-responsive-md">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Count</th>
                                <th scope="col">Product Purchase Price</th>
                                <th scope="col">Product Sale Price</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in getProductList">
                                <td>{{ product.key  }}</td>
                                <td>{{ product.name }}</td>
                                <td :style="product.count > 0 ? 'backgroundColor: green' : 'backgroundColor: red'">{{ product.count }}</td>
                                <td>{{ product.purchasePrice }}</td>
                                <td>{{ product.salePrice }}</td>
                                <td>{{ product.description }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
   computed: mapGetters(["getProductList"])
}
</script>

<style></style>