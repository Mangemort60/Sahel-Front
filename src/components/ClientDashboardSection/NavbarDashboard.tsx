import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks/useAppDispatch'
import { setActiveTab } from '../../redux/slices/uiSlice'
import { useAppSelector } from '../../redux/hooks/useAppSelector'
import { Badge } from '@mui/material'

const NavbarDashboard = () => {
  const selectedTab = useAppSelector((state) => state.ui.activeTab)
  const dispatch = useAppDispatch()

  const notifDetails = useAppSelector((state) => state.ui.notifDetails)

  const menageNotifications = notifDetails
    .filter((notification) => notification.reservationType === 'ménage')
    .reduce((total, notification) => total + notification.notificationCount, 0)

  const cuisineNotifications = notifDetails
    .filter((notification) => notification.reservationType === 'cuisine')
    .reduce((total, notification) => total + notification.notificationCount, 0)

  const petitsTravauxNotifications = notifDetails
    .filter((notification) => notification.reservationType === 'petits-travaux')
    .reduce((total, notification) => total + notification.notificationCount, 0)

  return (
    <div className="flex justify-center">
      <div className="text-sm font-medium text-center text-black mt-4 border-gray-200">
        <ul className="flex flex-wrap">
          <div className="relative me-2">
            <Badge
              badgeContent={menageNotifications}
              color="secondary"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              className="absolute bottom-6 left-full" // Position du badge
            />
            <Link
              to={'/client-dashboard'}
              onClick={() => dispatch(setActiveTab('ménage'))}
            >
              <div
                className={`inline-block p-4 border-b-2 font-bold text-2xl ${
                  selectedTab === 'ménage'
                    ? 'border-gray-500 rounded-t-lg'
                    : 'border-transparent hover:border-gray-500 text-gray-500'
                }`}
              >
                Ménage
              </div>
            </Link>
          </div>
          <div className="relative me-2">
            <Badge
              badgeContent={cuisineNotifications}
              color="secondary"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              className="absolute bottom-6 left-full"
            />
            <Link
              to={'/client-dashboard'}
              onClick={() => dispatch(setActiveTab('cuisine'))}
            >
              <div
                className={`inline-block p-4 border-b-2 font-bold text-2xl ${
                  selectedTab === 'cuisine'
                    ? 'border-gray-500 rounded-t-lg'
                    : 'border-transparent hover:border-gray-500 text-gray-500'
                }`}
              >
                Cuisine
              </div>
            </Link>
          </div>
          <div className="relative me-2">
            <Badge
              badgeContent={petitsTravauxNotifications}
              color="secondary"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              className="absolute bottom-6 left-full"
            />
            <Link
              to={'/client-dashboard/smallRepairs'}
              onClick={() => dispatch(setActiveTab('petits-travaux'))}
            >
              <div
                className={`inline-block p-4 border-b-2 font-bold text-2xl ${
                  selectedTab === 'petits-travaux'
                    ? 'border-gray-500 rounded-t-lg'
                    : 'border-transparent hover:border-gray-500 text-gray-500'
                }`}
              >
                Petits travaux
              </div>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default NavbarDashboard
