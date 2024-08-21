import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import DashboardContent from './dashboardContent'
import { useSearchParams } from 'react-router-dom'
import CategoriesSidebar from '../../components/sidebar/categoriesSidebar'
import { CategoryType } from '../../types/category'
import { CiSearch } from 'react-icons/ci'
import AddWidgetModal from '../../components/modal/addWidgetModal'
import JSONModal from '../../components/modal/jsonSchema'

interface SelectedCheckedWidgetsType {
  categoryId: string
  widgets: string[]
}
export default function Main() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState<CategoryType[]>([
    {
      id: uuidv4(),
      category: 'CSPM Executive Board',
      widgets: [
        {
          id: uuidv4(),
          text: 'Cloud Account',
          status: 'connected',
        },{
          id: uuidv4(),
          text: 'Cloud Account Risk Managment',
          status: 'connected',
        },
      ],
    },
    {
      id: uuidv4(),
      category: 'CWPP Dashboard',
      widgets: [
        {
          id: uuidv4(),
          text: 'Top 5 Namespace Specific Alert',
          status: 'connected',
        },
      ],
    },
    {
      id: uuidv4(),
      category: 'Risk Managment',
      widgets: [],
    },
    
  ])

  const [searchText, setSearchText] = useState(searchParams.get('searchText') || '')
  const [currentCategoryId, setCurrentCategoryId] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedCheckedWidgets, setSelectedCheckedWidgets] = useState<
    SelectedCheckedWidgetsType[]
  >([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const localCategories = localStorage.getItem('categories')
    if (localCategories) {
      setCategories(JSON.parse(localCategories) as CategoryType[])
    }
  }, [])

  useEffect(() => {
    setSearchParams('?searchText=' + searchText)
  }, [searchText, selectedCheckedWidgets])

  function toggleModal() {
    setIsModalOpen(!isModalOpen)
  }
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

  function updateCategories(schema: string) {
    setCategories(JSON.parse(schema) as CategoryType[])
    toggleModal()
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
      return {
        ...ctg,
        widgets: ctg.widgets.filter((widget) => widgetList?.widgets.includes(widget.id) ?? true),
      }
    })
  }

  return (
    <>
      <div className='flex gap-4 items-center py-4 px-4'>
        <DashboardHeader
          toggleSidebar={toggleSidebar}
          searchText={searchText}
          setSearchText={setSearchText}
          toggleModal={toggleModal}
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
        <div className='w-full flex justify-end h-screen fixed bg-opacity-50 bg-black top-0 z-50'>
          <CategoriesSidebar
            toggleSidebar={toggleSidebar}
            categories={categories}
            updateCheckedWidgets={updateCheckedWidgets}
          />
        </div>
      )}
      <AddWidgetModal
        categoryId={currentCategoryId}
        updateCategoryId={updateCategoryId}
        addWidget={addWidget}
      />
      <JSONModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        updateCategories={updateCategories}
      />
    </>
  )
}

function DashboardHeader({
  searchText,
  setSearchText,
  toggleSidebar,
  toggleModal,
}: {
  searchText: string
  setSearchText: React.Dispatch<React.SetStateAction<string>>
  toggleSidebar: () => void
  toggleModal: () => void
}) {
  return (
    <>
      <button className='btn btn-info text-white' onClick={toggleSidebar}>
        Add widget
      </button>
      <label className='input bg-blue-50 border-2 input-bordered flex items-center gap-2 w-1/3'>
        <input
          type='text'
          className='grow'
          placeholder='Search'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <CiSearch />
      </label>
      <button className='btn btn-info text-white' onClick={toggleModal}>
        Add JSON
      </button>
    </>
  )
}
