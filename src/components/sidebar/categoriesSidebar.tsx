import { useEffect, useState } from 'react'
import { CategoryType } from '../../types/category'

interface CategoriesSidebarProps {
  categories: CategoryType[]
  updateCheckedWidgets: (categoryId: string, updatedList: string[]) => void
}
export default function CategoriesSidebar({
  categories,
  updateCheckedWidgets,
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
    <>
      <div className='w-full'>
        <ul className='menu menu-horizontal bg-base-200 border-b-[1px] border-black w-full'>
          {categories.map((category) => (
            <li onClick={() => setCurrentCategoryId(category.id)} key={category.id}>
              <a>{category.category}</a>
            </li>
          ))}
        </ul>
        <ul className='menu' id={currentCategoryId}>
          {categories
            .find((category) => category.id === currentCategoryId)
            ?.widgets.map((widget) => (
              <li className='form-control' key={widget.id}>
                <label className='label cursor-pointer'>
                  <span className='label-text'>{widget.text}</span>
                  <input id={widget.id} type='checkbox' defaultChecked className='checkbox' />
                </label>
              </li>
            ))}
        </ul>
      </div>
      <button className='btn btn-accent' onClick={onConfirmHandler}>
        Confirm
      </button>
    </>
  )
}
