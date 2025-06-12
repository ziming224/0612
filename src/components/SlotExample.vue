<template>
  <div>
    <slot :num="num" :text="text" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('abc')
const num = ref(0)
</script>
