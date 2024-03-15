import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useLocation } from 'react-router-dom'
import StripeCheckoutForm from './StripeCheckoutForm'

interface stripePaymentProps {
  theme?: 'stripe' | 'night' | 'flat' // Use the allowed theme values
}

export const StripeCheckout = () => {
  const location = useLocation()
  const { clientSecret } = location.state || {}

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
