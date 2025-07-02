import { createContext, useContext } from 'react'
import { WizardContextValue } from '../types'

export const WizardContext = createContext<WizardContextValue | undefined>(undefined)

export const useWizard = () => {
  const ctx = useContext(WizardContext)
  if (!ctx) throw new Error('useWizard must be used within a FormWizard')
  return ctx
}