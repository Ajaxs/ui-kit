export interface SelectItem {
  value: string
  label: string
  disabled?: boolean
  [key: string]: string | number | boolean | undefined
}

export type ModelValue = string | string[]

export interface Props {
  items: SelectItem[]
  modelValue: ModelValue
  name?: string
  searchPlaceholder?: string
  emptyPlaceholder?: string
  multiple?: boolean
  filterable?: boolean
  clearable?: boolean
  disabled?: boolean
  chips?: boolean
  textValue?: string
  textLabel?: string
}
