import { get } from '@/utils/http'

// get user list
const fetchUsers = async () => {
try {
const users = await get<User[]>('/api/users')
console.log(users)
} catch (error) {
console.error('get user list error', error)
}
}

import { post } from '@/utils/http'

// register user
const handleLogin = async (formData: LoginForm) => {
try {
const result = await post<LoginResponse>('/api/login', formData, {
showLoading: true // show loading
})
console.log('register user success', result)
} catch (error) {
console.error('register user failure', error)
}
}
