'use client'

import { MoonLoader } from 'react-spinners'

const Loader = () => (
  <div className={'flex h-[70vh] flex-col items-center justify-center'}>
    <MoonLoader size={70} color={'black'} />
  </div>
)

export default Loader
