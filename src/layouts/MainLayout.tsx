import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const MainLayout: React.FC = () => (
  <>
    <Header />
    <Outlet />{' '}
    {/* Ici, Outlet rendra le composant correspondant à la route actuelle */}
    <Footer />
  </>
)

export default MainLayout
