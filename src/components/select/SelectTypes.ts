export interface SelectItem {
  value: string
  label: string
  disabled?: boolean
}

export type ModelValue = string | string[]

export interface Props {
  items: SelectItem[]
  modelValue: ModelValue
  name?: string
  placeholder?: string
  multiple?: boolean
  filterable?: boolean
  clearable?: boolean
  disabled?: boolean
  chips?: boolean
}
