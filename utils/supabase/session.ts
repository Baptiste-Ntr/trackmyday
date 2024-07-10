import { createClient } from "./client"

export const isSessionLogin = async () => {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getSession()

    if (data.session !== null) {
        return true
    } else {
        return false
    }

}