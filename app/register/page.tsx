'use client'

import { signup } from './actions'

const Page = () => {

    return (
        <form>
            <label htmlFor="email">Email :</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="email_confirm">Email confirmation :</label>
            <input type='email' id='email_confirm' name='email_confirm' required />
            <label htmlFor="password">Password :</label>
            <input type="password" id="password" name="password" required />
            <label htmlFor="password_confirm">Password confirmation :</label>
            <input type='password' id='password_confirm' name='password_confirm' required />
            <button formAction={signup}>Signup</button>
        </form>
    )
}

export default Page