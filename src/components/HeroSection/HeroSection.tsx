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
        className="h-2/3 sm:h-screen flex items-center p-8 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${homeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div>
          <h1 className="sm:text-7xl text-4xl font-bold sm:w-2/3">
            VOS VACANCES COMMENCENT SUR LE SEUIL DE LA PORTE.
          </h1>
          <p className="sm:text-4xl mt-8 text-1xl sm:w-2/3 mb-4 ">
            Profitez pleinement de votre séjour au Maroc sans les tracas du
            quotidien
          </p>
          <button
            className="py-3 px-4 inline-flex items-center w-48 justify-center gap-x-2  font-semibold rounded-sm border border-transparent text-white disabled:opacity-50 bg-secondaryDarkBlue disabled:pointer-events-none hover:bg-secondaryRegularBlue  "
            onClick={handleSubscribeClick}
          >
            Réserver mon ménage
          </button>
        </div>
      </div>
    </>
  )
}
