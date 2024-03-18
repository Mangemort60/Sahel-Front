import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useLocation } from 'react-router-dom'
import StripeCheckoutForm from './StripeCheckoutForm'
import { useAppSelector } from '../../redux/hooks'

interface stripePaymentProps {
  theme?: 'stripe' | 'night' | 'flat' // Use the allowed theme values
}

export const StripeCheckout = () => {
  const location = useLocation()
  const { clientSecret } = location.state || {}

  // const navigate = useNavigate()

  const hasCompletedPayment = useAppSelector(
    (state) => state.form.hasCompletedPayment,
  )

  console.log(hasCompletedPayment)

  // useEffect(() => {
  //   if (hasCompletedPayment) {
  //     navigate('/') // Assurez-vous que le chemin est correct
  //   }
  // }, [hasCompletedPayment, navigate])

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

  const appearance: stripePaymentProps = {
    theme: 'flat',
  }

  return (
    <div className="w-1/2 m-auto">
      <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
        <StripeCheckoutForm />
      </Elements>
    </div>
  )
}
