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

export default HowPetitsTravauxWorks
