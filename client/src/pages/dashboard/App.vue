<template>
  <div class="title">
    <Button title="首页x" @click="onClick"/>

  </div>
</template>

<script>
  import Button from '../../shared/button/index';

  export default {
    name: '',

    components: {
      Button
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
    }
  }
</script>

<style lang="scss">
  .title {
    background-color: #000;
  }
</style>
