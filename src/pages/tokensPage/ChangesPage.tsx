import React, { FC, useEffect } from 'react'

import { Tokens } from './Tokens'
import { tokensChangedSinceLastViewReset } from '../../model/tokens'

import './ChangesPage.css'

export type ChangesPageProps = {}

export const ChangesPage: FC<ChangesPageProps> = () => {
  useEffect(tokensChangedSinceLastViewReset, [])

  return (
    <div className="ChangesPage">
      <Tokens />
    </div>
  )
}
