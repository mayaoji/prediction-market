'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useUser } from '@/stores/useUser'

const HowItWorks = dynamic(
  () => import('@/app/[locale]/(platform)/_components/HowItWorks'),
  { ssr: false },
)

export default function HowItWorksDeferred() {
  const user = useUser()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (user) {
      return
    }

    function renderHowItWorks() {
      setShouldRender(true)
    }

    const passiveOnceOptions = { once: true, passive: true } satisfies AddEventListenerOptions

    window.addEventListener('scroll', renderHowItWorks, passiveOnceOptions)
    window.addEventListener('pointerdown', renderHowItWorks, passiveOnceOptions)
    window.addEventListener('keydown', renderHowItWorks, { once: true })

    return () => {
      window.removeEventListener('scroll', renderHowItWorks)
      window.removeEventListener('pointerdown', renderHowItWorks)
      window.removeEventListener('keydown', renderHowItWorks)
    }
  }, [user])

  if (user || !shouldRender) {
    return null
  }

  return <HowItWorks />
}
