import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { WizardContext } from '../context/WizardContext'
import { stepsFromChildren, renderPersistent } from '../utils/helpers'
import { FormWizardProps, WizardContextValue } from '../types'

export const FormWizard = ({ initialData = {}, onSubmit, children }: FormWizardProps) => {
  const steps = stepsFromChildren(children)
  const [currentIndex, setCurrentIndex] = useState(0)
  const formMethods = useForm({ defaultValues: initialData })
  const { handleSubmit } = formMethods

  const currentStep = steps[currentIndex]?.props.name

  const next = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const back = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const ctxValue: WizardContextValue = {
    currentStep: currentStep || '',
    next,
    back
  }

  return (
    <FormProvider {...formMethods}>
      <WizardContext.Provider value={ctxValue}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderPersistent(children)}
          {steps[currentIndex]}
        </form>
      </WizardContext.Provider>
    </FormProvider>
  )
}