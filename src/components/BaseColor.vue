<template>
    <ul class="colors colors--black">
        <li class="colors__item" v-for="(color, index) in colors" :key="color.id">
            <label class="colors__label">
                <input class="colors__radio sr-only" type="radio" :value="color.id" v-model="colorActive">
                    <span class="colors__value" :style="{'background-color': color.code}">
                </span>
            </label>
        </li>
    </ul>
</template>

<script>
export default {
    data(){
        return{
            // colorActive: {id: 0, code: ''},
        }
    },
    props:['colors', 'colorFilter'],
    
    computed:{
        colorActive:{
            get(){
                return this.colorFilter
            },
            set(value){
                this.$emit('update:colorFilter', value)  
            }
        }
    }
}
</script>