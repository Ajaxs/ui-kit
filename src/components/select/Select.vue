<template>
  <div
    class="ax-select"
    :class="{
      open: dropdownIsOpen,
      disabled: disabled,
      filterable: filterable,
      clearable: clearable,
      multiple: multiple
    }"
    v-click-outside="closeDropdown"
  >
    <input
      type="hidden"
      readonly="true"
      autocomplete="off"
      :name="props.name"
      :value="modelValue"
    />
    <div class="ax-label" @click="toggleDropdown">
      <div class="ax-curent-value">
        <template v-if="props.multiple">
          <div class="ax-chips" v-if="props.chips">
            <span class="chip" v-for="value in currentValue" :key="value">{{ value }}</span>
          </div>
          <template v-else>
            {{ currentValue.join(', ') }}
          </template>
        </template>
        <template v-else>{{ currentValue }}</template>
      </div>
      <div class="ax-control" @click.stop="actionControl"></div>
    </div>
    <div class="ax-dropdown-wrap">
      <div class="ax-dropdown">
        <div class="ax-filter" v-if="props.filterable">
          <input type="text" v-model="filter" ref="filterRef" :placeholder="props.placeholder" />
        </div>
        <div class="ax-items">
          <ul>
            <li
              v-for="item in filtrableItems"
              :key="item.value"
              :class="{ selected: isSelectedItem(item.value), disabled: item.disabled }"
              @click="selectItem(item)"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import type { Props, SelectItem, ModelValue } from './SelectTypes'

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search'
})

const emit = defineEmits(['update:modelValue'])

const dropdownIsOpen = ref<boolean>(false)
const filter = ref<string>('')
const filterRef = ref()
const selectedItem = ref<string>('')
const selectedItems = ref<string[]>([])

const toggleDropdown = (): void => {
  dropdownIsOpen.value = !dropdownIsOpen.value
}

const closeDropdown = (): void => {
  dropdownIsOpen.value = false
}

const selectItem = (item: SelectItem): void => {
  if (item.disabled) {
    return
  }

  if (props.multiple) {
    if (selectedItems.value.includes(item.value)) {
      selectedItems.value = selectedItems.value.filter((element) => element !== item.value)
    } else {
      selectedItems.value.push(item.value)
    }
    updateModelValue(selectedItems.value)
  } else {
    selectedItem.value = item.value
    updateModelValue(item.value)
    closeDropdown()
  }
}

const isSelectedItem = (value: string): boolean => {
  if (props.multiple) {
    return selectedItems.value.includes(value)
  } else {
    return selectedItem.value === value
  }
}

const updateModelValue = (value: ModelValue): void => {
  emit('update:modelValue', value)
}

const focusFilter = () => {
  if (props.filterable) {
    //props.$refs.filter.focus()
  }
}

const clearFilter = (): void => {
  filter.value = ''
}

const actionControl = () => {
  if (props.clearable) {
    const model = props.multiple ? [] : ''
    updateModelValue(model)
    closeDropdown()
  }
}

const currentValue = computed(() => {
  if (props.multiple) {
    const items = props.items
      .filter((element: SelectItem) => selectedItems.value.includes(element.value))
      .map((element) => element.label)
    return items
  } else {
    const item = props.items.find((element: SelectItem) => element.value === selectedItem.value)
    return item ? item.label : ''
  }
})

const filtrableItems = computed(() => {
  if (props.filterable) {
    return props.items.filter(
      (item) => item.label.toLowerCase().indexOf(filter.value.toLowerCase()) >= 0
    )
  }

  return props.items
})

onMounted(() => {
  if (props.multiple) {
    if (Array.isArray(props.modelValue)) {
      selectedItems.value = props.modelValue
    }
  } else {
    if (typeof props.modelValue === 'string') {
      selectedItem.value = props.modelValue
    }
  }
})
</script>

<style lang="less" scoped>
.ax-select {
  &.open {
    .ax-label .ax-control {
      &::before {
        transform: rotate(-45deg);
      }

      &::after {
        transform: rotate(45deg);
      }
    }

    .ax-dropdown-wrap .ax-dropdown {
      display: block;
    }
  }

  .ax-label {
    display: flex;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    padding: 6px 8px;

    .ax-curent-value {
      flex-grow: 1;

      .ax-chips {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;

        .chip {
          background-color: #ddd;
          padding: 2px 4px;
          border-radius: 3px;
        }
      }
    }

    .ax-control {
      width: 18px;
      flex-shrink: 0;
      position: relative;
      //background-color: #eee;

      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        border-bottom: 2px solid #aaa;
        width: 8px;
        top: 8px;
        left: 3px;
        transform: rotate(45deg);
        transition: 0.3s all;
      }

      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        border-bottom: 2px solid #aaa;
        width: 8px;
        top: 8px;
        right: 3px;
        transform: rotate(-45deg);
        transition: 0.3s all;
      }
    }
  }

  .ax-dropdown-wrap {
    height: 0px;
    position: relative;
    top: 3px;

    .ax-dropdown {
      background-color: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 5px;
      box-shadow: 0 0 5px #ddd;
      display: none;

      .ax-filter {
        padding: 4px;

        input {
          width: 100%;
          border: 1px solid #d9d9d9;
          border-radius: 3px;
          outline: none;
          padding: 5px 8px;
        }
      }

      .ax-items {
        padding-right: 3px;
        padding-bottom: 3px;

        ul {
          list-style: none;
          max-height: 140px;
          overflow-y: auto;

          &::-webkit-scrollbar {
            width: 6px;
          }

          &::-webkit-scrollbar-track {
            background: #fff;
          }

          &::-webkit-scrollbar-thumb {
            background: #bdbdbd;
            border-radius: 3px;
          }

          li {
            padding: 7px 8px;
            cursor: pointer;

            &:hover:not(.disabled) {
              background-color: #f3f2f2;
            }

            &.selected {
              background-color: #e3eeff;
            }

            &.disabled {
              cursor: not-allowed;
              color: #aaa;
            }
          }
        }
      }
    }
  }
}
</style>
