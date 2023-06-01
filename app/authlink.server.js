const BASE = 'https://authlink.app/api/v1'

// https://github.com/GuildedAPI/authlink/blob/master/app/common/guilded.js
async function request(method, path, props={}) {
    const headers = {}

    let body = undefined
    if (props.json) {
        body = JSON.stringify(props.json)
        headers['Content-Type'] = 'application/json'
    } else if (props.data) {
        body = props.data
    }

    if (props.headers) {
        Object.assign(headers, props.headers)
    }

    const url = new URL(BASE + path)

    if (props.params) {
        for (const key of Object.keys(props.params)) {
            url.searchParams.append(key, props.params[key])
        }
    }

    const response = await fetch(url, {
        method,
        body,
        headers,
    })
    if (response.status == 204) {
        return {}
    }
    if (response.headers.get('Content-Type') == 'application/json') {
        return await response.json()
    }
    return await response.data()
}

// https://authlink.app/dev/docs#exchange-code
export async function exchangeCode(code) {
    return await request('POST', '/token', {
        data: new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type: 'authorization_code',
            code: code,
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

// https://authlink.app/dev/docs#exchange-code
export async function refreshToken(refreshToken) {
    return await request('POST', '/token', {
        data: new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

// https://authlink.app/dev/docs#revoke-token
export async function revokeToken(token) {
    return await request('POST', '/token/revoke', {
        data: new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            token: token,
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

// https://authlink.app/dev/docs#get-current-user
export async function getCurrentUser(accessToken) {
    return await request('GET', '/users/@me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
}

// https://authlink.app/dev/docs#get-current-user-servers
export async function getCurrentUserServers(accessToken) {
    return await request('GET', '/users/@me/servers', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
}

// https://authlink.app/dev/docs#get-current-user-server-member
export async function getCurrentUserServerMember(accessToken, serverId, getPermissions=false) {
    return await request('GET', `/users/@me/servers/${serverId}/member`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params: {
            getPermissions: String(getPermissions),
        },
    })
}
