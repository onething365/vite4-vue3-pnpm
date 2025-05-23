<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()
console.log('ss')
const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button
      type="button"
      :class="['aaaaaaaaaaaaaaaaa', 'bbbbbbbbbbbbbbbbbb', 'ccccccccccccccccc']"
      @click="count++"
    >
      count is {{ count }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  width: 100%;
  height: calc(100% - 10px);
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #fff;
  flex-direction: column;
}
</style>
