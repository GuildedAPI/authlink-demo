import styles from '~/styles/coolicons.css'

import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useCatch,
} from '@remix-run/react'

import { getSession } from '~/sessions.server'

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: '/tailwindcss' },
  ]
}

export const meta = () => ({
  charset: 'utf-8',
  title: 'Authlink Demo App',
  viewport: 'width=device-width,initial-scale=1',
})

export async function loader({ request }) {
  const session = await getSession(request.headers.get('Cookie'))
  if (session.has('guilded')) {
    return {
      user: session.get('guilded').user,
    }
  }
  return null
}

const Navbar = () => {
  return (
    <div className='mr-2 mb-3 rounded-md flex text-sm'>
      <div className='my-auto'>
        <img src='/images/Guilded_Logomark_White.svg' className='h-10' alt='Guilded Logo'/>
      </div>
      <div className='my-auto'>
        <p className='text-guilded-subtitle text-xs'>This site is not affiliated with guilded.gg.</p>
      </div>
      <div className='ml-auto my-auto'>
        <p>
          <a href='https://authlink.guildedapi.com' className='text-guilded-link'>Authlink</a>
          {' ' + String.fromCodePoint(0x2022) + ' '}
          <Link to='/' className='text-guilded-link'>Home</Link>
        </p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body className='bg-guilded-gray text-guilded-white p-5 mx-auto max-w-2xl'>
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function ErrorBoundary({ error }) {
  console.error(error)
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body className='bg-guilded-gray text-guilded-white p-5 mx-auto max-w-2xl'>
        <Navbar />
        <h1 className='font-bold text-2xl'>Something went wrong</h1>
        <p>{error.message}</p>
        <p className='mt-2'>You might want to report this on <a href='https://www.guilded.gg/authlink' className='text-guilded-link' target='_blank'>the Authlink server</a>.</p>
        <Scripts />
      </body>
    </html>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  const data = caught.data || {}
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body className='bg-guilded-gray text-guilded-white p-5 mx-auto max-w-2xl'>
        <Navbar />
        <h1 className='font-bold text-2xl'>{data.message || caught.statusText}</h1>
        <p className='text-guilded-subtitle italic'>Your complimentary status code is {caught.status}.</p>
        <p className='mt-2'>Maybe you should just <Link to='/' className='text-guilded-link'>go home</Link>.</p>
        <p>If this looks like it shouldn't have happened, you should report this on <a href='https://www.guilded.gg/authlink' className='text-guilded-link' target='_blank'>the Authlink server</a>.</p>
        <Scripts />
      </body>
    </html>
  )
}
