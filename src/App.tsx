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
import { StripeCheckout } from './components/PaymentSection/StripeCheckout'
import { PaymentStatus } from './pages/PaymentStatus'
import { useAppSelector } from './redux/hooks'
import { ClientDashboard } from './pages/ClientDashboard'

function App() {
  const canAccessPayment = useAppSelector(
    (state) => state.form.hasCompletedPayment,
  )

  console.log(canAccessPayment)

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/client-dashboard/*" element={<ClientDashboard />} />
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
        </Route>
      </Routes>
    </>
  )
}

export default App
