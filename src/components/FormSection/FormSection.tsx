import { useAppSelector } from '../../redux/hooks/useAppSelector'
import { BookingRequest } from './BookingRequest'
import { CleaningFormRequest } from './CleaningFormRequest'
import { CleaningQuoteReview } from './CleaningQuoteReview'
import imgForm from '../../assets/form.webp'
import React from 'react'
import { ServiceChoice } from './ServiceChoice'
import { CookingFormRequest } from './CookingFormRequest'
import { CookingQuoteReview } from './CookingQuoteReview'
import { WorksInitialForm } from './Works/WorksInitialForm'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export const FormSection = React.forwardRef((_, ref) => {
  const currentStep = useAppSelector((state) => state.form.currentStep)
  const { t } = useTranslation('home')

  // Variants pour les animations d'entrée et de sortie
  const variants = {
    enter: { opacity: 0, x: 30 }, // Animation d'entrée (ex. : décalage à droite)
    center: { opacity: 1, x: 0 }, // État au centre
    exit: { opacity: 0, x: -30 }, // Animation de sortie (ex. : décalage à gauche)
  }
  const renderStep = () => {
    switch (currentStep) {
      case 'serviceChoice':
        return <ServiceChoice />
      case 'cleaningForm':
        return <CleaningFormRequest />
      case 'cookingForm':
        return <CookingFormRequest />
      case 'cleaningReview':
        return <CleaningQuoteReview />
      case 'cookingReview':
        return <CookingQuoteReview />
      case 'worksInitialForm':
        return <WorksInitialForm />
      case 'booking':
        return <BookingRequest />
      default:
        return null
    }
  }

  return (
    <div ref={ref} id="formSection">
      <div className="sm:flex py-8 sm:flex-row flex-col sm:justify-center justify-between items-center p-4 text-white sm:bg-cover sm:bg-center sm:bg-[url('../../assets/layeredWaves.webp')] bg-none">
        <div className="sm:w-1/2 mt-20 mr-6">
          <h1 className="text-secondaryDarkBlue font-extrabold sm:text-5xl  text-3xl sm:mt-0 mt-8">
            {t('quote.title')}
          </h1>
          <p className="text-secondaryBlue my-4 text-lg">
            {t('quote.description')}
          </p>
          <img
            src={imgForm}
            alt=""
            className="w-full sm:w-full sm:mt-24 hidden sm:flex max-w-[900px]"
          />
        </div>

        <div className="bg-white w-full my-auto flex max-w-[460px] min-h-[750px] sm:px-8 py-6 px-2 sm:shadow-lg sm:rounded-sm">
          {/* AnimatePresence pour gérer les transitions d'entrée/sortie */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep} // Utilise currentStep comme clé pour déclencher l'animation
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants} // Variants pour l'animation
              transition={{ duration: 0.5 }} // Durée de l'animation
              style={{ width: '100%' }} // S'assure que la largeur reste cohérente
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
})
