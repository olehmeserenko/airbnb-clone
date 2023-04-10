'use client'

import { useMemo, useState } from 'react'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { Heading } from '@components/Heading'
import { CategoryInput } from '@components/Inputs/CategoryInput'
import { Counter } from '@components/Inputs/Counter'
import { CountrySelect } from '@components/Inputs/CountrySelect'
import ImageUpload from '@components/Inputs/ImageUpload'
import { Input } from '@components/Inputs/Input'
import { categories } from '@components/Navbar/Categories'
import { useRentModal } from '@hooks/useRentModal'

import dynamic from 'next/dynamic'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Modal } from '../Modal'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export const RentModal = () => {
  const router = useRouter()
  const rentModal = useRentModal()

  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(STEPS.CATEGORY)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  })

  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')

  const Map = useMemo(
    () =>
      dynamic(
        () => import('@components/Map').then((component) => component.Map),
        { ssr: false },
      ),
    [location],
  )

  const setCustomValue = (id: string, value: unknown) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return onNext()

    setIsLoading(true)
    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Listing created!')
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.onClose()
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false))
  }

  const onBack = () => {
    setStep((prev) => prev - 1)
  }

  const onNext = () => {
    setStep((prev) => prev + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return 'Create'

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined

    return 'Back'
  }, [step])

  let bodyContent = (
    <div className={'flex flex-col gap-8'}>
      <Heading
        center
        title={'Which of these best describes your place?'}
        subtitle={'Pick a category'}
      />
      <div
        className={
          'grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2'
        }
      >
        {categories.map((item) => (
          <div key={item.label} className={'col-span-1'}>
            <CategoryInput
              icon={item.icon}
              label={item.label}
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className={'flex flex-col gap-8'}>
        <Heading
          center
          title={'Where is your place located?'}
          subtitle={'Help guests find you!'}
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className={'flex flex-col gap-8'}>
        <Heading
          center
          title={'Share some basics about your place'}
          subtitle={'What amenities do you have?'}
        />
        <Counter
          onChange={(value) => setCustomValue('guestCount', value)}
          value={guestCount}
          title={'Guests'}
          subtitle={'How many guests do you allow?'}
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title={'Rooms'}
          subtitle={'How many rooms do you have?'}
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title={'Bathrooms'}
          subtitle={'How many bathrooms do you have?'}
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className={'flex flex-col gap-8'}>
        <Heading
          center
          title={'Add a photo of your place'}
          subtitle={'Show guests what your place looks like!'}
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className={'flex flex-col gap-8'}>
        <Heading
          center
          title={'How would you describe your place?'}
          subtitle={'Short and sweet works best!'}
        />
        <Input
          id={'title'}
          label={'Title'}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id={'description'}
          label={'Description'}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className={'flex flex-col gap-8'}>
        <Heading
          center
          title={'Now, set your price'}
          subtitle={'How much do you charge per night?'}
        />
        <Input
          id={'price'}
          label={'Price'}
          formatPrice
          type={'number'}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      actionLabel={actionLabel}
      body={bodyContent}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title={'Airbnb your home!'}
    />
  )
}
