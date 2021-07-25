<template>
    <BaseFormField :title="title" :error="error">
        <textarea class="form__input form__input--area" v-model="dataValue" type="text" :placeholder="placeholder"></textarea>
    </BaseFormField>
</template>

<script>
import FormFieldMixin from '@/mixins/FormFieldMixin'

export default {
   mixins:[FormFieldMixin]
    
}
</script>