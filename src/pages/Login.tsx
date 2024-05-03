import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Invalid password" }),
  })
  .superRefine(({ password }, ctx) => {
    if (
      !(
        password.match(/[A-Z]/g) &&
        password.match(/[a-z]/g) &&
        password.match(/[0-9]/g) &&
        !password.match(/[^A-Za-z0-9]/g)
      )
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Invalid password",
      });
    }
  });
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {}
  return (
    <main className="p-2 md:px-20 md:py-8 lg:px-32 lg:py-12 min-h-screen w-screen flex flex-col items-center gap-20">
      <img
        src="/Logo.svg"
        alt="Logo"
        className="w-[200px] h-[62px] object-cover self-start"
      />

      <div className="flex flex-col flex-1 space-y-10 w-full max-w-80">
        <div className="flex flex-col items-center gap-5">
          <h1 className="font-bold text-4xl">Login</h1>
          <p className="text-xl">Welcome back to CardiAI</p>
        </div>
        <Form {...form}>
          <form
            className="flex flex-col h-full gap-10"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none w-full"
                        placeholder="Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <label className="flex items-center border pr-2">
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none w-full border-none"
                          placeholder="Password"
                          {...field}
                        />
                        <Eye
                          className="hover:text-primary-blue cursor-pointer"
                          onClick={() => setShowPassword((prev) => !prev)}
                        />
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Button className="bg-primary-blue hover:bg-primary-blue">
                {" "}
                Login
              </Button>
              <Separator className="bg-[#726C6C] flex items-center justify-center before:content-['or'] before:bg-white before:px-1" />
              <Button
                type="button"
                asChild
                className="bg-secondary-blue hover:bg-secondary-blue text-primary-blue"
              >
                <Link to={"/signup"}>Sign up</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default Login;