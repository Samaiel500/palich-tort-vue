<template>
    <div class="radio" v-for="input in inputsRadios">
        <input v-model="inputSelect" type="radio" :name="input.name" :value="input.nameId" :id="input.nameId" :disabled="input.isDisabled" class="radio__input hidden">
        <label :for="input.nameId" class="radio__label">{{ input.text }}</label>
    </div>
</template>

<script>
export default {
    props: {
        inputsRadios: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            inputSelect : '',
        }
    }
}

</script>

<style>

</style>