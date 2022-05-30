import { redirect, json } from '@remix-run/server-runtime'

import { revokeToken } from '~/authlink.server'
import { getSession, destroySession } from '~/sessions.server'

export async function loader({ request }) {
  const session = await getSession(request.headers.get('Cookie'))
  if (!session.has('guilded')) {
    throw json({ message: 'You aren\'t even logged in!' }, { status: 401 })
  }
  const guildedData = session.get('guilded')
  await revokeToken(guildedData.auth.access_token)

  return redirect('/', {
    headers: {
      Cookie: await destroySession(session),
    },
  })
}
