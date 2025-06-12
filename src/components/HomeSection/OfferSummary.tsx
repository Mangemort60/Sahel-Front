import React from 'react'
import CleaningImage from '../../assets/cleaningVector.jpg'
import CookingVector from '../../assets/cookingVector.png'
import repairVector from '../../assets/repairVector.png'

const OfferSummary = () => {
  return (
    <div className="flex flex-col sm:w-2/3 m-auto my-8 gap-4">
      <div className="flex flex-col sm:flex-row items-center">
        <img src={CleaningImage} alt="" className="sm:w-1/3 rounded-sm" />
        <div className="w-2/3 flex flex-col sm:px-8 justify-center gap-4">
          <h2 className="text-secondaryDarkBlue text-4xl">Ménage</h2>
          <p className="text-2xl text-secondaryBlue italic">
            Vous rentrez enfin ? On s’occupe de tout avant ou après que vous ne
            posiez vos valises. Nous préparons votre logement pour un retour
            serein : propre, aéré, impeccable. Réservation en ligne et devis
            instantané.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center ">
        <img src={CookingVector} alt="" className="sm:w-1/3 rounded-sm" />
        <div className="w-2/3 pl-8 sm:pr-16 flex flex-col justify-center gap-4">
          <h2 className="text-secondaryDarkBlue text-4xl">Cuisine</h2>
          <p className="text-2xl text-secondaryBlue italic">
            Envie de bien manger sans cuisiner ? Une cuisinière prépare chez
            vous des repas faits maison, adaptés à vos goûts et régimes. Idéal
            pour une semaine tranquille ou un dîner entre amis.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center ">
        <img src={repairVector} alt="" className="sm:w-1/3 rounded-sm" />
        <div className="w-2/3 flex flex-col sm:px-8 justify-center sm:gap-4">
          <h2 className="text-secondaryDarkBlue text-4xl">Petits travaux</h2>
          <p className="text-2xl text-secondaryBlue italic">
            Une étagère à fixer, un rideau à poser, un robinet qui goutte ou un
            meuble à monter ? Nos experts en petits travaux interviennent
            rapidement pour régler ces tracas du quotidien que l’on remet
            toujours à plus tard
          </p>
        </div>
      </div>
      <hr className="mt-8 w-1/2 m-auto" />
    </div>
  )
}

export default OfferSummary
