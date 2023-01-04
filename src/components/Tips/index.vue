<template>
  <div>
    <el-tooltip :effect="props.effect" :content="props.content" :placement="props.placement" raw-content>
      <i-ep-info-filled :color="props.iconColor" class="mx-2" />
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
  import { Placement } from 'element-plus'

  const props = withDefaults(
    defineProps<{
      effect?: 'dark' | 'light'
      content: string
      placement?: Placement
      iconColor?: string
    }>(),
    {
      effect: 'dark',
      content: '请输入提示内容',
      placement: 'right',
      iconColor: '#C0C4CC'
    }
  )
</script>

<style lang="scss" scoped></style>
