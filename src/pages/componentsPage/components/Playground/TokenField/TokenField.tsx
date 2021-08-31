import React, { useCallback, FC, useMemo } from 'react'

import { TextinputBase } from '../../../../../components/Textinput'
import { metricaGoal } from '../../../../../components/YaMetrika'
import { tokenUpdate } from '../../../../../model/tokens'
import { tokenChange, TokenType } from '../../../model'
import { Text, Color, Link } from './Inputs'
import { TokenPrevious } from './TokenPrevious'

export type TokenProps = TokenType & {}

export const TokenField: FC<TokenProps> = (props) => {
  const { label, description, type, path, defaultValue, changed, name } = props

  const handleTextChange = useCallback(
    (event) => {
      tokenUpdate({
        path,
        name,
        value: event.target.value,
      })
      metricaGoal('change-tokens')
    },
    [path, name],
  )

  const handleColorChange = useCallback(
    (color) => {
      tokenUpdate({
        path,
        name,
        value: color,
      })
    },
    [name, path],
  )

  const handleLink = (token: string) => {
    tokenChange(token)
  }

  const handleClear = useCallback(() => {
    tokenUpdate({
      path,
      name,
      value: defaultValue,
      remove: true,
    })
  }, [defaultValue, name, path])

  const inner = useMemo(() => {
    switch (props.type) {
      case 'text':
        return <Text handleChange={handleTextChange} {...props} />
      case 'color':
        return <Color handleLink={handleLink} handleColorChange={handleColorChange} {...props} />
      case 'link':
        return <Link handleLink={handleLink} {...props} />
    }
    // @ts-expect-error
  }, [props.type, props.color, props.colorValue, props.value])

  return (
    <>
      <TextinputBase label={label} tip={description}>
        {inner}
      </TextinputBase>
      {type === 'color' && changed && (
        <TokenPrevious color={defaultValue} handleClick={handleClear} />
      )}
    </>
  )
}
