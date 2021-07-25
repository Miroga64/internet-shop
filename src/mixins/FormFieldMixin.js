import BaseFormField from '@/components/BaseFormField'

export default {
    props:['title', 'error', 'placeholder', 'value'],
    components:{BaseFormField},
    computed:{
        dataValue:{
            set(value){
                this.$emit('input', value)
            },
            get(){
                return this.value
            }
        }
    }
}
