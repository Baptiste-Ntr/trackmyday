'use client'

import { login } from './actions'

const Page = () => {
    return (
        <form>
            <label htmlFor="email">Email :</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="password">Password :</label>
            <input type="password" id="password" name="password" required />
            <button formAction={login}>Login</button>
        </form>
    )
}

export default Page