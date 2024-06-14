import { Route, Routes } from 'react-router-dom'
import { Content } from '../components/ClientDashboardSection.tsx/Content'
import { ReservationHistory } from '../components/ClientDashboardSection.tsx/ReservationHistory'
import { MyInfos } from '../components/ClientDashboardSection.tsx/MyInfos'
import NavbarDashboard from '../components/ClientDashboardSection.tsx/NavbarDashboard'
import ChatBox from '../components/ClientDashboardSection.tsx/ChatBox.tsx'
import { useWindowSize } from '../redux/hooks.ts'
import { ReservationHistoryCardView } from '../components/ClientDashboardSection.tsx/ReservationHistoryCardView.tsx'

export const ClientDashboard = () => {
  const windowSize = useWindowSize()

  return (
    <div className={'m-4 sm:w-2/3 sm:m-auto'}>
      <NavbarDashboard />
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Content />}>
          <Route
            index
            element={
              windowSize.width > 640 ? (
                <ReservationHistory />
              ) : (
                <ReservationHistoryCardView />
              )
            }
          />
          <Route path="reservations" element={<ReservationHistory />} />
          <Route path="my-info" element={<MyInfos />} />
          <Route path="chatBox/:id" element={<ChatBox />} />
        </Route>
      </Routes>
    </div>
  )
}
