import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'

const NavbarDashboard = () => {
  const selectedTab = useAppSelector((state) => state.ui.activeTab)

  return (
    <div>
      <div className="text-sm font-medium text-center text-black  border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <Link className="me-2" to={'/client-dashboard'}>
            <a
              href="#"
              className={`inline-block p-4 border-b-2 ${
                selectedTab === 'reservations'
                  ? 'border-gray-500 rounded-t-lg'
                  : 'border-transparent hover:border-gray-500 text-gray-500'
              }`}
            >
              Mes réservations
            </a>
          </Link>
          <Link className="me-2" to={'/client-dashboard/my-info'}>
            <a
              href="#"
              className={`inline-block p-4 border-b-2 ${
                selectedTab === 'my-info'
                  ? 'border-gray-500 rounded-t-lg'
                  : 'border-transparent hover:border-gray-500 text-gray-500'
              }`}
            >
              Mes infos
            </a>
          </Link>
          {/* <div className="me-2">
            <div
              className={`inline-block p-4 border-b-2 ${
                selectedTab === 'chatBox'
                  ? 'border-gray-500 rounded-t-lg'
                  : 'border-transparent hover:border-gray-500 text-gray-500'
              }`}
            >
              Messagerie
            </div>
          </div> */}
        </ul>
      </div>
    </div>
  )
}

export default NavbarDashboard
