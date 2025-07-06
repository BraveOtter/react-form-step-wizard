import React from 'react'
import { Step } from '../components/Step'
import { StepProps } from '../types'
import { Persistent } from '../components/Persistent'

export const stepsFromChildren = (children: React.ReactNode): React.ReactElement<StepProps>[] => {
  return React.Children.toArray(children)
    .filter(
      (child): child is React.ReactElement<StepProps> =>
        React.isValidElement(child) && child.type === Step
    )
    .sort((a, b) => {
      const orderA = a.props.order ?? Number.MAX_SAFE_INTEGER
      const orderB = b.props.order ?? Number.MAX_SAFE_INTEGER
      return orderA - orderB
    })
}

export const renderPersistent = (children: React.ReactNode): React.ReactNode[] => {
  return React.Children.toArray(children).filter(
    (child): child is React.ReactElement => React.isValidElement(child) && child.type === Persistent
  )
}