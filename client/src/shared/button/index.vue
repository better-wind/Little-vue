<template>
  <div class="button" @click="onClick">
    {{ title }}
  </div>
</template>

<script>
  export default {
    name: 'shared-button',

    props: {
      title: {
        type: String,
        default() {
          return 'title';
        },
      },
    },

    methods: {
      onClick() {
        console.log('click');
        this.$emit('click', 'params')
      }
    }

  }
</script>

<style lang="scss">
  .button {
    width: 100px;
    height: 30px;
    line-height: 30px;
    background-color: aquamarine;
    text-align: center;
  }
</style>
