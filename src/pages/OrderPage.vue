<template>
    <main class="content container">
        <div class="content__top">
        <ul class="breadcrumbs">
            <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="index.html">
                Каталог
            </a>
            </li>
            <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
                Корзина
            </a>
            </li>
        </ul>

        <h1 class="content__title">
            Корзина
        </h1>
        <span class="content__info">
            3 товара
        </span>
        </div>
        <section class="cart">
        <form class="cart__form form" action="#" method="POST" @submit.prevent="order()">
            <div class="cart__field">
                <div class="cart__data">
                    <BaseFormText title="ФИО" placeholder="Введите ваше полное имя" v-model="formData.name" :error="formError.name"/>
                    <BaseFormText title="Адрес доставки" placeholder="Введите ваш адрес" v-model="formData.address" :error="formError.address"/>
                    <BaseFormText title="Телефон" placeholder="Введите ваш телефон" v-model="formData.phone" :error="formError.phone"/>
                    <BaseFormText title="Email" placeholder="Введи ваш Email" v-model="formData.email" :error="formError.email"/>
                    <BaseFormTextarea title="Комментарий к заказу" :error="formError.comment" placeholder="Ваши пожелания" v-model="formData.comment"/>

                </div>

                <div class="cart__options">
                    <h3 class="cart__title">Доставка</h3>
                    <ul class="cart__options options">
                        <li class="options__item">
                            <label class="options__label">
                            <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                            <span class="options__value">
                                Самовывоз <b>бесплатно</b>
                            </span>
                            </label>
                        </li>
                        <li class="options__item">
                            <label class="options__label">
                            <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                            <span class="options__value">
                                Курьером <b>500 ₽</b>
                            </span>
                            </label>
                        </li>
                    </ul>
                    <h3 class="cart__title">Оплата</h3>
                    <ul class="cart__options options">
                        <li class="options__item">
                            <label class="options__label">
                            <input class="options__radio sr-only" type="radio" name="pay" value="card">
                            <span class="options__value">
                                Картой при получении
                            </span>
                            </label>
                        </li>
                        <li class="options__item">
                            <label class="options__label">
                            <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                            <span class="options__value">
                                Наличными при получении
                            </span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="cart__block">
                <OrderProductList :productList="productList" :totalPrice="totalPrice"/>
                


                <button class="cart__button button button--primery" type="submit" v-show="productList.length > 0">
                    Оформить заказ
                </button>
                <div v-show="productAddSending">Заказ обрабатывается</div>
            </div>
            <div class="cart__error form__error-block" v-show="formErrorMessage != ''">
                <h4>Заявка не отправлена!</h4>
                <p>
                    {{formErrorMessage}}
                </p>
            </div>
        </form>
        </section>
    </main>
</template>

<script>
import numberFormate from '@/helpers/numberFormate'
import BaseFormText from '@/components/BaseFormText'
import BaseFormTextarea from '@/components/BaseFormTextarea'
import OrderProductList from '@/components/OrderProductList'

import axios from 'axios'
import {API_BASE_URL} from '@/config.js'
import { mapGetters } from 'vuex'




export default {
    data(){
        return{
            formData:{},
            formError:{},
            formErrorMessage: '',
            productAdded: false,
            productAddSending: false,
        }
    },
    filters:{
      numberFormate
    },
    computed:{
      ...mapGetters({productList : 'cartDetailProducts', totalPrice: 'cartPrice'})

      // products(){
      //   return this.$store.getters.cartDetailProducts
      // }
    },
    components:{BaseFormText, BaseFormTextarea, OrderProductList},
    methods:{
        order(){ 
            this.formError = {}
            this.formErrorMessage = ''
            this.productAdded = false;
            this.productAddSending = true;
            axios
                .post(API_BASE_URL + '/api/orders',{
                    ...this.formData
                }, {
                    params:{
                        userAccessKey: this.$store.state.userAccessKey
                    } 
                })
                .then(response=>{
                    this.$store.commit('resetCart');
                    this.$store.commit('updateOrderInfo', response.data);
                    this.$router.push({name: 'orderInfo', params: {id: response.data.id}});
                    this.productAdded = true;
                    this.productAddSending = false;
                })
                .catch(error=>{
                    this.formError = error.response.data.error.request || {};
                    this.formErrorMessage = error.response.data.error.message || ''
                     this.productAdded = false;
                    this.productAddSending = false;
                })
               
        }
    }
}
</script>
