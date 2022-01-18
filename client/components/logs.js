import React from 'react'
import { useSelector } from 'react-redux'

import Head from './Head'

const Logs = () => {
  const { logList } = useSelector((store) => store.log)
  return (
    <div>
      <Head />
      { logList.map((oneLog) => {
        const idForKey = Math.random().toString(32).substr(2, 12)
        return <div key={idForKey}> {oneLog}</div>
      })}
    </div>
  )
}

export default Logs
