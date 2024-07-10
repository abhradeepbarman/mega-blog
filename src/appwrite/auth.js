import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId);  // Your project ID

        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try {
            const user = await this.account.create(
                ID.unique(),
                email, 
                password,
                name
            )

            if(user) {
                //call another method
                return this.login(email, password)
            }
            else {
                return user;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(
                email, 
                password
            );
        } catch (error) {
            console.log(error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log(error);
        }

        // eslint-disable-next-line no-unreachable
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log(error);
        }
    }
}

const authService = new AuthService()

export default authService
