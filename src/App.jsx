import React, { useState } from 'react'
import { atom, RecoilRoot, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const notificationAtom = atom({
  key: "notificationState",
  default: {
    jobs: 0,
    messaging: 0,
    notifications: 0
  }
})

const networkAtom = atom({
  key: "networkState",
  default: 0
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

const notificationSelector = selector({
  key: 'notificationCount Selector',
  get: ({get})=>{
    const notificationAtomValue = get(notificationAtom)
    const networkAtomValue = get(networkAtom)
    return networkAtomValue+notificationAtomValue.jobs+notificationAtomValue.messaging+notificationAtomValue.notifications
  }
})

function Navbar() {

  const [notificationState, setNotificationState] = useRecoilState(notificationAtom)
  return (
    <div>
      <button className='px-3 py-1.5 bg-blue-600 rounded-md mr-2'>Home</button>
      <NetworkButton />
      <button onClick={()=>setNotificationState(prev=>({...prev, jobs: prev.jobs+1}))} className='px-3 py-1.5 bg-blue-600 rounded-md mr-2'>Jobs {notificationState.jobs ? `(${(notificationState.jobs>9 ? "9+" :notificationState.jobs)})` :null}</button>
      <button onClick={()=>setNotificationState(prev=>({...prev, messaging: prev.messaging+1}))} className='px-3 py-1.5 bg-blue-600 rounded-md mr-2'>Messaging ({notificationState.messaging})</button>
      <button onClick={()=>setNotificationState(prev=>({...prev, notifications: prev.notifications+1}))} className='px-3 py-1.5 bg-blue-600 rounded-md mr-2'>Notifications ({notificationState.notifications})</button>
      <MeButton />
    </div>
  )
}


function NetworkButton() {
  const [networkCount, setNetworkCount] = useRecoilState(networkAtom); // ✅ Move subscription here only

  return (
    <button
      onClick={() => setNetworkCount(prev => prev + 1)}
      className="px-3 py-1.5 bg-blue-600 rounded-md mr-2"
    >
      My Network ({networkCount})
    </button>
  );
}
function MeButton() {
  const notificationCount = useRecoilValue(notificationSelector); // ✅ Move selector usage here

  return (
    <button className="px-3 py-1.5 bg-blue-600 rounded-md mr-2">
      Me [{notificationCount}]
    </button>
  );
}

export default App;