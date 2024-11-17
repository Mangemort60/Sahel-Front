import React from 'react'

const HowPetitsTravauxWorks = () => {
  return (
    <div className="m-2">
      <div className="mx-auto my-12 space-y-12 max-w-[775px]">
        <h1 className="text-sahelRegular font-bold text-md ">Cuisine</h1>
        <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
          Un service de petits travaux pensé pour faciliter l’entretien de votre
          logement hors période estivale
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Réservez facilement votre service de petits travaux, et laissez notre
          équipe évaluer vos besoins, organiser et coordonner toutes les étapes
          nécessaires à leur réalisation.
          <strong>
            Nous veillons à chaque détail, de l’évaluation initiale à la
            finalisation des travaux, pour vous garantir une gestion fluide et
            efficace.
          </strong>
        </p>
        <div className="bg-gray-100 p-6 rounded-md">
          <h3 className="text-2xl font-semibold text-secondaryDarkBlue mb-4">
            Votre espace personnel dédié
          </h3>
          <p className="text-gray-600 mb-4 text-lg">
            Un chat est disponible depuis votre espace personnel afin de
            structurer l’ensemble des échanges nécessaires :
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 text-lg">
            <li>Notre compréhension de vos travaux</li>
            <li>Votre suivi des travaux en cours</li>
            <li>La bonne conduite du projet</li>
          </ul>
        </div>
        <div className="space-y-12 mb-12">
          <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
            Comment ça fonctionne ?
          </h1>
        </div>
        <div className="space-y-8">
          <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
            Respect Rigoureux de Notre Cahier des Charges{' '}
          </h1>
          <p className="text-lg">
            Chez Sahel, nous adhérons strictement à notre propre cahier des
            charges, conçu pour garantir des prestations de ménage de la plus
            haute qualité. Ce document définit avec précision les normes et les
            procédures que nous appliquons lors de chaque intervention, assurant
            ainsi un service uniforme et irréprochable. De l'utilisation de
            produits écologiques à la gestion sécurisée des accès, en passant
            par le respect des délais et la qualité du suivi client, chaque
            aspect de notre travail est encadré par des standards rigoureux. En
            respectant ce cahier des charges, nous vous assurons un service de
            ménage professionnel qui répond à vos attentes, tout en garantissant
            une sérénité totale.{' '}
          </p>
        </div>{' '}
      </div>
    </div>
  )
}

export default HowPetitsTravauxWorks
