<template>
    <aside class="filter">
        <h2 class="filter__title">Фильтры</h2>

        <form class="filter__form form" action="#" method="get">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="min-price" v-model.number="currentFilterParam.filterPriceFrom">
              <span class="form__value">От</span>
            </label>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="max-price" v-model.number="currentFilterParam.filterPriceTo">
              <span class="form__value">До</span>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Категория</legend>
            <label class="form__label form__label--select">
              <select class="form__select" type="text" name="category" v-model.number="currentFilterParam.filterCategoryId">
                <option value = 0>Все категории</option>
                <option v-for="cateroty in categories" :key="cateroty.id" :value="cateroty.id">{{cateroty.title}}</option>
                
              </select>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Цвет</legend>
            <BaseColor :colors="colors" :color-filter.sync="currentFilterParam.activeColor"/>

          </fieldset>

          <!-- <fieldset class="form__block">
            <legend class="form__legend">Объемб в ГБ</legend>
            <ul class="check-list">
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" checked="">
                  <span class="check-list__desc">
                    8 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
                  <span class="check-list__desc">
                    16 
                    <span>(461)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
                  <span class="check-list__desc">
                    32 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
                  <span class="check-list__desc">
                    64 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="128">
                  <span class="check-list__desc">
                    128 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="264">
                  <span class="check-list__desc">
                    264 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset> -->

          <button class="filter__submit button button--primery" @click.prevent="submit()">
            Применить
          </button>
          <button class="filter__reset button button--second" @click="reset()" type="button">
            Сбросить
          </button>
        </form>
    </aside>
</template>

<script>


    import BaseColor from '@/components/BaseColor'
    import axios from 'axios'
    import {API_BASE_URL} from '@/config.js'


    

    export default {
        data(){
            return{
                currentFilterParam: {},
                categoriesData: null,
                filterColorNew: null,
            }
        },
        components: {BaseColor},

        props: ['pageActive', 'filterParam'],

        computed:{
            //код для эмита событий при их изменении элементами dom дерева (например input)
            // currentPriceFrom: {
            //     get(){
            //         return this.priceFrom
            //     },
            //     set(value){
            //         this.$emit('update:priceFrom', value)
            //     },
            // },
            categories(){
              return this.categoriesData ? this.categoriesData.items : null
            },
            colors(){
              return this.filterColorNew ? this.filterColorNew.items : null
            }
        },

        methods:{
            submit(){
                this.$emit('filter-update', this.currentFilterParam)
                this.$emit('update:pageActive', 1)
            }, 
            reset(){
                this.$emit('filter-update', {})
                this.$emit('update:pageActive', 1)
            },
            loadCategories(){
              axios
                .get(API_BASE_URL + '/api/productCategories')
                .then(response => this.categoriesData = response.data)
            }, 
            loadColors(){
              axios
                .get(API_BASE_URL + '/api/colors')
                .then(response => this.filterColorNew = response.data)
            }
        },

        created(){
          this.loadCategories()
          this.loadColors()
        }
    }
</script>