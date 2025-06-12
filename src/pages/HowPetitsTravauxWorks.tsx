import {
  FaClipboardList,
  FaCheckCircle,
  FaMoneyBillWave,
  FaKey,
  FaTools,
  FaHome,
  FaFileInvoice,
  FaHammer,
} from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const HowPetitsTravauxWorks = () => {
  const { t } = useTranslation('repairs')

  return (
    <div className="m-2">
      <div className="mx-auto my-12 space-y-12 max-w-[775px]">
        <h1 className="text-sahelRegular font-bold text-md ">{t('title')}</h1>
        <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
          {t('headline')}
        </h1>
        <p className="text-gray-600 text-lg mb-6">{t('intro')}</p>
        <div className="bg-gray-50 p-6 rounded-md">
          <h3 className="text-2xl font-semibold text-secondaryDarkBlue mb-4">
            {t('personalSpace.title')}
          </h3>
          <p className="text-gray-600 mb-4 text-lg">
            {t('personalSpace.description')}
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 text-lg">
            {t('personalSpace.points', { returnObjects: true }).map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
        <hr />
        <div className="space-y-12 mb-12 bg-gradient-to-t from-[#dce2e8] to-white p-8">
          <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
            {t('stepsTitle')}
          </h1>

          {[
            'preRequest',
            'validation',
            'payment',
            'keyReception',
            'technicalVisit',
            'quote',
            'execution',
            'completion',
          ].map((step, index) => (
            <div
              key={step}
              className="flex flex-col md:flex-row items-start md:items-center"
            >
              {[
                FaClipboardList,
                FaCheckCircle,
                FaMoneyBillWave,
                FaKey,
                FaTools,
                FaFileInvoice,
                FaHammer,
                FaHome,
              ][index]({ className: 'text-[#183b56] text-6xl mr-4' })}
              <div className="flex-1">
                <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                  {t(`steps.${step}.title`)}
                </h3>
                <p className="text-gray-600">{t(`steps.${step}.text`)}</p>
              </div>
            </div>
          ))}
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
                {t('specs.types.title')}
              </h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>{t('specs.types.point1')}</li>
                <li>{t('specs.types.point2')}</li>
                <li>{t('specs.types.point3')}</li>
                <li>{t('specs.types.point4')}</li>
                <li>{t('specs.types.point5')}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold">
                {t('specs.process.title')}
              </h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>{t('specs.process.step1')}</li>
                <li>{t('specs.process.step2')}</li>
                <li>{t('specs.process.step3')}</li>
                <li>{t('specs.process.step4')}</li>
                <li>{t('specs.process.step5')}</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 border-l-4 border-yellow-500 shadow-md space-y-4">
            <h3 className="text-2xl font-bold text-secondaryLightBlue">
              {t('specs.excludedTitle')}
            </h3>

            <div>
              <h4 className="text-lg font-semibold">
                {t('specs.limits.title')}
              </h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>{t('specs.limits.point1')}</li>
                <li>{t('specs.limits.point2')}</li>
                <li>{t('specs.limits.point3')}</li>
                <li>{t('specs.limits.point4')}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold">
                {t('specs.extra.title')}
              </h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>{t('specs.extra.point1')}</li>
                <li>{t('specs.extra.point2')}</li>
                <li>{t('specs.extra.point3')}</li>
              </ul>
            </div>

            <div>
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
    </div>
  )
}

export default HowPetitsTravauxWorks
