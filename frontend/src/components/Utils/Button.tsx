/*[object Object]*/
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Button ({ children }: Props): JSX.Element {
  return (
    <div className="bg-cyan-300 p-3 font-semibold rounded-lg text-sky-800 hover:scale-110 transition ease-in-out duration-300 animate-pulse">
      {children}
    </div>
  )
}

export default Button
