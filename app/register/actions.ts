'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"


export async function signup(formData: FormData) {

    console.log(formData)

    const supabase = createClient()

    const data = {
        email: formData.get('email') as string,
        email_confirm: formData.get('email_confirm') as string,
        password: formData.get('password') as string,
        password_confirm: formData.get('password_confirm') as string
    }

    // if (data.email !== data.email_confirm) {
    //     redirect('/error')
    // }

    // if (data.password !== data.password_confirm) {
    //     redirect('/error')
    // }

    // if (data.password.length < 8) {
    //     redirect('/error')
    // } else if (data.password.length > 128) {
    //     redirect('/error')
    // } else if (data.email.length > 128) {
    //     redirect('/error')
    // }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        console.error(error)
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/account')
}