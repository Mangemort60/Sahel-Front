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

        <div className="space-y-12 mt-16">
          <h2 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold">
            {t('specs.title')}
          </h2>

          <p className="text-gray-600">{t('specs.intro')}</p>

          <div className="bg-white p-6 border-l-4 border-green-600 shadow-md space-y-4">
            <h3 className="text-2xl font-bold text-secondaryLightBlue">
              {t('specs.includedTitle')}
            </h3>

            <div>
              <h4 className="text-lg font-semibold">
                {t('specs.preparation.title')}
              </h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>{t('specs.preparation.point1')}</li>
                <li>{t('specs.preparation.point2')}</li>
                <li>{t('specs.preparation.point3')}</li>
                <li>{t('specs.preparation.point4')}</li>
                <li>{t('specs.preparation.point5')}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold">
                {t('specs.hygiene.title')}
              </h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>{t('specs.hygiene.point1')}</li>
                <li>{t('specs.hygiene.point2')}</li>
                <li>{t('specs.hygiene.point3')}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold">
                {t('specs.practical.title')}
              </h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>{t('specs.practical.point1')}</li>
                <li>{t('specs.practical.point2')}</li>
                <li>{t('specs.practical.point3')}</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 border-l-4 border-yellow-500 shadow-md space-y-4">
            <h3 className="text-2xl font-bold text-secondaryLightBlue">
              {t('specs.excludedTitle')}
            </h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>{t('specs.excluded.point1')}</li>
              <li>{t('specs.excluded.point2')}</li>
              <li>{t('specs.excluded.point3')}</li>
              <li>{t('specs.excluded.point4')}</li>
              <li>{t('specs.excluded.point5')}</li>
              <li>{t('specs.excluded.point6')}</li>
            </ul>

            <h4 className="text-xl font-semibold mt-4">
              {t('specs.conditionsTitle')}
            </h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>{t('specs.conditions.point1')}</li>
              <li>{t('specs.conditions.point2')}</li>
              <li>{t('specs.conditions.point3')}</li>
              <li>{t('specs.conditions.point4')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowCookingWorks
