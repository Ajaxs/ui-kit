<template>
  <div class="ax-checkbox-group"><slot /></div>
</template>

<script lang="ts" setup>
import { provide, computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number] }
})

const emit = defineEmits(['update:modelValue'])

provide(
  'checkboxModel',
  computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })
)
</script>

<style lang="less" scoped>
.ax-checkbox-group {
  display: flex;
  gap: 10px;
}
</style>
