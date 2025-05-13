import {
  MdSupervisorAccount,
  MdTrackChanges,
  MdVisibility,
} from 'react-icons/md'

import {
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaClipboardList,
  FaEnvelopeOpenText,
  FaHome,
  FaKey,
  FaMoneyBillWave,
} from 'react-icons/fa'
import Solution from '../components/Solution'
import { useTranslation } from 'react-i18next'

const HowCleaningWorks = () => {
  const { t } = useTranslation('cleaning')

  return (
    <div className="m-2">
      <div className="mx-auto my-12 space-y-12 max-w-[775px]">
        <h1 className="text-sahelRegular font-bold text-md ">{t('title')}</h1>
        <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
          {t('headline')}
        </h1>
        <p>{t('intro')}</p>
        <Solution />
        <div className="space-y-12 mb-12 bg-gradient-to-t from-[#dce2e8] to-white p-8">
          <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
            {t('stepsTitle')}
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex items-center text-secondaryDarkBlue md:mr-8">
              <FaClipboardList className="text-[#183b56] text-6xl mr-4" />
            </div>
            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                {t('steps.quote.title')}
              </h3>
              <p className="text-gray-600">{t('steps.quote.text')}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex items-center text-secondaryDarkBlue md:mr-8">
              <FaCalendarAlt className="text-[#183b56] text-6xl mr-4" />
            </div>
            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                {t('steps.booking.title')}
              </h3>
              <p className="text-gray-600">{t('steps.booking.text')}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex items-center text-secondaryDarkBlue md:mr-8">
              <FaMoneyBillWave className="text-[#183b56] text-6xl mr-4" />
            </div>
            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                {t('steps.payment.title')}
              </h3>
              <p className="text-gray-600">{t('steps.payment.text')}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex items-center text-secondaryDarkBlue md:mr-8">
              <FaEnvelopeOpenText className="text-[#183b56] text-6xl mr-4" />
            </div>
            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                {t('steps.instructions.title')}
              </h3>
              <p className="text-gray-600">{t('steps.instructions.text')}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex items-center text-secondaryDarkBlue md:mr-8">
              <FaKey className="text-[#183b56] text-6xl mr-4" />
            </div>
            <div className="flex-1">
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-semibold text-secondaryLightBlue mb-2">
                    {t('steps.access.text.0')}
                  </h4>
                  <p className="text-gray-600">{t('steps.access.text.1')}</p>
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-secondaryLightBlue mb-2">
                    {t('steps.access.text.2')}
                  </h4>
                  <p className="text-gray-600">{t('steps.access.text.3')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex items-center text-secondaryDarkBlue md:mr-8">
              <FaHome className="text-[#183b56] text-6xl mr-4" />
            </div>
            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                {t('steps.completed.title')}
              </h3>
              <p className="text-gray-600">{t('steps.completed.text')}</p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
            {t('commitment.title')}
          </h1>
          <p>{t('commitment.text')}</p>
        </div>
      </div>
    </div>
  )
}

export default HowCleaningWorks
