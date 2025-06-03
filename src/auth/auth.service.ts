import { sql } from "drizzle-orm";
import db from "../Drizzle/db";
import { TIUser, TSUser, CustomerTable, TICustomer } from "../Drizzle/schema";

export const createUserService = async (user: TICustomer) => {
    await db.insert(CustomerTable).values(user);
    return "User created successfully";
}

export const verifyUserService = async (email: string) => {
    await db.update(CustomerTable)
        .set({ isVerified: true,verificationCode: null })
        .where(sql`${CustomerTable.email} = ${email}`);

}
export const getUserByEmailService = async (email: string)=>{
    return await db.query.CustomerTable.findFirst({
        where: sql`${CustomerTable.email} = ${email}`
    })

}


export const userLoginService = async (user: TSUser) => {
    const { email } = user;

    return await db.query.CustomerTable.findFirst({
        columns: {
            customerID: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            address: true
        }, where: sql`${CustomerTable.email} = ${email}`
    })
}