import { ZodSchema } from 'zod'
import React from 'react'
import { DefaultValues, UseFormProps } from 'react-hook-form'

export interface StepProps {
  name: string
  order?: number
  validation?: ZodSchema<any>
  fields: string[]
  children: React.ReactNode
}

export interface FormWizardProps<T extends Record<string, any>> {
  initialData?: DefaultValues<T>
  onSubmit: (data: T) => void
  children: React.ReactNode
  className: string | undefined
  resolver?: UseFormProps<T>['resolver']
}

export interface WizardContextValue {
  currentStep: string
  next: () => void
  back: () => void
  validateStep: () => Promise<boolean>
  nextValidated: () => Promise<void>
}
