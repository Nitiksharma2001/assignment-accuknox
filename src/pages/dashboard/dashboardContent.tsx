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
          <div className='flex items-center gap-4 h-[200px] w-full overflow-x-scroll'>
            {category.widgets.map((widget) => (
              <div className='w-[400px] h-[90%] relative' key={widget.id}>
                <WidgetCard widget={widget} />
                <button
                  className='absolute right-2 top-2 text-red-400'
                  onClick={() => removeWidget(category.id, widget.id)}>
                  <RxCross2 />
                </button>
              </div>
            ))}
            <div
              className='w-[400px] h-[90%] shadow-xl rounded-2xl flex justify-center items-center bg-base-300'
              key={uuidv4()}>
              <div className='w-[400px] flex justify-center items-center'>
                <button
                  className='btn btn-info text-white'
                  onClick={() => updateCategoryId(category.id)}>
                  Add Widget
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
