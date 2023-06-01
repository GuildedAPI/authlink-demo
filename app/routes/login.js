import { redirect } from '@remix-run/server-runtime'

export async function loader() {
  const url = new URL('https://authlink.app/auth')
  url.searchParams.set('client_id', process.env.CLIENT_ID)
  url.searchParams.set('scope', 'identify servers')
  url.searchParams.set('prompt', 'none')
  url.searchParams.set('redirect_uri', process.env.REDIRECT_URI)
  return redirect(url)
}
