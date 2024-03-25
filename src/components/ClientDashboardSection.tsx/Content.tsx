import { Outlet } from 'react-router-dom'

export const Content = () => {
  return (
    <div className="sm:ml-[275px]">
      <Outlet />
    </div>
  )
}
