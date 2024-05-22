import { useState } from 'react'
import { Link } from 'react-router-dom'

const NavbarDashboard = () => {
  const [isActive, setIsActive] = useState('reservations')

  const handleClick = (tab: string) => {
    setIsActive(tab)
  }

  return (
    <div>
      <div className="text-sm font-medium text-center text-black  border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <Link className="me-2" to={'/client-dashboard/reservations'}>
            <a
              href="#"
              className={`inline-block p-4 border-b-2 ${
                isActive === 'reservations'
                  ? 'border-gray-500 rounded-t-lg'
                  : 'border-transparent hover:border-gray-500 text-gray-500'
              }`}
              onClick={() => handleClick('reservations')}
            >
              Mes réservations
            </a>
          </Link>
          <Link className="me-2" to={'/client-dashboard/my-info'}>
            <a
              href="#"
              className={`inline-block p-4 border-b-2 ${
                isActive === 'my-info'
                  ? 'border-gray-500 rounded-t-lg'
                  : 'border-transparent hover:border-gray-500 text-gray-500'
              }`}
              onClick={() => handleClick('my-info')}
            >
              Mes infos
            </a>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default NavbarDashboard
