import { Route, Routes } from 'react-router-dom'
import { Content } from '../components/ClientDashboardSection.tsx/Content'
import { ReservationHistory } from '../components/ClientDashboardSection.tsx/ReservationHistory'
import { Sidebar } from '../components/ClientDashboardSection.tsx/Sidebar'
import { MyInfos } from '../components/ClientDashboardSection.tsx/MyInfos'
import { ReservationOverview } from '../components/ClientDashboardSection.tsx/ReservationOverview'

export const ClientDashboard = () => {
  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Content />}>
          <Route index element={<ReservationHistory />} />
          <Route path="reservations" element={<ReservationHistory />} />
          <Route path="overview" element={<ReservationOverview />} />
          <Route path="my-info" element={<MyInfos />} />
        </Route>
      </Routes>
    </div>
  )
}
