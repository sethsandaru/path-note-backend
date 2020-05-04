import {Injectable} from "@nestjs/common";

@Injectable()
export class HelperFactory {

    /**
     * Generate random string
     * @param length
     * @returns string
     */
    static generateString(length : number = 6) : string {
        return Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '').substr(0, length);
    }

    /**
     * Encrypt password
     * @param password
     * @returns string
     */
    static async encryptPassword(password : string) : Promise<string> {
        const bcrypt = require('bcrypt');
        const saltRounds = parseInt(process.env.SALT_ROUNDS);

        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) {
                    reject(err)
                }

                resolve(hash)
            });
        })
    }

    /**
     * Comparing bcrypt password
     * @param rawPassword
     * @param encryptedPassword
     * @returns boolean
     */
    static async comparePassword(rawPassword : string, encryptedPassword: string) : Promise<boolean> {
        const bcrypt = require('bcrypt');

        return new Promise(
            (resolve) => bcrypt.compare(
                rawPassword, encryptedPassword, (err, result) => resolve(result)
            )
        )
    }
}