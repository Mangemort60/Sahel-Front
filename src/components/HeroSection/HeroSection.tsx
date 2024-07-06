import { Button } from '../common/Button'
import homeImage from '../../assets/homeImage.webp'
import { RefObject } from 'react'

interface SectionProps {
  formSectionRef: RefObject<HTMLDivElement>
}

export const HeroSection = ({ formSectionRef }: SectionProps) => {
  const handleSubscribeClick = () => {
    // Faire défiler la page jusqu'au FormSection
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div
        className="h-1/2 sm:h-screen flex items-center p-10 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${homeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div>
          <h1 className="sm:text-7xl text-3xl font-bold sm:w-2/3">
            VOS VACANCES COMMENCENT SUR LE SEUIL DE LA PORTE.
          </h1>
          <p className="sm:text-4xl mt-8 text-1xl sm:w-2/3">
            Profitez pleinement de votre séjour au Maroc sans les tracas du
            quotidien
          </p>
          <Button
            label={'Souscrire'}
            hoverColor={'hover:bg-secondaryLightBlue'}
            bgColor={'bg-secondaryRegularBlue'}
            onClick={handleSubscribeClick}
          />
        </div>
      </div>
    </>
  )
}
