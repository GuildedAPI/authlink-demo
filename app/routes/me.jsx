import { json, redirect } from '@remix-run/server-runtime'
import { useLoaderData } from '@remix-run/react'

import { boilerplateLoader, getSession, commitSession } from '~/sessions.server'

import { exchangeCode, revokeToken, getCurrentUser, getCurrentUserServers } from '~/authlink.server'

export async function loader({ request }) {
  const url = new URL(request.url)
  if (url.searchParams.has('code')) {
    const tokenData = await exchangeCode(url.searchParams.get('code'))
    if (tokenData.error) {
      throw json({ message: tokenData.error_description }, { status: 400 })
    }

    const userData = await getCurrentUser(tokenData.access_token)
    const serversData = await getCurrentUserServers(tokenData.access_token)

    const session = await getSession(request.headers.get('Cookie'))
    session.set('guilded', {
      user: userData,
      servers: serversData,
      auth: tokenData,
    })
    return redirect('/me', {
      headers: {
        'Set-Cookie': await commitSession(session)
      }
    })
  }

  const guildedData = await boilerplateLoader({ request })
  return {
    user: guildedData.user,
    servers: guildedData.servers,
  }
}

export default function Me() {
  const data = useLoaderData()

  return (
    <div>
      <h1 className='font-bold text-2xl'>User Info</h1>
      <div className='p-3 rounded border border-white/10 bg-[#3e3f4a] mt-2'>
        <div className='flex mb-2'>
          <img
            className='rounded-full shadow mr-3 h-10 my-auto'
            src={data.user.avatar ?? 'https://img.guildedcdn.com/asset/DefaultUserAvatars/profile_1.png'}
          />
          <div className='my-auto h-full'>
            <a href={`https://www.guilded.gg/profile/${data.user.id}`} target='_blank'><p className='text-lg font-bold hover:underline'>{data.user.name}</p></a>
            {data.user.aboutInfo && data.user.aboutInfo.tagLine && (
              <p className='text-guilded-subtitle text-sm'>{data.user.aboutInfo.tagLine}</p>
            )}
          </div>
        </div>
        <p>You joined Guilded at {new Date(data.user.createdAt).toLocaleString()}.</p>
      </div>
      <h1 className='font-bold text-2xl mt-2'>Servers ({(data.servers ? data.servers.length : 0)})</h1>
      {(data.servers && data.servers.length > 0) ? data.servers.reverse().map((server) => {
        return (
          <a key={server.id} href={`https://www.guilded.gg/teams/${server.id}`} target='_blank'>
            <div className='p-3 rounded border border-white/10 bg-[#3e3f4a] mt-2 hover:bg-[#4F505D] transition-colors'>
              <div className='flex'>
                <img
                  className='rounded-md mr-3 h-10 my-auto'
                  src={server.profilePicture ?? 'https://img.guildedcdn.com/asset/Default/Gil-sm.png'}
                />
                <div className='my-auto h-full'>
                  <p className='text-lg font-bold'>{server.name}</p>
                  <p className='text-guilded-subtitle text-sm'>{server.memberCount.toLocaleString()} members</p>
                </div>
              </div>
            </div>
          </a>
        )
      }) : (
        <p>You have no servers or you did not authorize with the <code>servers</code> scope.</p>
      )}
    </div>
  )
}
