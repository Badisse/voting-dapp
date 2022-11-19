/*[object Object]*/
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Card ({ children }: Props): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-between gap-10 bg-gradient-to-t from-cyan-700 to-sky-800 rounded-2xl p-12">
      {children}
    </div>
  )
}

export default Card
