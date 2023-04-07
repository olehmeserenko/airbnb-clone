'use client'

import { useState } from 'react'

import axios from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { Input } from '@components/Inputs/Input'
import { Modal } from '@components/Modals/Modal'
import { useRegisterModal } from '@hooks/useRegisterModal'

import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

export const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios
      .post('/api/register', data)
      .then(() => {
        registerModal.onClose()
      })
      .catch((err) => {
        console.error(err)
        toast.error('Something went wrong!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const bodyContent = (
    <div className={'flex flex-col gap-4'}>
      <Heading
        title={'Welcome to Airbnb'}
        subtitle={'Create an account!'}
        center
      />
      <Input
        id={'email'}
        label={'Email'}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id={'name'}
        label={'Name'}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id={'password'}
        type={'password'}
        label={'Password'}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className={'mt-3 flex flex-col gap-4'}>
      <hr />
      <Button
        outline
        label={'Continue with Google'}
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label={'Continue with Github'}
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className={'mt-4 text-center font-light text-neutral-500'}>
        <p>
          {'Already have an account?'}
          <span
            onClick={registerModal.onClose}
            className={'cursor-pointer text-neutral-800  hover:underline'}
          >
            {' Log in'}
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title={'Register'}
      actionLabel={'Continue'}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
