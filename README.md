# react-form-step-wizard

A lightweight, accessible and flexible multi-step form wizard for React. Designed to work seamlessly with `react-hook-form` and `zod` schemas.

## ✨ Features

* Minimal configuration
* Step-based navigation with `next()` and `back()`
* Persisted header/footer components
* Integrated with `react-hook-form` and Zod
* No external styling — bring your own styles

## 📦 Installation

```bash
npm install react-form-step-wizard
```

or

```bash
yarn add react-form-step-wizard
```

## 🚀 Usage

```tsx
import { FormWizard, Step, Persistent, useWizard } from 'react-form-step-wizard';
import { useFormContext, FormProvider, useForm } from 'react-hook-form';

const StepOne = () => {
  const form = useFormContext();
  const { next } = useWizard();

  return (
    <div>
      <input {...form.register('name')} placeholder="Name" />
      <button type="button" onClick={next}>Next</button>
    </div>
  );
};

const StepTwo = () => {
  const form = useFormContext();
  const { back } = useWizard();

  return (
    <div>
      <input {...form.register('email')} placeholder="Email" />
      <button type="button" onClick={back}>Back</button>
      <button type="submit">Submit</button>
    </div>
  );
};

const MyForm = () => {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <FormWizard onSubmit={(data) => console.log(data)}>
        <Persistent>
          <p>This section is always visible</p>
        </Persistent>
        <Step name="step1">
          <StepOne />
        </Step>
        <Step name="step2">
          <StepTwo />
        </Step>
      </FormWizard>
    </FormProvider>
  );
};
```

## 🔧 API

### `<FormWizard onSubmit={...}>`

Wraps the entire form and provides context and state.

### `<Step name="...">`

Defines a step in the wizard. Only one step is shown at a time.

### `<Persistent>`

Content inside this block remains visible across all steps (e.g. headers, instructions, etc.).

### `useWizard()`

Hook to control navigation: `next()`, `back()`, `currentStep`.

## 📄 License

MIT
