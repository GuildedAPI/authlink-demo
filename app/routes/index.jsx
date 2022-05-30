import { Link, useLoaderData } from '@remix-run/react'
import { getSession } from '~/sessions.server'

export async function loader({ request }) {
  const session = await getSession(request.headers.get('Cookie'))
  if (!session.has('guilded')) return { user: null }
  return { user: session.get('guilded').user }
}

export default function Index() {
  const data = useLoaderData()

  return (
    <div>
      <h1 className='font-bold text-2xl'>Guilded Authlink Demo App</h1>
      <p>
        This is an <a href='https://github.com/GuildedAPI/authlink-demo' className='text-guilded-link' target='_blank'>open-source</a> demonstration app
        made to showcase the <a href='https://authlink.guildedapi.com' className='text-guilded-link'>Authlink</a> OAuth2 implementation.
      </p>
      {data.user ? (
        <p className='mt-3'>
          <Link to='/me' className='text-guilded-link'>
            You're already logged in, {data.user.name}! Click here to see your servers.
          </Link>
        </p>
      ) : (
        <Link to='/login'>
          <button
            className='mt-3 px-3 py-[0.3rem] rounded font-bold shadow-[0_0_6px_0_rgba(255,234,0,0.5)] hover:shadow-[0_0_10px_0_rgba(255,234,0,0.5)] bg-gradient-to-r from-[#ffb400] via-[#e4c519] to-[#edd75c] hover:bg-[99%_0] text-guilded-black transition'
          >
            Log in with Guilded
          </button>
        </Link>
      )}
    </div>
  )
}
