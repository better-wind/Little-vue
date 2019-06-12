<template>
    <input type="text" @keydown="onKeyDown" v-model="inputValue">
</template>

<script>
    export default {
        name: 'shared-search',

        props: {},
        data() {
            return {
                inputValue: ''
            }
        },
        methods: {
            onKeyDown(e) {
                if (e.keyCode == 13) {
                    this.$emit('keydown', this.inputValue)
                }
            }
        }

    }
</script>

<style lang="scss">

</style>
