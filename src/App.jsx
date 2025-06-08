import React, { useState } from 'react'
import { atom, RecoilRoot, useRecoilState } from 'recoil'

const notificationAtom = atom({
  key: "notificationState",
  default: {
    network: 0,
    jobs: 0,
    messaging: 0,
    notifications: 0
  }
})

function App() {
  return (
    <RecoilRoot>
      <div className='w-full min-h-screen bg-zinc-900 text-white p-4 sm:p-16'>
        <Navbar />
      </div>
    </RecoilRoot>
  )
}

function Navbar() {

  const [notificationState, setNotificationState] = useRecoilState(notificationAtom)
  
  return (
    <div>
      <button className='px-3 py-1.5 bg-blue-600 rounded-md mr-2'>Home</button>

      <button className='px-3 py-1.5 bg-blue-600 rounded-md mr-2'>My Network ({notificationState.network})</button>
      <button className='px-3 py-1.5 bg-blue-600 rounded-md mr-2'>Jobs ({notificationState.jobs})</button>
      <button className='px-3 py-1.5 bg-blue-600 rounded-md mr-2'>Messaging ({notificationState.messaging})</button>
      <button className='px-3 py-1.5 bg-blue-600 rounded-md mr-2'>Notifications ({notificationState.notifications})</button>

      <button className='px-3 py-1.5 bg-blue-600 rounded-md mr-2'>Me</button>
    </div>
  )
}

export default App;