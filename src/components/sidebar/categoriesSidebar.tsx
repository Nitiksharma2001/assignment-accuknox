import { useEffect, useState } from 'react'
import { CategoryType } from '../../types/category'

interface CategoriesSidebarProps {
  categories: CategoryType[]
  updateCheckedWidgets: (categoryId: string, updatedList: string[]) => void
  toggleSidebar: () => void
}
export default function CategoriesSidebar({
  categories,
  updateCheckedWidgets,
  toggleSidebar,
}: CategoriesSidebarProps) {
  const [currentCategoryId, setCurrentCategoryId] = useState('')
  useEffect(() => {
    setCurrentCategoryId(categories[0].id)
  }, [categories])

  function onConfirmHandler() {
    const category = document.getElementById(currentCategoryId)
    if (category) {
      const widgets = category.querySelectorAll('input:checked')
      updateCheckedWidgets(
        currentCategoryId,
        Array.from(widgets).map((widget) => widget.id),
      )
    }
  }
  return (
    <div className='h-full p-2 flex flex-col justify-between items-end w-[300px] bg-base-200'>
      <div className='w-full'>
        <ul className='flex gap-2 bg-base-200 border-b-[1px] border-black w-full overflow-x-scroll'>
          {categories.map((category) => (
            <li
              className='btn text-nowrap font-normal'
              onClick={() => setCurrentCategoryId(category.id)}
              key={category.id}>
              {category.category}
            </li>
          ))}
        </ul>
        <div id={currentCategoryId}>
          {categories
            .find((category) => category.id === currentCategoryId)
            ?.widgets.map((widget) => (
              <div className='btn font-normal flex justify-between' key={widget.id}>
                <label htmlFor={widget.id}>{widget.text}</label>
                <input id={widget.id} type='checkbox' defaultChecked className='checkbox' />
              </div>
            ))}
        </div>
      </div>
      <div className='flex gap-4'>
        <button className='btn btn-accent' onClick={onConfirmHandler}>
          Confirm
        </button>
        <button className='btn bg-base-300' onClick={toggleSidebar}>
          Close
        </button>
      </div>
    </div>
  )
}
