import { Route, Routes } from 'react-router-dom'
import { Content } from '../components/ClientDashboardSection.tsx/Content'
import { ReservationHistory } from '../components/ClientDashboardSection.tsx/ReservationHistory'
import { MyInfos } from '../components/ClientDashboardSection.tsx/MyInfos'
import NavbarDashboard from '../components/ClientDashboardSection.tsx/NavbarDashboard'

export const ClientDashboard = () => {
  return (
    <div className="m-auto w-2/3">
      <NavbarDashboard />
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Content />}>
          <Route index element={<ReservationHistory />} />
          <Route path="reservations" element={<ReservationHistory />} />
          <Route path="my-info" element={<MyInfos />} />
        </Route>
      </Routes>
    </div>
  )
}
