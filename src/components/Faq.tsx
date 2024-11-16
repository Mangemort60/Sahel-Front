import { useState } from 'react'
import question from '../assets/question.webp'
import { Link } from 'react-router-dom'

export const Faq = () => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null)

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index)
  }

  return (
    <div>
      <section className="py-10  sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-secondaryDarkBlue sm:text-5xl lg:text-5xl">
              F.A.Q
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
            </p>
          </div>
          <img src={question} alt="" className="w-1/2 m-auto sm:flex hidden" />

          <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
            {[
              {
                question:
                  'Je ne comprends pas le système de clés, comment allez vous accéder à mon logement ?',
                answer: (
                  <>
                    <p>
                      Chez Sahel, nous nous adaptons à vos préférences pour
                      garantir un accès sécurisé à votre logement. Nous
                      proposons plusieurs solutions flexibles afin que vous
                      puissiez choisir celle qui vous convient le mieux, tout en
                      assurant une tranquillité d'esprit totale.
                    </p>
                    <p className="mt-4">
                      Pour en savoir plus, consultez notre infographie
                      expliquant en détail le processus :
                      <Link
                        to="/comment-ca-marche"
                        className="text-blue-600 underline ml-1"
                      >
                        ici
                      </Link>
                      .
                    </p>
                  </>
                ),
              },
              {
                question: 'Qu’avez-vous prévu afin de prévenir les vols ?',
                answer: (
                  <>
                    <p>
                      Chez Sahel, l'intégrité de vos biens est une de nos
                      préoccupations majeures. Nos agents, notamment nos femmes
                      de ménage, sont formés et sensibilisés aux bonnes
                      pratiques de sécurité. Nous valorisons leur travail en les
                      rémunérant de manière juste, ce qui renforce leur
                      engagement et leur satisfaction professionnelle. Un
                      opérateur dédié est également disponible pour veiller au
                      bon déroulement des prestations, assurant ainsi une
                      tranquillité d'esprit totale pour vous.
                    </p>
                    <p className="mt-4">
                      <Link
                        to="/politique-de-prevention-vol"
                        className="text-blue-600 underline"
                      >
                        Consultez notre politique de prévention contre le vol
                      </Link>
                    </p>
                  </>
                ),
              },
              {
                question:
                  'Quelle assurance ai-je d’obtenir une prestation de qualité ?',
                answer:
                  'Cahier des charges et assurance du respect de celui-ci se situe au cœur de notre modèle. Nous offrons ce que nous promettons et nous assurons que chaque prestation est correctement exécutée. La formation constitue également un socle autour duquel nous basons notre approche.',
              },
              {
                question: 'Comment puis-je vous contacter en cas de soucis ?',
                answer:
                  'Une fois une prestation réservée, rendez vous dans votre espace client afin d’accéder à votre messagerie personnalisée et faire part de vos préoccupations si nécessaire.',
              },
              {
                question:
                  'Comment puis-je vous contacter si je n’ai pas réservé ?',
                answer:
                  'Rendez vous dans l’onglet contact afin d’accéder au formulaire de contact vous permettant de nous poser une question si aucune information n’est disponible sur le site.',
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
                  <span className="flex text-lg font-semibold text-secondaryDarkBlue">
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
                    <p className="text-secondaryLightBlue">{item.answer} </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 text-base mt-9">
            Vous n'avez pas de réponse à votre question ?{' '}
            <a
              href="#"
              title=""
              className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
            >
              Contactez notre support
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
