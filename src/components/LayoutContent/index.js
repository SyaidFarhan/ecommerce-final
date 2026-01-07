"use client";

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Notification = dynamic(() => import('@/components/Notification'), {
  ssr: false,
  loading: () => null,
})

export default function LayoutContent({ children }) {
  return (
    <>
      <Suspense fallback={null}>
        <Notification />
      </Suspense>
      {children}
    </>
  )
}
