import React from 'react'

const ChatBox = () => {
  return (
    <div className="mt-8">
      <ul className="space-y-5">
        <li className="max-w-lg flex gap-x-2 sm:gap-x-4">
          <div className="grow space-y-3">
            <div className="inline-block bg-[#ab5e3f] rounded-2xl p-4 shadow-sm">
              <p className="text-sm text-white">
                Bonjour, puis-je avoir des nouvelles de ma réservation ?{' '}
              </p>
            </div>
          </div>
        </li>

        <li className="max-w-lg flex gap-x-2 sm:gap-x-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 ">
            <p className="text-sm font-medium text-gray-800 ">
              aasahbèè tronquille l'hajja elle arrive domain che toa elle va
              toyer l'bartmane o safè to casspalatète
            </p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default ChatBox
