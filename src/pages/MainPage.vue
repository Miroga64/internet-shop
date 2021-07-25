<template>
    <main class="content container">
        <div class="content__top content__top--catalog">
            <h1 class="content__title">
                Каталог
            </h1>
            <span class="content__info">
                152 товара
            </span>
        </div>

        <div class="content__catalog">
            <ProductFilter :page-active.sync="page" :filter-param="forFilter" @filter-update="updateFilter"/>

            <section class="catalog">

                <div v-if="productsLoading">Загрузка товаров...</div>
                <div v-if="productsLoadingFailed">
                  Произошла ошибка при загрузке товаров
                  <button @click.prevent="loadProducts">Попробовать еще раз</button>
                </div>

                
                <ProductList :products="products" />

                <BasePagination v-model="page" :count="countProducts"  :per-page="productsPerPage" />

            </section>
        </div>
  </main>
</template>

<script>

import ProductList from '@/components/ProductList'
import BasePagination from '@/components/BasePagination'
import ProductFilter from '@/components/ProductFilter'
import axios from 'axios'
import {API_BASE_URL} from '@/config.js'


export default {
  components: {ProductList, BasePagination, ProductFilter},
  data(){
    return {
      forFilter:{
        filterPriceFrom: 0,
        filterPriceTo: 100000,
        activeColor: 0,
        filterCategoryId: 0,
      },
      page: 1,
      productsPerPage: 3,

      productsData: null,

      productsLoading: false, 

      productsLoadingFailed: false

    }
  },
  computed:{
    products(){
      return this.productsData ? this.productsData.items.map(product => {
        return{
          ...product,
          image: product.image.file.url
        }
      }) : [];
    },
    countProducts(){
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  watch:{
    page(){
      this.loadProducts()
    },
    forFilter:{
      handler(val, oldval){
        this.loadProducts()
      },
      deep: true,
    }, 
  },
  methods:{

    loadProducts(){
      this.productsLoading =  true;
      this.productsLoadingFailed = false;

      axios
        .get(API_BASE_URL + `/api/products`, {
          params:{
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.forFilter.filterCategoryId, 
            minPrice: this.forFilter.filterPriceFrom,
            maxPrice: this.forFilter.filterPriceTo,
            colorId: this.forFilter.activeColor,
          }
        })
        .then(response => this.productsData  = response.data)
        .catch(()=>this.productsLoadingFailed = true)
        .then(this.productsLoading = false)
    
    },
    updateFilter(data){
      let newFilter = Object.assign({}, data);
      this.forFilter = newFilter
    }
  },
  created(){
    this.loadProducts()
  }
}
</script>
