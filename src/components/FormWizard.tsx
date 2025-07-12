import { useState } from 'react'
import { useForm, FormProvider, DefaultValues } from 'react-hook-form'
import { WizardContext } from '../context/WizardContext'
import { stepsFromChildren, renderPersistent } from '../utils/helpers'
import { FormWizardProps, WizardContextValue } from '../types'

export const FormWizard = <T extends Record<string, any>>({
  initialData = {} as DefaultValues<T>,
  onSubmit,
  children,
  className = '',
  resolver
}: FormWizardProps<T>) => {
  const formMethods = useForm<T>({
    defaultValues: initialData,
    resolver,
  })
  const { handleSubmit, trigger } = formMethods

  const allSteps = stepsFromChildren(children)
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentStepEl = allSteps[currentIndex]
  const currentStep = currentStepEl?.props.name
  const currentFields = currentStepEl?.props.fields || []

  const next = () => setCurrentIndex((i) => Math.min(i + 1, allSteps.length - 1))
  const back = () => setCurrentIndex((i) => Math.max(i - 1, 0))

  const validateStep = async () => {
    return await trigger(currentFields as any)
  }

  const nextValidated = async () => {
    const isValid = await validateStep()
    if (isValid) next()
  }

  const ctxValue: WizardContextValue = {
    currentStep: currentStep || '',
    next,
    back,
    validateStep,
    nextValidated,
  }

  return (
    <FormProvider {...formMethods}>
      <WizardContext.Provider value={ctxValue}>
        <form onSubmit={handleSubmit(onSubmit)} className={className}>
          {renderPersistent(children)}
          {currentStepEl}
        </form>
      </WizardContext.Provider>
    </FormProvider>
  )
}