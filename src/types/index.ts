// types/index.ts
import { ZodSchema } from 'zod'
import React from 'react'

export interface StepProps {
  name: string
  validation?: ZodSchema<any>
  children: React.ReactNode
}

export interface FormWizardProps {
  initialData?: Record<string, any>
  onSubmit: (data: Record<string, any>) => void
  children: React.ReactNode
}

export interface WizardContextValue {
  currentStep: string
  next: () => void
  back: () => void
}
