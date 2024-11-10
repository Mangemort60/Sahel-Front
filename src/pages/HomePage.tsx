import { useEffect, useRef } from 'react'
import { FormSection } from '../components/FormSection/FormSection'
import { HeroSection } from '../components/HeroSection/HeroSection'
import { useLocation } from 'react-router-dom'
import Solution from '../components/Solution'
import { Faq } from '../components/Faq'

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
      <Solution />
      <FormSection ref={formSectionRef} />
      <Faq />
    </>
  )
}

export default HomePage
