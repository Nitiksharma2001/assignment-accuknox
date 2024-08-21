import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import DashboardContent from './dashboardContent'
import { useSearchParams } from 'react-router-dom'
import CategoriesSidebar from '../../components/sidebar/categoriesSidebar'
import { CategoryType } from '../../types/category'
import { CiSearch } from 'react-icons/ci'
import AddWidgetModal from '../../components/modal/addWidgetModal'

interface SelectedCheckedWidgetsType {
  categoryId: string
  widgets: string[]
}
export default function Main() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState<CategoryType[]>([
    {
      id: uuidv4(),
      category: 'category 1',
      widgets: [
        {
          id: uuidv4(),
          text: 'widget 11',
          status: 'connceted',
        },
      ],
    },
    {
      id: uuidv4(),
      category: 'category 2',
      widgets: [
        {
          id: uuidv4(),
          text: 'widget 21',
          status: 'connceted',
        },
      ],
    },
  ])

  const [searchText, setSearchText] = useState(searchParams.get('searchText') || '')
  const [currentCategoryId, setCurrentCategoryId] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedCheckedWidgets, setSelectedCheckedWidgets] = useState<
    SelectedCheckedWidgetsType[]
  >([])

  useEffect(() => {
    const localCategories = localStorage.getItem('categories')
    if (localCategories) {
      setCategories(JSON.parse(localCategories) as CategoryType[])
    }
  }, [])

  useEffect(() => {
    setSearchParams('?searchText=' + searchText)
  }, [searchText, selectedCheckedWidgets])

  function updateCheckedWidgets(categoryId: string, updatedList: string[]) {
    const newList = [...selectedCheckedWidgets]
    const isExists = newList.find((slw) => slw.categoryId === categoryId)
    if (isExists) {
      isExists.widgets = updatedList
    } else {
      newList.push({ categoryId, widgets: updatedList })
    }
    setSelectedCheckedWidgets(newList)
  }
  function updateCategoryId(categoryId = '') {
    setCurrentCategoryId(categoryId)
  }
  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const addWidget = (
    categoryId: string,
    widget: {
      id: string
      text: string
      status: string
    },
  ) => {
    if (!categoryId || !widget.text || !widget.status) return
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) return { ...category, widgets: [...category.widgets, widget] }
      return category
    })
    localStorage.setItem('categories', JSON.stringify(updatedCategories))
    setCategories(updatedCategories)
    updateCategoryId()
  }
  const removeWidget = (categoryId: string, widgetId: string) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId)
        return { ...category, widgets: category.widgets.filter((widget) => widget.id !== widgetId) }
      return category
    })
    localStorage.setItem('categories', JSON.stringify(updatedCategories))
    setCategories(updatedCategories)
  }

  const filterCategories = () => {
    const updatedCategories = categories.map((category) => {
      return {
        ...category,
        widgets: category.widgets.filter((widget) => widget.text.includes(searchText)),
      }
    })

    return updatedCategories.map((ctg) => {
      const widgetList = selectedCheckedWidgets.find((category) => ctg.id === category.categoryId)
      return {...ctg, widgets: ctg.widgets.filter(widget => widgetList?.widgets.includes(widget.id) ?? true)}
    })
  }

  return (
    <>
      <div className='flex justify-end gap-4 items-center py-4 px-4'>
        <DashboardHeader
          toggleSidebar={toggleSidebar}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </div>
      <div className='px-10 flex flex-col gap-4'>
        <DashboardContent
          categories={filterCategories()}
          addWidget={addWidget}
          removeWidget={removeWidget}
          updateCategoryId={updateCategoryId}
        />
      </div>
      {isSidebarOpen && (
        <div className='h-full p-2 flex flex-col justify-between items-end absolute right-0 top-0 w-1/4 bg-base-200'>
          <CategoriesSidebar categories={categories} updateCheckedWidgets={updateCheckedWidgets} />
        </div>
      )}
      <AddWidgetModal
        categoryId={currentCategoryId}
        updateCategoryId={updateCategoryId}
        addWidget={addWidget}
      />
    </>
  )
}

function DashboardHeader({
  searchText,
  setSearchText,
  toggleSidebar,
}: {
  searchText: string
  setSearchText: React.Dispatch<React.SetStateAction<string>>
  toggleSidebar: () => void
}) {
  return (
    <>
      <button className='btn' onClick={toggleSidebar}>
        Add widget
      </button>
      <label className='input input-bordered flex items-center gap-2 w-1/3'>
        <input
          type='text'
          className='grow'
          placeholder='Search'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <CiSearch />
      </label>
    </>
  )
}
