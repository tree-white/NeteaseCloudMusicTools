<script setup lang="ts"></script>

<template>
  <router-view #default="{ Component }">
    <suspense>
      <div>
        <Component :is="Component" />
      </div>
    </suspense>
  </router-view>
</template>

<style lang="scss"></style>
