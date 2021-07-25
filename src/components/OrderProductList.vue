<template>
    <div>
        <ul class="cart__orders">
            <li class="cart__order" v-for="product in productList" :key="product.productId">
                <h3>{{product.product.title}}</h3>
                <b>{{product.product.price * (product.amount || product.quantity) | numberFormate}}</b>
                <span>Количество: {{(product.amount || product.quantity)}}</span>
                <span>Артикул: {{(product.productId || product.id)}}</span>
            </li>
        </ul>
        <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{productList.length}}</b> тов. на сумму <b>{{totalPrice + 500 | numberFormate}}</b></p>
        </div>
    </div>
</template>

<script>
import numberFormate from '@/helpers/numberFormate'

export default {
    props:['productList', 'totalPrice'],
    filters:{
      numberFormate
    },
}
</script>