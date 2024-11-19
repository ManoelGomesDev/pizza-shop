import { Helmet } from "react-helmet-async";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {z} from 'zod'
import { toast } from 'sonner'


const signInForm = z.object({
    email: z.string().email()
})

type SignInForm = z.infer<typeof signInForm>

import { useForm } from 'react-hook-form'

export function SignIn() {

 const { register, handleSubmit, formState: { isSubmitting }} = useForm<SignInForm>()

 async function handleSignIn(data: SignInForm){
    try{
        console.log(data)

 await new Promise((resolve) => setTimeout(resolve, 2000))
 toast.success('Enviamos um link de autenticação para seu e-mail', {
    action: {
        label: 'Reenviar link',
        onClick: () => handleSignIn(data)
    }
 })

    }catch(error){
   toast.error('Crendeciias inválidas')
 }
}

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col gap-4 ">
            <div>
                <Label htmlFor="email">Seu e-mail</Label>
                <Input id="email" type="email" {...register('email')}  />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}  >Acessar painel</Button>
          </form>
        </div>
      </div>
    </>
  );
}
