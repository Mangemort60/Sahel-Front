import { useEffect, useRef } from 'react'
import { FormSection } from '../components/FormSection/FormSection'
import { HeroSection } from '../components/HomeSection/HeroSection'
import { useLocation } from 'react-router-dom'
import { Faq } from '../components/Faq'
import Guarantees from '../components/HomeSection/Guarantees'
import OfferSummary from '../components/HomeSection/OfferSummary'

const HomePage = () => {
  const formSectionRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    // Scrolling vers formSection si scrollToForm est défini
    if (location.state?.scrollToForm && formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    if (location.state?.scrollToFaq && faqRef.current) {
      setTimeout(() => {
        faqRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100) // Délai pour assurer que le DOM est prêt
    }
  }, [location])

  return (
    <>
      <HeroSection formSectionRef={formSectionRef} />
      <OfferSummary />
      <Guarantees />
      <FormSection id="formSection" ref={formSectionRef} />
      <Faq ref={faqRef} />
    </>
  )
}

export default HomePage
