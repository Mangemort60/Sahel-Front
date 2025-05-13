import { Navigate, useLocation } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ReactNode, useEffect, useState } from 'react'
import { useAppSelector } from '../redux/hooks/useAppSelector'

interface PrivateRoutesProps {
  children: ReactNode
  blockIfPaymentCompleted?: boolean
  redirectIfPaymentCompletedToHome?: boolean
}

const PrivateRoutes = ({
  children,
  redirectIfPaymentCompletedToHome,
}: PrivateRoutesProps) => {
  const auth = getAuth()
  const [user, setUser] = useState(auth.currentUser)
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const paymentCompleted = useAppSelector(
    (state) => state.user.paymentCompleted,
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe() // Cleanup the listener on unmount
  }, [auth])

  if (loading) {
    // Vous pouvez ajouter un indicateur de chargement ici pendant que l'état de l'auth se charge
    return <div>Chargement...</div>
  }

  if (!user) {
    // Passe la page d'origine via `state`
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (redirectIfPaymentCompletedToHome && paymentCompleted) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default PrivateRoutes
