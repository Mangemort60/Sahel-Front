import './App.css'
import './assets/css/main.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import HowItWorks from './pages/HowItWorks'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SubscriptionPage from './pages/SubscriptionPage'
import { StripeCheckout } from './components/PaymentSection/StripeCheckout'
import { PaymentStatus } from './pages/PaymentStatus'
import { useAppSelector } from './redux/hooks'

function App() {
  const canAccessPayment = useAppSelector(
    (state) => state.form.hasCompletedPayment,
  )

  console.log(canAccessPayment)

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/subscribe" element={<SubscriptionPage />} />
          <Route
            path="/stripe-checkout-form"
            element={
              !canAccessPayment ? (
                <StripeCheckout />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/payment-status" element={<PaymentStatus />} />
        </Routes>
      </MainLayout>
    </>
  )
}

export default App
