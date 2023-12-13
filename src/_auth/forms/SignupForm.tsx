import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form"
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signUpValidationSchema } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/ui/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"


function SignupForm() {
    const { toast } = useToast();
    const { mutateAsync: createUserAccount, isPending: isCreateingUser } = useCreateUserAccount();
    const { mutateAsync: singInAccount, isPending: isSigningIn } = useSignInAccount();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
    const navigate = useNavigate();
    // 1. Define your form.
    const form = useForm<z.infer<typeof signUpValidationSchema>>({
        resolver: zodResolver(signUpValidationSchema),
        defaultValues: {
            username: "",
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof signUpValidationSchema>) {
        const newUser = await createUserAccount(values);

        if (!newUser) {
            return toast({
                title: 'Sign up failed, please try again'
            })
        }
        const session = await singInAccount({
            email: values.email,
            password: values.password,
        });

        if (!session) {
            return toast({ title: 'Sign in failed, try again ' });
        }

        const isLoggedIn = await checkAuthUser()

        if (isLoggedIn) {
            form.reset();
            navigate('/');
        } else {
            return toast({ title: 'Sign up failed, please try again' })
        }

    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <img src="/assets/images/logo.svg" alt="logo" />
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 ">Create a new account</h2>
                <p className="text-light-3 small-medium md:base-regular mt-2 ">To use snapgram ,Please enter your details </p>

                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="flex-col gap-5 w-full mt-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormLabel>name</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormLabel>User name</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input type="email" className="shad-input" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="shad-input" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="shad-button_primary w-full mt-4">
                        {isCreateingUser ? (
                            <div className="flex-center gap-2">
                                <Loader /> Loading ...
                            </div>
                        ) : "Sign up "
                        }
                    </Button>

                    <p className="text-small-regular text-light-2 text-center mt-2">
                        allready have an account?
                        <Link to="/sing-in"
                            className="text-primary-500 text-small-semibold ml-1">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    )
}

export default SignupForm