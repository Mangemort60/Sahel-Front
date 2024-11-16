import simplicity from '../../assets/simplicity.jpg'
import reaction from '../../assets/rocket.webp'
import puzzle from '../../assets/puzzle.webp'
import reliable from '../../assets/Fiable.jpg'

const Guarantees = () => {
  return (
    <div className="flex flex-col items-center space-y-12  m-auto p-12">
      <h2 className="text-4xl sm:text-6xl m-auto text-secondaryDarkBlue font-extrabold">
        Les garanties du système Sahel
      </h2>
      <div className="h-auto p-2 sm:flex flex-wrap justify-center sm:gap-8 space-y-8 sm:space-y-0">
        <div className="shadow-md rounded-sm flex flex-col items-center p-6  space-y-4 h-auto max-w-[300px] sm:w-1/3">
          <img src={simplicity} alt="" className="w-40" />
          <p className="text-2xl text-secondaryBlue">Simple</p>
          <p className="text-sm  text-secondaryLightBlue">
            Planifiez vos réservations à partir d’un système de réservation
            pensé pour être le plus simple et rapide possible
          </p>
        </div>
        <div className="shadow-md rounded-sm flex flex-col items-center p-6  space-y-4 h-auto max-w-[300px] sm:w-1/3">
          <img src={reaction} alt="" className="w-40" />
          <p className="text-2xl text-secondaryBlue">Réactif</p>
          <p className="text-sm  text-secondaryLightBlue">
            Suivez en temps réel l'avancement de votre prestation. Une
            messagerie dédiée est disponible pour chacune de vos prestations,
            vous permettant de poser vos questions et de recevoir des réponses
            rapides. Avec Sahel, vous restez informé à chaque étape.{' '}
          </p>
        </div>

        <div className="shadow-md rounded-sm flex flex-col items-center p-6  space-y-4 h-auto max-w-[300px] sm:w-1/3">
          <img src={reliable} alt="" className="w-40" />
          <p className="text-2xl text-secondaryBlue">Fiable</p>
          <p className="text-sm  text-secondaryLightBlue mt-a">
            Confiez nous votre logement pendant quelques heures avec l’assurance
            d’une prestation de qualité qui repose sur un personnel fiable ainsi
            que sur un opérateur présent tout au long des processus
          </p>
        </div>
        <div className="shadow-md rounded-sm flex flex-col items-center p-6  space-y-4 h-auto max-w-[300px] sm:w-1/3">
          <img src={puzzle} alt="" className="w-40" />
          <p className="text-2xl text-secondaryBlue">Flexible</p>
          <p className="text-sm  text-secondaryLightBlue">
            Nous nous adaptons à vos contraintes en matière d’accès au logement
            et vous offrons la possibilité de réserver votre ménage du jour au
            lendemain
          </p>
        </div>
      </div>
    </div>
  )
}

export default Guarantees
