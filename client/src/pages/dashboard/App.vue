<template>
    <div class="title">
        <Button title="首页x" @click="onClick"/>
        <Search @keydown="onKeyDown"></Search>
    </div>
</template>

<script>
    import Button from '../../shared/button/index';
    import Search from '../../shared/search/index';

    export default {
        name: '',

        components: {
            Button,
            Search
        },

        data() {
            return {
                title: 'title1'
            }
        },
        methods: {
            onClick(e) {
                console.log('dashboard click')
                console.log(e)
            },
            onKeyDown(value) {
                alert('搜索值' + value)
            }
        }
    }
</script>

<style lang="scss">
    .title {
        background-color: #EEE;
    }
</style>
