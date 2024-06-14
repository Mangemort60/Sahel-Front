import { useEffect, useRef } from 'react'
import { FormSection } from '../components/FormSection/FormSection'
import { HeroSection } from '../components/HeroSection/HeroSection'
import { useLocation } from 'react-router-dom'

const HomePage = ({ formSectionRef }) => {
  // Crée une référence pour le composant FormSectio
  const location = useLocation()

  useEffect(() => {
    // Vérifiez si l'URL contient un hash pour formSection
    if (location.hash === '#formSection' && formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  return (
    <>
      <HeroSection formSectionRef={formSectionRef} />
      <FormSection ref={formSectionRef} />
    </>
  )
}

export default HomePage
