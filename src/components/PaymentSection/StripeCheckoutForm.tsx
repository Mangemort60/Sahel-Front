import { PaymentElement } from '@stripe/react-stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useLocation } from 'react-router-dom'

export const StripeCheckoutForm = () => {
  const location = useLocation()
  const { clientSecret } = location.state || {}

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

  const handleSubmit = () => {}
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentElement />
      </Elements>
      <button id="submit"></button>
    </form>
  )
}
