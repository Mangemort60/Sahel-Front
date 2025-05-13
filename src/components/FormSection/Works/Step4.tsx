import { FaArrowLeft } from 'react-icons/fa'
import { useDispatch, UseDispatch } from 'react-redux'
import { resetFormState } from '../../../redux/slices/formSlice'
import { resetUiState } from '../../../redux/slices/uiSlice'
import { useTranslation } from 'react-i18next'

const Step4 = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('form')

  const handleClick = () => {
    dispatch(resetFormState())
    dispatch(resetUiState())
  }

  return (
    <div>
      <div>
        <button
          onClick={() => handleClick()}
          className="text-gray-400 mb-2 flex items-center gap-2"
        >
          <FaArrowLeft />
          <p>{t('common.back')}</p>
        </button>
      </div>
      <div>
        {t('smallRepairs.step4.success')} <br />
        {t('smallRepairs.step4.followup')}
      </div>
    </div>
  )
}

export default Step4
