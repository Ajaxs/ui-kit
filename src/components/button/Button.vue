<template lang="">
  <button class="ax-button" :class="classes"><slot>Button</slot></button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  size: { type: String },
  type: { type: String }
})

const classes = computed(() => {
  const classesArr = []

  if (props.size) {
    classesArr.push(`ax-size-${props.size}`)
  }
  if (props.type) {
    classesArr.push(`ax-type-${props.type}`)
  }
  return classesArr
})
</script>

<style scoped lang="less">
button {
  background-color: #fff;
  border: 1px solid #d9d9d9;
  outline: none;
  border-radius: 5px;
  padding: 7px 12px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;

  &[disabled] {
    background-color: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
      color: rgba(0, 0, 0, 0.25);
      border-color: #d9d9d9;
    }
  }

  &:hover {
    border-color: #4096ff;
    color: #4096ff;
  }

  &.ax-size-small {
    font-size: 12px;
    padding: 5px 10px;
  }

  &.ax-size-large {
    font-size: 16px;
    padding: 8px 14px;
  }

  &.ax-type-primary {
    background-color: #1677ff;
    border-color: #1677ff;
    color: #fff;
  }

  &.ax-type-dashed {
    border-style: dashed;
  }
}
</style>
