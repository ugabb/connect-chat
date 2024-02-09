"use client"

import clsx from 'clsx'
import React from 'react'
import useConversation from '../hooks/useConversation';

const Settings = () => {
  const { isOpen } = useConversation();


  return (
    <div className={
      clsx(
        'lg:pl-80 lg:block',
        isOpen ? 'block' : 'hidden'
      )
    }>
    </div>
  )
}

export default Settings