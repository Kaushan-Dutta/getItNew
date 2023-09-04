import React from 'react';
import Link from 'next/link';

const index = () => {
  return (
    <div className='w-32 flex flex-row justify-between'>
        <Link href='/user'>User</Link>
        <Link href='/store'>Store</Link>
    </div>
  )
}

export default index