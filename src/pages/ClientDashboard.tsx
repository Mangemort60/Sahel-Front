import { Route, Routes } from 'react-router-dom'
import { Content } from '../components/ClientDashboardSection.tsx/Content'
import { ReservationHistory } from '../components/ClientDashboardSection.tsx/ReservationHistory'
import NavbarDashboard from '../components/ClientDashboardSection.tsx/NavbarDashboard'
import ChatBox from '../components/ClientDashboardSection.tsx/ChatBox.tsx'
import Works from '../components/ClientDashboardSection.tsx/Works.tsx'

export const ClientDashboard = () => {
  return (
    <div className="m-4 sm:w-2/3 sm:m-auto space-y-4">
      <NavbarDashboard />

      <Routes>
        <Route path="/" element={<Content />}>
          <Route index element={<ReservationHistory />} />
          <Route path="reservations" element={<ReservationHistory />} />
          <Route path="chatBox/:id" element={<ChatBox />} />
          <Route path="works" element={<Works />} />
        </Route>
      </Routes>
    </div>
  )
}
