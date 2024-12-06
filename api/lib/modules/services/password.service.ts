import PasswordModel  from '../schemas/password.schema';
import UserModel from '../schemas/user.schema';
import bcrypt from 'bcrypt';
import nodemailer from "nodemailer";

class PasswordService {
    private static LOCK_MINUTES = 10;
    private static MAX_LOGIN_ATTEMPTS = 10;

    public async createOrUpdate(data: any) {
        const result = await PasswordModel.findOneAndUpdate({ userId: data.userId }, { $set: { password: data.password } }, { new: true });
        if (!result) {
            const dataModel = new PasswordModel({ userId: data.userId, password: data.password });
            return await dataModel.save();
        }
        return result;
    }

    public async authorize(userId: string, password: string) {
        try {
            const pass = await PasswordModel.findOne({ userId: userId });

            if (!pass) {
                throw new Error('Unauthorized');
            }

            const nowTimestamp = Date.now();

            const user = await UserModel.findOne({_id: userId});
            if (!user) {
                throw new Error('User not found');
            }

            if (user.lockUntil > nowTimestamp) {
                throw new Error('User locked');
            }

            const match = await this.passwordsMatch(password, pass.password);
            if (!match) {
                await this.incLoginAttempts(user);
                throw new Error('Unauthorized');
            }

            user.loginAttempts = 0;
            user.lockUntil = 0;
            await user.save();
        } catch (error) {
            console.error('Wystąpił błąd podczas tworzenia danych:', error);
            throw new Error('Wystąpił błąd podczas tworzenia danych');
        }
    }

    public async deletePassword(userId: string) {
        try {
            const user = await UserModel.findOne({_id: userId});
            if (!user) {
                throw new Error('User not found');
            }

            const randomPass = Math.random().toString(36).slice(-8);
            const hashedPassword = await this.hashPassword(randomPass);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'bartek32d@gmail.com',
                    pass: 'qapv evxk qalk ahwy'
                }
            });

            const mailOptions = {
                from: 'bartek32d@gmail.com',
                to: user.email,
                subject: 'Password reset',
                text: `Your new password is: ${randomPass}`
            };

            await transporter.sendMail(mailOptions);

            return await PasswordModel.findOneAndUpdate({ userId: userId }, { $set: { password: hashedPassword } }, { new: true });
        } catch (error) {
            console.error('Wystąpił błąd podczas tworzenia danych:', error);
            throw new Error('Wystąpił błąd podczas tworzenia danych');
        }
    }

    public async changePassword(userId: string, oldPassword: string, newPassword: string) {
        try {
            const result = await PasswordModel.findOne({ userId: userId });
            console.log('find result', result);
            if (!result) {
                return false;
            }

            const match = await this.passwordsMatch(oldPassword, result.password);
            console.log('match', match);
            if (match) {
                return await PasswordModel.findOneAndUpdate({ userId: userId }, { $set: { password: newPassword } }, { new: true });
            }
            return false;
        } catch (error) {
            console.error('Wystąpił błąd podczas tworzenia danych:', error);
            throw new Error('Wystąpił błąd podczas tworzenia danych');
        }
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log('hash', hashedPassword)
        return hashedPassword;
    }

    async passwordsMatch(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    private async incLoginAttempts(user: any) {
        user.loginAttempts++;

        if(user.loginAttempts >= PasswordService.MAX_LOGIN_ATTEMPTS) {
            user.lockUntil = Date.now() + PasswordService.LOCK_MINUTES * 60 * 1000;
        }

        await user.save();
    }
}

export default PasswordService;
