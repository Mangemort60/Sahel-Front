import simplicity from '../../assets/simplicity.jpg'
import reaction from '../../assets/rocket.webp'
import puzzle from '../../assets/puzzle.webp'
import reliable from '../../assets/Fiable.jpg'
import { useTranslation } from 'react-i18next'

const Guarantees = () => {
  const { t } = useTranslation('home')
  return (
    <div className="flex flex-col items-center space-y-12  m-auto p-12">
      <h2 className="text-4xl sm:text-6xl m-auto text-secondaryDarkBlue font-extrabold">
        {t('guarantees.title')}
      </h2>
      <div className="h-auto p-2 sm:flex flex-wrap justify-center sm:gap-8 space-y-8 sm:space-y-0">
        <div className="shadow-md rounded-sm flex flex-col items-center p-6  space-y-4 h-auto max-w-[300px] sm:w-1/3">
          <img src={simplicity} alt="" className="w-40" />
          <p className="text-2xl text-secondaryBlue">
            {' '}
            {t('guarantees.simple.title')}
          </p>
          <p className="text-sm  text-secondaryLightBlue">
            {t('guarantees.simple.description')}
          </p>
        </div>
        <div className="shadow-md rounded-sm flex flex-col items-center p-6  space-y-4 h-auto max-w-[300px] sm:w-1/3">
          <img src={reaction} alt="" className="w-40" />
          <p className="text-2xl text-secondaryBlue">
            {' '}
            {t('guarantees.reactive.title')}
          </p>
          <p className="text-sm  text-secondaryLightBlue">
            {t('guarantees.reactive.description')}
          </p>
        </div>

        <div className="shadow-md rounded-sm flex flex-col items-center p-6  space-y-4 h-auto max-w-[300px] sm:w-1/3">
          <img src={reliable} alt="" className="w-40" />
          <p className="text-2xl text-secondaryBlue">
            {' '}
            {t('guarantees.reliable.title')}
          </p>
          <p className="text-sm  text-secondaryLightBlue mt-a">
            {t('guarantees.reliable.description')}
          </p>
        </div>
        <div className="shadow-md rounded-sm flex flex-col items-center p-6  space-y-4 h-auto max-w-[300px] sm:w-1/3">
          <img src={puzzle} alt="" className="w-40" />
          <p className="text-2xl text-secondaryBlue">
            {t('guarantees.flexible.title')}
          </p>
          <p className="text-sm  text-secondaryLightBlue">
            {t('guarantees.reliable.description')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Guarantees
