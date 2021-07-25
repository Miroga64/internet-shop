<template>
    <li class="catalog__item">  
        <router-link class="catalog__pic" href="#" :to="{name: 'product', params: {id: product.id}}">
            <img :src="product.image" alt="Название товара">
        </router-link>

        <h3 class="catalog__title">
            <a href="#">
            {{ product.title }}
            </a>
        </h3>

        <span class="catalog__price">
            {{ product.price |  numberFormate}}
        </span>
        <BaseColor :colors="getColors" :color-filter.sync="colorFilter"/>
    </li>
</template>

<script>
    import BaseColor from '@/components/BaseColor'
    import gotoPage from '@/helpers/gotoPage'
    import numberFormate from '@/helpers/numberFormate'


    export default {
        props: ['product'],
        components: {BaseColor},
        filters:{
            numberFormate
        },
        data(){
            return {
                colorFilter: this.product.colors[0].id,
            }
        },
        computed:{
            getColors(){
                return this.product.colors
            },
            productNumber(){
                return this.product.id
            }
        }

    }
</script>