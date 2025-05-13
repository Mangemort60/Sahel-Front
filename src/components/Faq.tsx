import React, { useState, ForwardedRef } from 'react'
import question from '../assets/question.webp'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Faq = React.forwardRef<HTMLDivElement>(
  (_, ref: ForwardedRef<HTMLDivElement>) => {
    const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(
      null,
    )

    const { t } = useTranslation('home')
    const toggleQuestion = (index: number) => {
      setOpenQuestionIndex(openQuestionIndex === index ? null : index)
    }

    return (
      <section ref={ref} className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-secondaryDarkBlue sm:text-5xl lg:text-5xl">
              F.A.Q
            </h2>
          </div>
          <img
            src={question}
            alt="Question"
            className="w-1/2 m-auto sm:flex hidden"
          />

          <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
            {[
              {
                question: t('faq.q1.question'),
                answer: (
                  <>
                    <p>{t('faq.q1.answer')}</p>
                    <p className="mt-4">
                      {t('faq.q1.cta').split('ici')[0]}
                      <Link
                        to="/menage"
                        className="text-blue-600 underline ml-1"
                      >
                        {t('faq.q1.cta').includes('ici') ? 'ici' : ''}
                      </Link>
                      .
                    </p>
                  </>
                ),
              },
              {
                question: t('faq.q2.question'),
                answer: (
                  <>
                    <p>{t('faq.q2.answer')}</p>
                    <p className="mt-4">
                      <Link
                        to="/prevention"
                        className="text-blue-600 underline"
                      >
                        {t('faq.q2.cta')}
                      </Link>
                    </p>
                  </>
                ),
              },
              {
                question: t('faq.q3.question'),
                answer: t('faq.q3.answer'),
              },
              {
                question: t('faq.q4.question'),
                answer: t('faq.q4.answer'),
              },
              {
                question: t('faq.q5.question'),
                answer: t('faq.q5.answer'),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="transition-all duration-200 bg-white border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() => toggleQuestion(index)}
                  className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                >
                  <span className="flex text-lg font-semibold text-secondaryDarkBlue text-left">
                    {item.question}
                  </span>

                  <svg
                    className={`w-6 h-6 text-gray-400 transform ${
                      openQuestionIndex === index ? 'rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {openQuestionIndex === index && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                    <p className="text-secondaryLightBlue">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 text-base mt-9">
            {t('faq.no_answer')}{' '}
            <Link
              to={'/contact'}
              title="Contactez notre support"
              className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
            >
              {t('faq.contact_support')}
            </Link>
          </p>
        </div>
      </section>
    )
  },
)
