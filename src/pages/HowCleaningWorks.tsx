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
                {t('specs.livingRoom.title')}
              </h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>{t('specs.livingRoom.point1')}</li>
                <li>{t('specs.livingRoom.point2')}</li>
                <li>{t('specs.livingRoom.point3')}</li>
                <li>{t('specs.livingRoom.point4')}</li>
                <li>{t('specs.livingRoom.point5')}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">
                {t('specs.kitchen.title')}
              </h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>{t('specs.kitchen.point1')}</li>
                <li>{t('specs.kitchen.point2')}</li>
                <li>{t('specs.kitchen.point3')}</li>
                <li>{t('specs.kitchen.point4')}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">
                {t('specs.bathroom.title')}
              </h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>{t('specs.bathroom.point1')}</li>
                <li>{t('specs.bathroom.point2')}</li>
                <li>{t('specs.bathroom.point3')}</li>
                <li>{t('specs.bathroom.point4')}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">
                {t('specs.bedroom.title')}
              </h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>{t('specs.bedroom.point1')}</li>
                <li>{t('specs.bedroom.point2')}</li>
                <li>{t('specs.bedroom.point3')}</li>
                <li>{t('specs.bedroom.point4')}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">
                {t('specs.extra.title')}
              </h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>{t('specs.extra.point1')}</li>
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
              <li>{t('specs.excluded.point7')}</li>
              <li>{t('specs.excluded.point8')}</li>
            </ul>

            <h4 className="text-xl font-semibold mt-4">
              {t('specs.conditionsTitle')}
            </h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>{t('specs.conditions.point1')}</li>
              <li>{t('specs.conditions.point2')}</li>
              <li>{t('specs.conditions.point3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowCleaningWorks
