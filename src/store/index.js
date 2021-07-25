import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {API_BASE_URL} from '@/config.js'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cartProducts:[],

        userAccessKey: null,

        cartProductsData: [],

        orderInfo: null,
    },
    mutations:{
        resetCart(state){
            state.cartProducts = [];
            state.cartProductsData = []
        },
        updateOrderInfo(state, orderInfo){
            state.orderInfo = orderInfo
        },
        updateCartProductAmount(state, {productId, amount}){
            const item = state.cartProducts.find(item => item.productId === productId)

            if(item){
                item.amount = amount
            }
        },

        updateUserAccessKey(state, accesKey){
            state.userAccessKey = accesKey
        },

        updateCartProductsData(state, productData){
            state.cartProductsData = productData
        },

        syncCartProducts(state){
            state.cartProducts = state.cartProductsData.map(item=>{
                return{
                    productId: item.product.id,
                    amount: item.quantity,
                }
            })
        }
    },
    getters:{
        cartDetailProducts(state){
            return state.cartProducts.map(item => {
                const product = state.cartProductsData.find(p => p.product.id === item.productId).product;

                return{
                    ...item,
                    product:{
                        ...product,
                        image: product.image.file.url
                    }
                }
            })
        },

        cartPrice(state, getters){
            return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0)
        },

    },

    actions:{
        loadOrderInfo(context, orderId){
            return axios
            .get(API_BASE_URL + '/api/orders/' + orderId, {
                params:{
                    userAccessKey: context.state.userAccessKey
                }
            })
            .then(response =>{
                context.commit('updateOrderInfo', response.data)
            })
        },
        loadCart(context){
            return axios
                .get(API_BASE_URL + '/api/baskets', {
                    params:{
                        userAccessKey: context.state.userAccessKey
                    }
                },)
                .then(response => {

                    if(context.state.userAccessKey == null){
                        localStorage.setItem('userAccessKey', response.data.user.accessKey);
                        context.commit('updateUserAccessKey', response.data.user.accessKey);
                    }
                  
                    context.commit('updateCartProductsData', response.data.items);
                    context.commit('syncCartProducts');

                })
        },

        addProductToCart(context, {productId, amount}){
            return axios
                .post(API_BASE_URL + '/api/baskets/products', {
                    productId : productId,
                    quantity: amount,
                }, {
                    params:{
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response => {
                    context.commit('updateCartProductsData', response.data.items);
                    context.commit('syncCartProducts');
                })
        },

        updateCartProductAmount(context, {productId, amount}){

            context.commit('updateCartProductAmount', {productId, amount})

            if(amount < 1){
                return ;
            }

            return axios
                .put(API_BASE_URL + '/api/baskets/products', {
                    productId : productId,
                    quantity: amount,
                }, {
                    params:{
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response => {
                    context.commit('updateCartProductsData', response.data.items);
                })
                .catch(()=>{
                    context.commit('syncCartProducts');
                })
        },

        removeCartItem(context, productId){
            return axios    
                .delete(API_BASE_URL + '/api/baskets/products', 
                {
                    params:{
                        userAccessKey: context.state.userAccessKey,
                    },
                    data:{
                        productId : productId,
                    }
                })
                .then(response => {
                    context.commit('updateCartProductsData', response.data.items);
                    context.commit('syncCartProducts');
                })
                .catch(()=>{
                    console.log(productId)
                })
        }

    }
})
