import EmailVerification from '@/components/auth/EmailVerification'
import { Suspense } from 'react'

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerification />
    </Suspense>
  )
}
