import Link from 'next/link'
import React from 'react'
export default function notfound() {
  return (
    <div className='flex justify-center items-center h-screen flex-col text-center'>
      <svg viewBox="0 0 112 112" width="112" height="112" className="xfx01vb x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq" ><defs><clipPath id="a"><path fill="none" d="M100.31 101.1H39.45V12.8h40.78l20.08 21.03v67.27z"></path></clipPath></defs><path d="M38.54 39.69h1.82a11.78 11.78 0 0 1 11.78 11.78v13.6H26.77v-13.6a11.78 11.78 0 0 1 11.77-11.78z" strokeMiterlimit="10" strokeWidth="9.48" stroke="#a4a7ab" fill="none"></path><g clipPath="url(#a)"><path fill="#90c3ff" d="M100.31 101.1H39.45V12.8h40.78l20.08 21.03v67.27z"></path><path d="M80.28 10.59h23.26v23.26H87.32a7 7 0 0 1-7-7V10.59h-.04z" fill="#1876f2"></path><path d="M38.54 39.69h1.82a11.78 11.78 0 0 1 11.78 11.78v13.6H26.77v-13.6a11.78 11.78 0 0 1 11.77-11.78z" stroke="#fff" strokeMiterlimit="10" strokeWidth="9.48" fill="none"></path></g><rect x="10.54" y="58.29" width="57.83" height="42.76" rx="4.41" fill="#64676b"></rect><circle cx="39.45" cy="75.25" r="6.3"></circle><path d="M36.62 73.73h5.67v12.48a2.63 2.63 0 0 1-2.63 2.63h-.41a2.63 2.63 0 0 1-2.63-2.63V73.73z"></path></svg>
      <h2 className='font-bold text-2xl text-gray-500'>This content isn&apos;t available at the moment</h2>
      <p className='w-1/3 text-lg font-semibold text-gray-400'>When this happens, it&apos;s usually because the owner only shared it with a small group of people or changed who can see it, or it&apos;s been deleted.</p>
      <Link href="/" className='px-4 py-2 bg-blue-600 uppercase font-semibold text-white rounded-lg mt-4'>Go Home</Link>
    </div>
  )
}
