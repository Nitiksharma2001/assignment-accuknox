export interface CategoryType {
  id: string
  category: string
  widgets: WidgetType[]
}
export interface WidgetType {
  id: string
  text: string
  status: string
}
