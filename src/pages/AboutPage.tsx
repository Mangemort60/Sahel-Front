import blobMessage from '../assets/blob-message.svg'

const AboutPage = () => {
  return (
    <div className="font-sans sm:w-2/3 sm:m-auto">
      <div className="py-8">
        <h1 className="text-center text-4xl mb-6">Qui sommes nous ?</h1>
        <div className="flex justify-center space-x-12 py-4">
          <div>
            <img
              className="rounded-full object-cover"
              src="https://picsum.photos/150/150"
              alt="Nessime"
            />
            <p className="text-center">nom-fonction</p>
          </div>
          <div>
            <img
              className="rounded-full object-cover"
              src="https://picsum.photos/150/150"
              alt="Hafid"
            />
            <p className="text-center">nom - fonction</p>
          </div>
        </div>
      </div>
      <div className="px-6  space-y-8">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eligendi
          minus facilis cupiditate omnis repudiandae illo at, nesciunt animi
          consequuntur neque culpa atque illum, error distinctio, ex ipsa
          libero? Exercitationem laboriosam tenetur veniam ratione autem error
          placeat, optio fugit illum molestias perferendis vel illo sit ea minus
          et magnam sapiente iusto minima omnis eos ab inventore asperiores! Ea
          quisquam similique vel, obcaecati, a dolores, placeat illum pariatur
          voluptates dolorum commodi.{' '}
        </p>
        <h2 className="text-3xl">Pourquoi Sahel ?</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut at in
          enim unde neque recusandae, blanditiis modi hic voluptas dolorem minus
          aspernatur facilis porro. Nihil earum eos reiciendis fuga dolores
          quaerat consequatur praesentium sit itaque asperiores dolorem tempore
          accusantium porro, rem maiores commodi suscipit voluptatem perferendis
          totam modi quo dicta. Doloremque rerum sapiente maxime possimus,
          consequatur excepturi repudiandae vero libero vitae quia eveniet eos
          laudantium nam sint nulla aspernatur alias.
        </p>
        <blockquote className="relative top-6 mb-12">
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
            <p className="text-xl text-secondaryLightBlue md:text-3xl md:leading-normal dark:text-white my-20">
              <em>
                Avec Sahel, les Marocains résidant à l'étranger bénéficient
                enfin d'un service simple et flexible pour optimiser leur séjour
                au Maroc.{' '}
              </em>
            </p>
          </div>
        </blockquote>
        <h2 className="text-3xl">Nos Projets futur</h2>
        <p className="mb-20">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
          explicabo iste atque. Sed perspiciatis quis obcaecati reprehenderit
          tempore. Dolores iure asperiores possimus officia assumenda! Possimus
          inventore impedit voluptates nam et consequatur quod voluptatibus
          magnam beatae quasi doloremque, quia dicta autem. Earum blanditiis
          laudantium sunt temporibus modi officia consectetur minima, dolorum
          distinctio voluptate est deserunt iure itaque quas eligendi corrupti
          tempore eum voluptatum enim, amet aspernatur error maxime quam facere?
          Magnam?
        </p>
        <div className="flex flex-col items-center space-y-8 mb-8">
          <div className="flex items-center mt-8">
            <div className="w-4 h-4 bg-sahelRegular rounded-full "></div>
            <div className="ml-6 p-4 bg-white rounded shadow-lg w-64">
              <h3 className="font-semibold text-lg mb-2">2025</h3>
              <p className="text-gray-600">Service de nettoyage</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-4 h-4 bg-sahelRegular rounded-full"></div>
            <div className="ml-6 p-4 bg-white rounded shadow-lg w-64">
              <h3 className="font-semibold text-lg mb-2">A venir</h3>
              <p className="text-gray-600">Service administratif</p>
              <p className="text-gray-600">Service de petits travaux</p>
              <p className="text-gray-600">Service de gardiennage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
