import { RefObject, useEffect } from 'react'
import { FormSection } from '../components/FormSection/FormSection'
import { HeroSection } from '../components/HeroSection/HeroSection'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'

interface SectionProps {
  formSectionRef: RefObject<HTMLDivElement>
}

const HomePage = ({ formSectionRef }: SectionProps) => {
  // Crée une référence pour le composant FormSectio
  const location = useLocation()

  const formStep = useAppSelector((state) => state.form.currentStep)

  useEffect(() => {
    // Vérifiez si l'URL contient un hash pour formSection
    if (
      location.hash === '#formSection' &&
      formSectionRef.current &&
      formStep !== 'form'
    ) {
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
