import Link from 'next/link'

export const BackButton = () => {
  return (
    <Link href={'/'} className={'btn mb-3'}>
      ← Back to Home
    </Link>
  )
}
