import valeur from '../assets/valeurs.webp'
import secure from '../assets/secure.png'
import quality from '../assets/quality.png'
import affordable from '../assets/affordable.png'
import ethical from '../assets/ethical.png'
import transparency from '../assets/transparency.png'
import handshake from '../assets/handshake.png'
import arrowRight from '../assets/arrowRight.png'
import lookingForward from '../assets/looking-forward.webp'
import { useTranslation } from 'react-i18next'

const AboutPage = () => {
  const { t } = useTranslation('about')

  return (
    <div className="font-sans sm:w-2/3 mx-2 sm:m-auto max-w-[900px]">
      <div className="my-12 space-y-5">
        <h1 className="text-start text-sahelRegular font-bold text-md ">
          {t('title')}
        </h1>
        <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
          {t('introHeadline')}
        </h1>
      </div>
      <div className="px-2 space-y-8">
        <p>{t('introText')}</p>
        <h2 className="text-4xl text-secondaryDarkBlue font-extrabold">
          {t('whySahel')}
        </h2>
        <p>{t('whySahelText')}</p>
        <blockquote className="relative top-2 mb-12">
          <svg
            className="absolute -top-6 sm:-left-8 w-16 h-16 text-sahelLight"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
              fill="currentColor"
            ></path>
          </svg>
          <div className="relative">
            <p className="text-xl text-secondaryLightBlue md:text-4xl md:leading-normal dark:text-white my-20">
              <em>{t('quote')}</em>
            </p>
          </div>
        </blockquote>
        <h2 className="text-4xl text-secondaryDarkBlue font-extrabold pt-8">
          {t('valuesTitle')}
        </h2>
        <p className="mb-20">{t('valuesText')}</p>
        <div className=" hidden sm:flex">
          <img src={valeur} alt="" className="" />
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="grid sm:grid-cols-2 sm:grid-rows-3 grid-cols-1 grid-rows-6 gap-4">
            {[
              'discretion',
              'quality',
              'transparency',
              'social',
              'affordable',
              'trust',
            ].map((key, i) => (
              <div key={key} className="w-auto">
                <img
                  src={
                    [
                      secure,
                      quality,
                      transparency,
                      ethical,
                      affordable,
                      handshake,
                    ][i]
                  }
                  alt=""
                  className="w-12 h-12 mb-2"
                />
                <p className="text-secondaryDarkBlue text-xl font-bold">
                  {t(`values.${key}.title`)}
                </p>
                <ul className="list-disc list-inside">
                  {t(`values.${key}.points`, { returnObjects: true }).map(
                    (point, idx) => (
                      <li key={idx}>{point}</li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <h2 className="text-4xl text-secondaryDarkBlue font-extrabold">
          {t('futureProjectsTitle')}
        </h2>
        <div className=" hidden sm:flex  max-w-[800px]">
          <img src={lookingForward} alt="" className="" />
        </div>
        <p className="mb-20">{t('futureProjectsText')}</p>
      </div>
      <div className=" p-10 mt-8">
        <div className="bg-gradient-to-br from-[#dac3a3] to-white p-6 rounded-sm text-secondaryDarkBlue  mb-6 mx-auto">
          <div className="mr-auto text-3xl font-semibold mb-4">2025</div>
          <h2 className="text-3xl font-semibold mb-6  text-center">
            {t('timeline.2025.title')}
          </h2>
          <p className="text-secondaryDarkBlue  mt-4">
            {t('timeline.2025.description')}
          </p>
        </div>
        <div className="flex justify-center mb-6">
          <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent  border-t-[#b6b2b0]"></div>
        </div>{' '}
        <div className="bg-gradient-to-br from-[#daaf9e] to-white p-6 rounded-sm text-secondaryDarkBlue  mb-6 mx-auto">
          <div className="mr-auto text-3xl font-semibold mb-4">2026 - 2030</div>
          <h2 className="text-3xl font-semibold mb-6 text-center">
            {t('timeline.2026_2030.title')}
          </h2>
          <div className="space-y-6 ">
            {['specialRequests', 'security', 'feedback'].map((key) => (
              <div key={key}>
                <h3 className="text-xl font-bold  ">
                  {t(`timeline.2026_2030.services.${key}.title`)}
                </h3>
                <p className="text-secondaryDarkBlue">
                  {t(`timeline.2026_2030.services.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
