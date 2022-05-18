import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <div>
      <h1 className='font-bold text-2xl'>Guilded Authlink Demo App</h1>
      <p>
        This is an <a href='https://github.com/GuildedAPI/authlink-demo-app' className='text-guilded-link' target='_blank'>open-source</a> demonstration app
        made to showcase the <a href='https://authlink.guildedapi.com' className='text-guilded-link'>Authlink</a> OAuth2 implementation.
      </p>
      <Link to='/login'>
        <button
          className='mt-3 px-3 py-[0.3rem] rounded font-bold shadow-[0_0_6px_0_rgba(255,234,0,0.5)] hover:shadow-[0_0_10px_0_rgba(255,234,0,0.5)] bg-gradient-to-r from-[#ffb400] via-[#e4c519] to-[#edd75c] hover:bg-[99%_0] text-guilded-black transition'
        >Log in with Guilded
        </button>
      </Link>
    </div>
  )
}
