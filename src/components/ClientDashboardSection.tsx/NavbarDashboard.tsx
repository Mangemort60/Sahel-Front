import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks/useAppDispatch'
import { setActiveTab } from '../../redux/slices/uiSlice'
import { useAppSelector } from '../../redux/hooks/useAppSelector'

const NavbarDashboard = () => {
  const selectedTab = useAppSelector((state) => state.ui.activeTab)
  const dispatch = useAppDispatch()

  return (
    <div>
      <div className="text-sm font-medium text-center text-black mt-2 border-gray-200">
        <ul className="flex flex-wrap ">
          <Link
            className="me-2"
            to={'/client-dashboard'}
            onClick={() => dispatch(setActiveTab('ménage'))}
          >
            <div
              className={`inline-block p-4 border-b-2 text-2xl ${
                selectedTab === 'ménage'
                  ? 'border-gray-500 rounded-t-lg'
                  : 'border-transparent hover:border-gray-500 text-gray-500'
              }`}
            >
              Ménage
            </div>
          </Link>
          <Link
            className="me-2"
            to={'/client-dashboard'}
            onClick={() => dispatch(setActiveTab('cuisine'))}
          >
            <div
              className={`inline-block p-4 border-b-2 text-2xl ${
                selectedTab === 'cuisine'
                  ? 'border-gray-500 rounded-t-lg'
                  : 'border-transparent hover:border-gray-500 text-gray-500'
              }`}
            >
              Cuisine
            </div>
          </Link>
          <Link
            className="me-2 text-2xl"
            to={'/client-dashboard/works'}
            onClick={() => dispatch(setActiveTab('petits-travaux'))}
          >
            <div
              className={`inline-block p-4 border-b-2 ${
                selectedTab === 'works'
                  ? 'border-gray-500 rounded-t-lg'
                  : 'border-transparent hover:border-gray-500 text-gray-500'
              }`}
            >
              Petits travaux
            </div>
          </Link>
          {/* <Link
            className="me-2 text-2xl"
            to={'/client-dashboard/my-info'}
            onClick={() => dispatch(setActiveTab('my-info'))}
          >
            <div
              className={`inline-block p-4 border-b-2 ${
                selectedTab === 'my-info'
                  ? 'border-gray-500 rounded-t-lg'
                  : 'border-transparent hover:border-gray-500 text-gray-500'
              }`}
            >
              Mes infos
            </div>
          </Link> */}
        </ul>
      </div>
    </div>
  )
}

export default NavbarDashboard
