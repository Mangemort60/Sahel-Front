import { Button } from '../common/Button'
import homeImage from '../../assets/homeImage.webp'
import { RefObject } from 'react'
import nettoyage from '../../assets/nettoyage.png'
import cuisine from '../../assets/chapeau-chef.png'

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
          <h1 className="sm:text-6xl text-3xl font-bold sm:w-2/3 mb-2 ">
            MÉNAGE.
            <br />
            CUISINE.
          </h1>
          <h2 className="sm:text-7xl text-4xl font-bold ">
            ZÉRO CORVÉES. <br />
            100% VACANCES.
          </h2>
          {/* <div className="flex space-x-6 my-4">
            <img src={nettoyage} alt="" className="w-14" />
            <img src={cuisine} alt="" className="w-14" />
          </div> */}
          <p className="sm:text-4xl mt-4 text-1xl sm:w-2/3 mb-4 ">
            Profitez pleinement de votre séjour au Maroc et libérez vous des
            tracas du quotidien
          </p>
          <button
            className="py-3 px-4 inline-flex items-center w-auto justify-center gap-x-2  font-semibold rounded-sm border border-transparent text-white disabled:opacity-50 bg-secondaryDarkBlue disabled:pointer-events-none hover:bg-secondaryRegularBlue  "
            onClick={handleSubscribeClick}
          >
            Réserver
          </button>
        </div>
      </div>
    </>
  )
}
