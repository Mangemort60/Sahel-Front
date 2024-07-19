import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { RefObject } from 'react'

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />{' '}
      {/* Ici, Outlet rendra le composant correspondant à la route actuelle */}
      <Footer />
    </>
  )
}

export default MainLayout
