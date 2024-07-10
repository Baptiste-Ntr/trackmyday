'use client'

import { useCallback, useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { type User } from "@supabase/supabase-js"

export default function AccountForm({ user }: { user: User | null }) {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [website, setWebsite] = useState<string | null>(null)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)
            const { data, error, status } = await supabase
                .from('profiles')
                .select('full_name, username, website, avatar_url')
                .eq('id', user?.id)
                .single()

            if (error && status !== 406) {
                console.log(error)
                throw error
            }

            if (data) {
                setFullname(data.full_name)
                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert('Error loading user data!')
        } finally {
            setLoading(false)
        }
    }, [user, supabase])

    useEffect(() => {
        getProfile()
    }, [user, getProfile])

    async function updateProfile({
        username,
        website,
        avatar_url,
    }: {
        username: string | null,
        fullname: string | null,
        website: string | null,
        avatar_url: string | null,
    }) {
        try {
            setLoading(true)

            const { error } = await supabase.from('profiles').upsert({
                id: user?.id as string,
                full_name: fullname,
                username,
                website,
                avatar_url,
                update_at: new Date().toISOString(),
            })
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            alert('Error updating profile!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="form-widget">
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" value={user?.email} disabled />
            </div>
            <div>
                <label htmlFor="fullname">Full Name</label>
                <input id="fullname" type="text" value={fullname || ''} onChange={e => setFullname(e.target.value)} />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" value={username || ''} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="website">Website</label>
                <input id="website" type="text" value={website || ''} onChange={e => setWebsite(e.target.value)} />
            </div>

            <div>
                <label htmlFor="created_at">Joined</label>
                <input id="created_at" type="text" value={new Date(user?.created_at || '').toDateString()} disabled />
            </div>

            <div>
                <button onClick={() => updateProfile({ fullname, username, website, avatar_url })} disabled={loading}>
                    {loading ? 'Loading...' : 'Update'}
                </button>
            </div>

            <div>
                <form action={"/auth/signout"} method="post">
                    <button type="submit">Sign Out</button>
                </form>
            </div>
        </div>
    )
}