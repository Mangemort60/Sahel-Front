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
import { ClientDashboard } from './pages/ClientDashboard'
import { RefObject, useEffect, useRef, useState } from 'react'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import { Toaster } from 'react-hot-toast'
import Step4 from './components/FormSection/Works/Step4'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

function App() {
  const formSectionRef: RefObject<HTMLDivElement> = useRef(null)

  const [user, setUser] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    // Écoute les changements d'état de connexion
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('Utilisateur connecté :', currentUser)
        setUser(currentUser)
      } else {
        console.log('Aucun utilisateur connecté')
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [auth])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/comment-ca-marche" element={<HowItWorks />} />
          <Route
            path="/login"
            element={<LoginPage formSectionRef={formSectionRef} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />3
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/client-dashboard/*" element={<ClientDashboard />} />
          <Route path="/stripe-checkout-form" element={<StripeCheckout />} />
          <Route path="/payment-status" element={<PaymentStatus />} />
          <Route path="/step4" element={<Step4 />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
