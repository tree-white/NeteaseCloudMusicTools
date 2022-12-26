<script setup lang="ts">
  import VueQr from 'vue-qr/src/packages/vue-qr.vue'
  const props = withDefaults(
    defineProps<{
      text: string
      size?: number
      isExpire?: boolean
      errorHint?: string
      waitHint?: string
      avatar?: string
    }>(),
    { size: 200 }
  )
  const emit = defineEmits<{
    (e: 'refresh'): void
  }>()
</script>

<template>
  <div class="c-qrCode">
    <section class="content">
      <img class="avatar" :src="avatar" v-if="!isExpire && !!avatar" :width="size" :height="size" />
      <vue-qr v-else :text="props.text" :size="props.size" />
      <div class="mask" v-show="isExpire" :style="{ width: size + 'px', height: size + 'px' }">
        <span @click="emit('refresh')">{{ props.errorHint || '二维码已过期' }}</span>
      </div>
    </section>
    <section class="waitBox" v-show="!!props.waitHint">
      {{ props.waitHint }}
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .c-qrCode {
    @apply relative flex justify-center items-center flex-col;

    .content {
      .avatar {
        @apply rounded-full;
      }
      .mask {
        @apply bg-gray-400 bg-opacity-90 text-white flex justify-center items-center absolute top-0 select-none;

        > span {
          @apply font-bold text-xl bg-white text-orange-400 p-1 pl-2 pr-2 rounded cursor-pointer opacity-100;
        }
      }
    }

    .waitBox {
      @apply py-2;
    }
  }
</style>
