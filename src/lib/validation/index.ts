import * as z from "zod"


export const signUpValidationSchema = z.object({
    name: z.string().min(2, { message: "To short" }),
    username: z.string().min(2, 'to short'),
    email: z.string().email(),
    password: z.string().min(8, 'password short')
})

export const singInValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'password short')
})