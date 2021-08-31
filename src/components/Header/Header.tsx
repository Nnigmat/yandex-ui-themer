import React, { FC } from 'react'
import { cn } from '@bem-react/classname'
import { useStore } from 'effector-react'

import { TabsMenu } from '../../lib/lego/TabsMenu'
import { Controls } from './Controls'
import { $tokensChangedSinceLastView } from '../../model/tokens'

import './Header.css'

export type ActiveTabType = 'components' | 'changes'

export type HeaderProps = {
  activeTab: ActiveTabType
  setActiveTab: (newActiveTab: ActiveTabType) => void
}

export const cnHeader = cn('Header')

export const Header: FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const showChangesNotification = useStore($tokensChangedSinceLastView)

  return (
    <div className={cnHeader()}>
      <TabsMenu
        activeTab={activeTab}
        tabs={[
          {
            id: 'components',
            onClick: () => setActiveTab('components'),
            content: 'Components',
          },
          {
            id: 'changes',
            onClick: () => setActiveTab('changes'),
            content: (
              <div
                className={cnHeader('Changes', {
                  notify: showChangesNotification,
                })}
              >
                Changes
              </div>
            ),
          },
        ]}
      />
      <Controls className={cnHeader('Controls')} />
    </div>
  )
}
