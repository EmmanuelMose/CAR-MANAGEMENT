import  db  from '../Drizzle/db';
import { CustomerTable } from '../Drizzle/schema';
import { eq } from 'drizzle-orm';

export const createUserService = async (user: any) => {
    return db.insert(CustomerTable).values(user).returning().then(res => res[0]);
};

export const getUserByEmailService = async (email: string) => {
    return db.query.CustomerTable.findFirst({
        where: eq(CustomerTable.email, email),
    });
};

export const verifyUserService = async (email: string) => {
    return db.update(CustomerTable)
        .set({ isVerified: true, verificationCode: null })
        .where(eq(CustomerTable.email, email));
};

export const userLoginService = async ({ email }: { email: string }) => {
    return db.query.CustomerTable.findFirst({
        where: eq(CustomerTable.email, email),
    });
};
