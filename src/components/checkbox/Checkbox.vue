<template>
  <label class="ax-checkbox" :class="{ 'ax-disabled': props.disabled }">
    <input
      type="checkbox"
      v-model="checkboxModel"
      :name="props.name"
      :value="props.value"
      :disabled="disabled"
    />
    <span class="ax-icon"></span>
    <slot />
  </label>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const props = defineProps<{
  name?: string
  value: string | number
  disabled?: boolean
}>()

const checkboxModel = inject('checkboxModel')
</script>

<style lang="less" scoped>
.ax-checkbox {
  display: flex;
  justify-content: center;
  cursor: pointer;

  input[type='checkbox'] {
    display: none;

    &:checked + .ax-icon {
      border-color: #1677ff;

      &::before {
        width: 10px;
        height: 10px;
        top: 3px;
        left: 3px;
      }
    }
  }

  &.ax-disabled {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }

  &:hover:not(.ax-disabled) {
    .ax-icon {
      border-color: #1677ff;
    }
  }

  .ax-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    border: 1px solid #d9d9d9;
    position: relative;
    transition: 0.3s all;
    margin-right: 7px;

    &::before {
      content: '';
      display: inline-block;
      width: 0px;
      height: 0px;
      border-radius: 2px;
      background-color: #1677ff;
      position: absolute;
      top: 8px;
      left: 8px;
      transition: 0.3s all;
    }
  }
}
</style>
