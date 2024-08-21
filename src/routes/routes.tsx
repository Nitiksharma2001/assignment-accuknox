import { createBrowserRouter } from 'react-router-dom'
import Main from '../pages/dashboard/main'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
])
