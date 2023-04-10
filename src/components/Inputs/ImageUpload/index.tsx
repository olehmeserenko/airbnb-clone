'use client'

import { FC, useCallback } from 'react'

import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any
}

const uploadPreset = 'kb9bvfxt'

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url)
    },
    [onChange],
  )

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => (
        <div
          onClick={() => open?.()}
          className={
            'relative flex cursor-pointer flex-col items-center  justify-center  gap-4  border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition hover:opacity-70'
          }
        >
          <TbPhotoPlus size={50} />
          <div className={'text-lg font-semibold'}>{'Click to upload'}</div>
          {value && (
            <div className={' absolute inset-0 h-full w-full'}>
              <Image
                fill
                style={{ objectFit: 'cover' }}
                src={value}
                alt={'House'}
              />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  )
}

export default ImageUpload
