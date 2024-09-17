import { motion, AnimatePresence } from 'framer-motion'
import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'
import { useDispatch } from 'react-redux'
import { FaArrowLeft } from 'react-icons/fa'
import { setCurrentStep } from '../../../redux/slices/formSlice'
import Step4 from './Step4'
import { useAppSelector } from '../../../redux/hooks'
import { Button } from '../../common/Button'
import { useNavigate } from 'react-router-dom'
import {
  setCurrentMultiStepForm,
  setRedirectPath,
} from '../../../redux/slices/uiSlice'

// Exemple d'animation de transition
const variants = {
  enter: { opacity: 0, x: 30 }, // Animation d'entrée (ex. : décalage à droite)
  center: { opacity: 1, x: 0 }, // État au centre
  exit: { opacity: 0, x: -30 }, // Animation de sortie (ex. : décalage à gauche)
}

type WorkCategory =
  | 'éléctricité'
  | 'plomberie'
  | 'maçonnerie'
  | 'peinture'
  | 'autre'

// Type des données du formulaire
export type FormData = {
  name: string
  firstname: string
  phoneNumber: string
  email: string
  address: string
  city: string
  postalCode: string
  workCategory: WorkCategory[]
  workDescription: string
  urgency: string
}

export const WorksInitialForm = () => {
  const { formData } = useAppSelector((state) => state.form)

  const dispatch = useDispatch()
  const currentMultiStepForm = useAppSelector(
    (state) => state.ui.currentMultiStepForm,
  )
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
  const navigate = useNavigate()

  console.log(formData)

  const nextStep = () =>
    dispatch(setCurrentMultiStepForm(currentMultiStepForm + 1))
  const prevStep = () => {
    if (currentMultiStepForm === 1) {
      // Si on est à la première étape, on met à jour le currentStep dans Redux
      dispatch(setCurrentStep('serviceChoice'))
    } else {
      // Sinon, on décrémente l'étape locale
      dispatch(setCurrentMultiStepForm(currentMultiStepForm - 1))
    }
  }
  return (
    <div className="text-black font-black w-full flex h-full flex-col gap-4 justify-between">
      {currentMultiStepForm && !isLoggedIn && (
        <div>
          <button
            onClick={() => prevStep()}
            className="text-gray-400 mb-2 flex items-center gap-2"
          >
            <FaArrowLeft />
            <p>Retour</p>
          </button>
        </div>
      )}
      <h2 className="text-2xl">Formulaire de pré-demande</h2>

      {/* AnimatePresence pour gérer les animations d'entrée et de sortie */}
      <AnimatePresence mode="wait">
        {currentMultiStepForm === 1 && (
          <motion.div
            key="step1"
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }} // Durée de l'animation
            style={{ height: '100%' }}
            className="h-full"
          >
            <Step2
              prevStep={prevStep}
              nextStep={nextStep}
              formData={formData}
            />
          </motion.div>
        )}

        {currentMultiStepForm === 2 && (
          <motion.div
            key="step2"
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            style={{ height: '100%' }}
            className="h-full"
          >
            <Step3 nextStep={nextStep} formData={formData} />
          </motion.div>
        )}

        {currentMultiStepForm === 3 && (
          <motion.div
            key="step4"
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            style={{ height: '100%' }}
            className="h-full"
          >
            {isLoggedIn ? (
              <Step4 />
            ) : (
              <div className="flex flex-col items-center gap-2 justify-center h-full text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Vous y êtes presque !
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Pour finaliser votre demande, connectez-vous à votre compte.
                  Si vous n'avez pas encore de compte, il est rapide et facile
                  d'en créer un !
                </p>
                <Button
                  type="submit"
                  label={'Se connecter'}
                  hoverColor={'hover:bg-secondaryRegularBlue'}
                  bgColor={'bg-secondaryLightBlue'}
                  onClick={() => {
                    dispatch(setRedirectPath('/step4'))
                    navigate('/login')
                  }}
                  largeButton={true}
                  textColor="text-white"
                />{' '}
                <Button
                  type="submit"
                  label={"S'inscrire"}
                  hoverColor={'hover:bg-gray-200'}
                  bgColor={'bg-white'}
                  onClick={() => {
                    dispatch(setRedirectPath('/step4'))
                    navigate('/register')
                  }}
                  largeButton={true}
                  textColor="text-black"
                />{' '}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
