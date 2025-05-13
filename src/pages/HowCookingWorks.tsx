import { FaClock, FaMoon, FaUtensils } from 'react-icons/fa'
import Solution from '../components/Solution'
import { useTranslation } from 'react-i18next'

const HowCookingWorks = () => {
  const { t } = useTranslation('cooking')

  return (
    <div className="m-2">
      <div className="mx-auto my-12 space-y-12 max-w-[775px]">
        <h1 className="text-sahelRegular font-bold text-md ">{t('title')}</h1>
        <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
          {t('headline')}
        </h1>
        <p className="text-lg">{t('intro')}</p>
        <div className="space-y-12 mb-12">
          <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
            {t('howItWorksTitle')}
          </h1>
          <p className="text-lg">{t('howItWorksIntro')}</p>
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#a5bda1] to-white p-6 rounded-sm flex items-center gap-x-3">
              <FaUtensils className="text-secondaryDarkBlue text-7xl" />
              <div>
                <h3 className="text-2xl font-bold text-secondaryDarkBlue mb-4">
                  {t('slots.lunch.title')}
                </h3>
                <p className="text-gray-600 text-lg">{t('slots.lunch.text')}</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#a59caf] to-white p-6 rounded-sm flex items-center gap-x-3">
              <FaMoon className="text-secondaryDarkBlue text-7xl" />
              <div>
                <h3 className="text-2xl font-bold text-secondaryDarkBlue mb-4">
                  {t('slots.dinner.title')}
                </h3>
                <p className="text-gray-600 text-lg">
                  {t('slots.dinner.text')}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#a5b5bd] to-white p-6 rounded-sm flex items-center gap-x-3">
              <FaClock className="text-secondaryDarkBlue text-7xl" />
              <div>
                <h3 className="text-2xl font-bold text-secondaryDarkBlue mb-4">
                  {t('slots.fullDay.title')}
                </h3>
                <p className="text-gray-600 text-lg">
                  {t('slots.fullDay.text')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
            {t('commitment.title')}
          </h1>
          <p className="text-lg">{t('commitment.text')}</p>
        </div>
      </div>
    </div>
  )
}

export default HowCookingWorks
