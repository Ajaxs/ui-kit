<template>
  <div class="ax-radio-group" :class="[`ax-direction-${props.direction}`]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { provide, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number]
  },
  direction: {
    type: String,
    default() {
      return 'row'
    }
  }
})

const emit = defineEmits(['update:modelValue'])

provide(
  'radioModel',
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
.ax-radio-group {
  display: flex;
  gap: 10px;

  &.ax-direction-column {
    flex-direction: column;
  }
}
</style>
