<template>
    <nav class="navbar navbar-expand-lg" style="background-color: lightcoral;">
        <div class="container-fluid">
            <a class="navbar-brand">Ürün İşlem</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <router-link tag="li" class="nav-item" to="/">
                        <a class="nav-link">Ürün Listesi</a>
                    </router-link>
                    <router-link tag="li" class="nav-item" to="/urun-alim">
                        <a class="nav-link">Ürün Satın Alma İşlemi</a>
                    </router-link>
                    <router-link tag="li" class="nav-item" to="/urun-satis">
                        <a class="nav-link">Ürün Satış İşlemi</a>
                    </router-link>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

</script>

<style></style>