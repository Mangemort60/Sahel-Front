import { FaArrowLeft } from 'react-icons/fa'
import { useDispatch, UseDispatch } from 'react-redux'
import { resetFormState } from '../../../redux/slices/formSlice'
import { resetUiState } from '../../../redux/slices/uiSlice'

const Step4 = () => {
  const dispatch = useDispatch()

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
          <p>Retour</p>
        </button>
      </div>
      <div>
        Votre pré-demande a bien été soumise ! <br />
        Vous pouvez d’ores et déjà suivre l'avancement de celle ci dans votre
        espace personnel ou refaire une demande
      </div>
    </div>
  )
}

export default Step4
