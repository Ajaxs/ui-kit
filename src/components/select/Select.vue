<template>
  <div
    class="ax-select"
    :class="{
      open: dropdownIsOpen,
      disabled: disabled,
      filterable: filterable,
      clearable: clearable && !curentValueIsEmpty,
      multiple: multiple,
      chips: chips
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
        <div v-if="curentValueIsEmpty" class="ax-empty-value">{{ emptyPlaceholder }}</div>
        <template v-else>
          <slot name="result" :result="result">
            <template v-if="props.multiple">
              <div v-if="props.chips" class="ax-chips">
                <span class="chip" v-for="res in result" :key="res.value">
                  {{ res[props.textLabel] }}
                </span>
              </div>
              <template v-else>
                {{ resultAsString }}
              </template>
            </template>
            <template v-else>{{ result[props.textLabel] }}</template>
          </slot>
        </template>
      </div>
      <div class="ax-control" @click.stop="actionControl"></div>
    </div>
    <div class="ax-dropdown-wrap">
      <div class="ax-dropdown">
        <div class="ax-filter" v-if="props.filterable">
          <input
            type="text"
            v-model="filter"
            ref="filterRef"
            :placeholder="props.searchPlaceholder"
          />
        </div>
        <div class="ax-items">
          <ul>
            <li
              v-for="item in filtrableItems"
              :key="item.value"
              :class="{ selected: isSelectedItem(item.value), disabled: item.disabled }"
              @click="selectItem(item)"
            >
              <slot :item="item">{{ item.label }}</slot>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" generic="T" setup>
import { computed, ref, onMounted, onUpdated } from 'vue'
import type { Props, SelectItem, ModelValue } from './SelectTypes'

const props = withDefaults(defineProps<Props>(), {
  searchPlaceholder: 'Search',
  emptyPlaceholder: 'Select value',
  textValue: 'value',
  textLabel: 'label'
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
    selectedItems.value = []
    //selectedItem.value = ''
    updateModelValue(model)
    closeDropdown()
  }
}

const result = computed(() => {
  if (props.multiple) {
    return props.items.filter((element: SelectItem) => selectedItems.value.includes(element.value))
  } else {
    return props.items.find((element: SelectItem) => element.value === selectedItem.value) ?? ''
  }
})

const resultAsString = computed(() => {
  if (props.multiple && Array.isArray(result.value)) {
    return result.value.map((item) => item[props.textLabel]).join(', ')
  } else {
    return ''
  }
})

// определяем выбраны ли значения
const curentValueIsEmpty = computed(() => {
  if (props.multiple) {
    return selectedItems.value.length === 0
  } else {
    return selectedItem.value === ''
  }
})

// eсли вклбчена фильтрация по названию
const filtrableItems = computed(() => {
  if (props.filterable) {
    return props.items.filter(
      (item) => item.label.toLowerCase().indexOf(filter.value.toLowerCase()) >= 0
    )
  }

  return props.items
})

// Инициализация данных полученных из props
const initSelectedItems = () => {
  if (props.multiple) {
    if (Array.isArray(props.modelValue)) {
      selectedItems.value = props.modelValue
    }
  } else {
    if (typeof props.modelValue === 'string') {
      selectedItem.value = props.modelValue
    }
  }
}

onMounted(() => {
  initSelectedItems()
})

onUpdated(() => {
  initSelectedItems()
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

  &.multiple.chips .ax-label {
    padding: 4px 5px;
  }

  &.clearable .ax-label:hover {
    .ax-control {
      &::before {
        width: 12px;
        top: 9px;
        //left: 4px;
      }

      &::after {
        width: 12px;
        top: 9px;
        //right: 4px;
      }
    }
  }

  .ax-label {
    display: flex;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    padding: 6px 8px;
    cursor: pointer;

    .ax-curent-value {
      flex-grow: 1;
      min-height: 21px;
      display: flex;
      align-items: center;

      .ax-empty-value {
        color: #8f8f8f;
      }

      .ax-chips {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        justify-content: flex-start;

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
        top: 10px;
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
        top: 10px;
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
            display: flex;
            align-items: center;

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
