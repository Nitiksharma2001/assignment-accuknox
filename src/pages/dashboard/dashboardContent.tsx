import { v4 as uuidv4 } from 'uuid'
import { RxCross2 } from 'react-icons/rx'
import WidgetCard from '../../components/cards/widgetCard'
import { CategoryType, WidgetType } from '../../types/category'

interface DashboardContentProps {
  categories: CategoryType[]
  addWidget: (categoryId: string, widget: WidgetType) => void
  removeWidget: (categoryId: string, widgetId: string) => void
  updateCategoryId: (categoryId: string) => void
}

export default function DashboardContent({
  categories,
  removeWidget,
  updateCategoryId,
}: DashboardContentProps) {
  return (
    <>
      {categories.map((category) => (
        <div key={category.id}>
          <div className='text-2xl font-bold mb-4'>{category.category}</div>
          <div className='flex gap-2 h-[200px]'>
            {category.widgets.map((widget) => (
              <div className='relative w-[400px]' key={widget.id}>
                <WidgetCard widget={widget} />
                <button
                  className='absolute right-0 top-0'
                  onClick={() => removeWidget(category.id, widget.id)}>
                  <RxCross2 />
                </button>
              </div>
            ))}
            <div
              className='w-[400px] h-[200px] shadow-xl rounded-2xl flex justify-center items-center bg-base-300'
              key={uuidv4()}>
              <button className='btn' onClick={() => updateCategoryId(category.id)}>Add Widget</button>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
