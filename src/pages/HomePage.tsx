import { useEffect, useRef } from 'react'
import { FormSection } from '../components/FormSection/FormSection'
import { HeroSection } from '../components/HomeSection/HeroSection'
import { useLocation } from 'react-router-dom'
import { Faq } from '../components/Faq'
import Guarantees from '../components/HomeSection/Guarantees'

const HomePage = () => {
  const formSectionRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollToForm && formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  useEffect(() => {
    // Vérifiez si l'URL contient un hash pour formSection
    if (location.hash === '#formSection' && formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  return (
    <>
      <HeroSection formSectionRef={formSectionRef} />
      <Guarantees />
      <FormSection ref={formSectionRef} />
      <Faq />
    </>
  )
}

export default HomePage
