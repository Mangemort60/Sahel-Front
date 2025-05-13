import './App.css'
import './assets/css/main.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
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
import HowCleaningWorks from './pages/HowCleaningWorks'
import PrivateRoutes from './components/PrivateRoutes'
import { TheftPrevention } from './pages/TheftPrevention'
import HowCookingWorks from './pages/HowCookingWorks'
import HowPetitsTravauxWorks from './pages/HowPetitsTravauxWorks'

function App() {
  const formSectionRef: RefObject<HTMLDivElement> = useRef(null)

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/prevention" element={<TheftPrevention />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/menage" element={<HowCleaningWorks />} />
          <Route path="/cuisine" element={<HowCookingWorks />} />
          <Route path="/petits-travaux" element={<HowPetitsTravauxWorks />} />
          <Route
            path="/login"
            element={<LoginPage formSectionRef={formSectionRef} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />3
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Protected routes */}
          <Route
            path="/client-dashboard/*"
            element={
              <PrivateRoutes>
                <ClientDashboard />
              </PrivateRoutes>
            }
          />{' '}
          <Route
            path="/stripe-checkout-form"
            element={
              <PrivateRoutes redirectIfPaymentCompletedToHome>
                <StripeCheckout />
              </PrivateRoutes>
            }
          />
          <Route path="/payment-status" element={<PaymentStatus />} />
          <Route path="/step4" element={<Step4 />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
