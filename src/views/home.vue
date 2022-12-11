<script setup lang="ts">
  import utils from '@/common/utils'
  const info = utils.getStorage('userInfo')
  console.log('>>>>>> info=>', info)
</script>

<template>
  <div>这是初始Home页面</div>
</template>

<style lang="scss" scoped></style>
