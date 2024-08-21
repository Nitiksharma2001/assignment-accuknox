import { useRef } from 'react'

interface AddWidgetModalProps {
  updateCategories: (schema: string) => void
  isModalOpen: boolean
  toggleModal: () => void
}
export default function JSONModal({
  updateCategories,
  isModalOpen,
  toggleModal,
}: AddWidgetModalProps) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  return (
    <>
      <dialog id='add_json_modal' className='modal' open={isModalOpen}>
        <div className='modal-box'>
          <div className='flex flex-col gap-4'>
            <h3 className='font-bold text-lg'>JSON Schema</h3>
            <div className='w-full flex flex-col gap-4'>
              <textarea
                ref={textAreaRef}
                className='textarea textarea-bordered'
                defaultValue={JSON.stringify(tempSchema)}
                placeholder='JSON Schema'></textarea>
            </div>
            <div className='flex gap-4 justify-end'>
              <button
                className='btn'
                onClick={() => updateCategories(textAreaRef.current?.value ?? '')}>
                Confirm
              </button>
              <button className='btn' onClick={toggleModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

const tempSchema = [
  {
    id: '07574cbf-31a3-491e-b88e-3fc49199b54f',
    category: 'category 1',
    widgets: [
      {
        id: '895c0070-f052-40f5-a57b-8c3505c094d8',
        text: 'widget 11',
        status: 'connceted',
      },
      {
        id: '665ce95e-a577-48ee-8402-386b02a2dc2d',
        status: 'asfdasf',
        text: 'asdfasfd',
      },
      {
        id: '46a8365d-4658-4f61-8bcb-6f576a38112a',
        status: 'asfdasf',
        text: 'asdfasfd',
      },
      {
        id: '05d2d8b8-a1bc-4d4f-b5a0-afef27263f24',
        status: 'asfdasf',
        text: 'asdfasfd',
      },
      {
        id: '1900a1cf-a3d7-41d8-b34e-687d3ace153b',
        status: 'asfdasf',
        text: 'asdfasfd',
      },
      {
        id: '4908e639-28d6-4c18-8523-18e195cb5ad9',
        status: 'asfdasf',
        text: 'asdfasfd',
      },
    ],
  },
  {
    id: '9ea36bf2-cbf2-4de8-95a5-63c4d153e681',
    category: 'category 2',
    widgets: [
      {
        id: '47dd35c8-7d71-4074-9716-b3c62bed3ae8',
        text: 'widget 21',
        status: 'connceted',
      },
      {
        id: '866a532f-8d0e-4dfc-8d54-75625cbbad8e',
        status: 'asfd',
        text: 'asdf',
      },
      {
        id: 'a1646179-510d-412c-a552-3658e733bb3c',
        status: 'asfdasf',
        text: 'asdfasfd',
      },
    ],
  },
]
