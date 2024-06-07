<template>
  <div class="page">
    <h3>Buttons</h3>
    <h4>Buttons type</h4>
    <div class="items">
      <ax-button>Button</ax-button>
      <ax-button type="primary">Button primary</ax-button>
      <ax-button type="dashed">Button dashed</ax-button>
      <ax-button disabled>Button disabled</ax-button>
    </div>
    <h4>Buttons size</h4>
    <div class="items">
      <ax-button size="small">Button small</ax-button>
      <ax-button>Button</ax-button>
      <ax-button size="large">Button large</ax-button>
    </div>

    <h3>Radio</h3>
    <h4>Direction row</h4>
    <div class="items">
      <ax-radio-group v-model="radioGroup">
        <ax-radio value="1">Variant 1</ax-radio>
        <ax-radio value="2">Variant 2</ax-radio>
        <ax-radio value="3">Variant 3</ax-radio>
        <ax-radio value="4" disabled>Variant 4</ax-radio>
      </ax-radio-group>
    </div>
    <div class="model">Radio Group Model: {{ radioGroup }}</div>

    <h4>Direction column</h4>
    <div class="items">
      <ax-radio-group direction="column" v-model="radioGroup">
        <ax-radio value="1">Variant 1</ax-radio>
        <ax-radio value="2">Variant 2</ax-radio>
        <ax-radio value="3">Variant 3</ax-radio>
        <ax-radio value="4" disabled>Variant 4</ax-radio>
      </ax-radio-group>
    </div>
    <div class="model">Radio Group Model: {{ radioGroup }}</div>

    <h3>Checkbox</h3>
    <div class="items">
      <ax-checkbox value="no">Checkbox 1</ax-checkbox>
      <ax-checkbox value="yes">Checkbox 2</ax-checkbox>
      <ax-checkbox value="test" disabled>Checkbox 3</ax-checkbox>
    </div>

    <h3>Checkbox group</h3>
    <div class="items">
      <ax-checkbox-group v-model="checkboxGroup">
        <ax-checkbox value="1">Checkbox 1</ax-checkbox>
        <ax-checkbox value="2">Checkbox 2</ax-checkbox>
        <ax-checkbox value="3">Checkbox 3</ax-checkbox>
      </ax-checkbox-group>
    </div>
    <div class="model">Checkbox Group Model: {{ checkboxGroup }}</div>

    <h3>Select</h3>
    <h4>Basic</h4>
    <div class="items">
      <ax-select class="w200" v-model="selectedColor" :items="selectItems"></ax-select>
    </div>
    <div class="model">Select Model: {{ selectedColor }}</div>

    <h4>Multiple</h4>
    <div class="items">
      <ax-select
        class="w200"
        v-model="selectedColorMultiple"
        :items="selectItems"
        multiple
        filterable
      ></ax-select>
      <ax-select
        class="w200"
        v-model="selectedColorMultiple"
        :items="selectItems"
        multiple
        filterable
        chips
        clearable
      ></ax-select>
    </div>

    <div class="model">Select Model: {{ selectedColorMultiple }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AxButton from '@/components/button/Button.vue'
import AxRadioGroup from '@/components/radio/RadioGroup.vue'
import AxRadio from '@/components/radio/Radio.vue'
import AxCheckboxGroup from '@/components/checkbox/CheckboxGroup.vue'
import AxCheckbox from '@/components/checkbox/Checkbox.vue'
import AxSelect from '@/components/select/Select.vue'

const radioGroup = ref<string>('1')
const checkboxGroup = ref<string[]>(['1'])
const selectedColor = ref<string>('green')
const selectedColorMultiple = ref<string[]>(['green'])

const selectItems = [
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'pink', label: 'Pink' },
  { value: 'white', label: 'White' },
  { value: 'black', label: 'Black', disabled: true }
]
</script>

<style scoped lang="less">
.page {
  padding: 25px;
}

h3 {
  font-size: 24px;
  margin-bottom: 15px;
}

h4 {
  font-size: 18px;
  color: #666;
  margin-bottom: 15px;
}

.items {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
}

.model {
  display: inline-block;
  padding: 5px 10px;
  color: #fff;
  background-color: #bbb;
  border-radius: 5px;
  margin-bottom: 25px;
}

.w200 {
  width: 200px;
}
</style>
