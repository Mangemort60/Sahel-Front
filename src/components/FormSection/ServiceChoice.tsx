import { useDispatch } from 'react-redux'
import {
  resetFormState,
  setCurrentStep,
  setReservationType,
} from '../../redux/slices/formSlice'
import {
  resetUiState,
  setCurrentMultiStepForm,
} from '../../redux/slices/uiSlice'
import { useTranslation } from 'react-i18next'

export const ServiceChoice = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('form')
  const handleClick = (service: string) => {
    switch (service) {
      case 'ménage':
        dispatch(setReservationType('ménage'))
        dispatch(setCurrentStep('cleaningForm'))
        break
      case 'cuisine':
        dispatch(setReservationType('cuisine'))
        dispatch(setCurrentStep('cookingForm'))
        break
      case 'petits-travaux':
        dispatch(setReservationType('petits-travaux'))
        dispatch(setCurrentStep('worksInitialForm'))
        dispatch(setCurrentMultiStepForm(1))
        dispatch(resetUiState())
        break
      default:
        console.error('Service inconnu:', service)
    }
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-center h-full">
      <h1 className="text-secondaryDarkBlue text-2xl mb-4">
        {t('serviceChoice.title')}
      </h1>

      <div
        onClick={() => handleClick('ménage')}
        className="flex-col cursor-pointer space-y-2 w-full py-3 px-4 inline-flex text-black justify-center h-1/3 items-center gap-x-2 text-xl font-medium rounded-sm transition transform hover:scale-105 border border-gray-200 bg-white shadow-sm hover:bg-slate-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-black dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
      >
        <h2 className="text-2xl">{t('serviceChoice.cleaning.title')}</h2>
        <p className="italic text-base text-center">
          {t('serviceChoice.cleaning.subtitle')}
        </p>
      </div>

      <div
        onClick={() => handleClick('cuisine')}
        className="flex-col cursor-pointer space-y-2 w-full py-3 px-4 inline-flex justify-center h-1/3 items-center gap-x-2 text-xl font-medium rounded-sm transition transform hover:scale-105 border border-gray-200 bg-white text-black shadow-sm hover:bg-slate-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
      >
        <h2 className="text-2xl">{t('serviceChoice.cooking.title')}</h2>
        <p className="italic text-base text-center">
          {t('serviceChoice.cooking.subtitle')}
        </p>
      </div>

      <div
        onClick={() => handleClick('petits-travaux')}
        className="flex-col cursor-pointer space-y-2 w-full py-3 px-4 inline-flex justify-center h-1/3 items-center gap-x-2 text-xl font-medium rounded-sm text-black transition transform hover:scale-105 border border-gray-200 bg-white shadow-sm hover:bg-slate-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
      >
        <h2 className="text-2xl">{t('serviceChoice.smallRepairs.title')}</h2>
        <p className="italic text-base text-center">
          {t('serviceChoice.smallRepairs.subtitle')}
        </p>
      </div>
    </div>
  )
}
