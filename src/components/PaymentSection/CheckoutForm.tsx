import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
} from '@stripe/react-stripe-js'

const CheckoutForm = () => {
  const stripe = useStripe()

  return (
    <>
      {/* Hello world */}
      <div className="container mx-auto mt-10">
        <form
          action="#"
          className="max-w-xl mx-auto 
                          bg-white p-8 rounded 
                          shadow-lg"
        >
          <div
            className="grid grid-cols-1 
                  md:grid-cols-2 gap-6"
          >
            <div>
              <h3
                className="text-lg font-semibold 
                text-blue-950 mb-4"
              >
                Adresse de facturation
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm 
                                font-medium text-gray-700"
                >
                  Nom :
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Entrez votre nom"
                  className="mt-1 block w-full 
                                border-gray-300 rounded-md 
                                shadow-sm focus:ring-blue-950
                                focus:border-blring-blue-950"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm 
                                font-medium text-gray-700"
                >
                  Prénom :
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Entrez votre prénom"
                  className="mt-1 block w-full 
                                border-gray-300 rounded-md 
                                shadow-sm focus:ring-blue-950
                                focus:border-blring-blue-950"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium
                                text-gray-700"
                >
                  Adresse:
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Entrez votre adresse"
                  className="mt-1 block w-full border-gray-300
                                rounded-md shadow-sm 
                                focus:ring-blue-950 
                                focus:border-blring-blue-950"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium 
                                text-gray-700"
                >
                  Ville:
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="Entrez votre ville"
                  className="mt-1 block w-full 
                                border-gray-300 rounded-md
                                shadow-sm focus:ring-blue-950
                                focus:border-blring-blue-950"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium
                                text-gray-700"
                >
                  Code postal:
                </label>
                <input
                  type="text"
                  id="zip"
                  placeholder="Entrez votre code postal"
                  className="mt-1 block w-full 
                                border-gray-300 rounded-md 
                                shadow-sm focus:ring-blue-950
                                focus:border-blring-blue-950"
                />
              </div>
            </div>
            <div>
              <h3
                className="text-lg font-semibold 
                         text-blue-950 mb-4"
              >
                Paiement
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="cardName"
                  className="block text-sm font-medium
                                text-gray-700"
                >
                  Nom :
                </label>
                <input
                  type="text"
                  id="cardName"
                  placeholder="Entrez le nom sur la carte"
                  className="mt-1 block w-full 
                                border-gray-300 rounded-md 
                                shadow-sm focus:ring-blue-950
                                focus:border-blring-blue-950"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium 
                                text-gray-700 mb-2"
                >
                  N° de carte de crédit :
                </label>
                <CardNumberElement />
              </div>
              <div className="flex justify-between mb-4">
                <div className="w-1/2 mr-2">
                  <label
                    htmlFor="expiration"
                    className="block text-sm font-medium
                                    text-gray-700 mb-2"
                  >
                    Expiration :
                  </label>
                  <CardExpiryElement />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="cvv"
                  className="block text-sm 
                                font-medium 
                                text-gray-700 mb-2"
                >
                  CVV:
                </label>
                <CardCvcElement />
              </div>
            </div>
          </div>
          <input
            type="submit"
            defaultValue="Proceed to Checkout"
            id="checkoutBtn"
            className="mt-6 px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-700"
          />
        </form>
      </div>
    </>
  )
}

export default CheckoutForm
