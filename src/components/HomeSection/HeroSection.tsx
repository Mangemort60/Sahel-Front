import homeImage from '../../assets/homeImage.webp'
import { RefObject } from 'react'
import { useDispatch } from 'react-redux'
import { resetFormState } from '../../redux/slices/formSlice'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

interface SectionProps {
  formSectionRef: RefObject<HTMLDivElement>
}

export const HeroSection = ({ formSectionRef }: SectionProps) => {
  const { t } = useTranslation('home')
  const dispatch = useDispatch()
  const handleSubscribeClick = () => {
    // Faire défiler la page jusqu'au FormSection
    dispatch(resetFormState())
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Helmet>
        <link rel="preload" href={homeImage} as="image" />
      </Helmet>
      <div
        className="h-2/3 sm:h-screen flex items-center p-8 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${homeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div>
          <h1 className="sm:text-6xl text-3xl font-bold sm:w-2/3 mb-2 ">
            {t('hero.line1')}
            <br />
            {t('hero.line2')}
            <br />
            {t('hero.line3')}
          </h1>
          <h2 className="sm:text-7xl text-4xl font-bold ">
            {t('hero.line4')} <br />
            {t('hero.line5')}
          </h2>
          {/* <div className="flex space-x-6 my-4">
            <img src={nettoyage} alt="" className="w-14" />
            <img src={cuisine} alt="" className="w-14" />
          </div> */}
          <p className="sm:text-4xl mt-4 text-1xl sm:w-2/3 mb-4 ">
            {t('hero.subtitle')}
          </p>
          <button
            className="py-3 px-4 inline-flex items-center w-auto justify-center gap-x-2  font-semibold rounded-sm border border-transparent text-white disabled:opacity-50 bg-secondaryDarkBlue disabled:pointer-events-none hover:bg-secondaryRegularBlue  "
            onClick={handleSubscribeClick}
          >
            {t('hero.cta')}
          </button>
        </div>
      </div>
    </>
  )
}
