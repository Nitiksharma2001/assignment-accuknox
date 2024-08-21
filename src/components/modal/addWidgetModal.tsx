import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface AddWidgetModalProps {
  categoryId: string
  addWidget: (
    categoryId: string,
    widget: {
      id: string
      text: string
      status: string
    },
  ) => void
  updateCategoryId: () => void
}
export default function AddWidgetModal({
  categoryId,
  addWidget,
  updateCategoryId,
}: AddWidgetModalProps) {
  const textRef = useRef<HTMLInputElement | null>(null)
  const statusRef = useRef<HTMLInputElement | null>(null)
  return (
    <>
      <dialog id='add_widget_modal' className='modal' open={categoryId !== ''}>
        <div className='modal-box'>
          <div className='flex flex-col gap-4'>
            <h3 className='font-bold text-lg'>Add Widget</h3>
            <div className='w-full flex flex-col gap-4'>
              <input
                type='text'
                className='input input-bordered w-full'
                ref={textRef}
                placeholder='Add Text...'
              />
              <input
                type='text'
                className='input input-bordered w-full'
                name='status'
                ref={statusRef}
                placeholder='Add Status...'
              />
            </div>
            <div className='flex gap-4 justify-end'>
              <button
                className='btn'
                onClick={() =>
                  addWidget(categoryId, {
                    id: uuidv4(),
                    status: statusRef.current?.value ?? '',
                    text: textRef.current?.value ?? '',
                  })
                }>
                Confirm
              </button>
              <button className='btn' onClick={() => updateCategoryId()}>
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
