import { cn } from '@bem-react/classname'
import React, { FC, ReactElement, } from 'react'

import './Section.css'

const cnSection = cn('Section')

export const Section: FC<{ header?: ReactElement | string }> = ({ children, header }) => {
  return (
    <div className={cnSection()}>
        {header ? <h4 className={cnSection('Header')}>{header}</h4> : null}
        {children}
    </div>
  )
}
