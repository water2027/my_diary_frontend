import { defineStore } from 'pinia'

export interface User {
    email: string
    username: string
    token: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {} as User
    }),
    getters: {
        getUser() : User {
            return this.user
        },
        getToken():string {
            return this.user.token
        }
    },
    actions: {
        setUser(user:User) {
            this.user = user
        }
    }
})