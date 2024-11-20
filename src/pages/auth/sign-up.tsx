import { Helmet } from "react-helmet-async";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {z} from 'zod'
import { toast } from 'sonner'


const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone:z.string(),
    email: z.string().email()
})

type SignUpForm = z.infer<typeof signUpForm>

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {


    const navigate = useNavigate()

 const { register, handleSubmit, formState: { isSubmitting }} = useForm<SignUpForm>()

 async function handleSignUp(data: SignUpForm){
    try{
        console.log(data)

 await new Promise((resolve) => setTimeout(resolve, 2000))
 toast.success('Restaurante cadastrado com sucesso', {
    action: {
        label: 'Login',
        onClick: () => navigate('/sign-in')
    }
 })

    }catch(error){
   toast.error('Erro ao cadastrar restaurante')
 }
}

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
      <Button variant={"ghost"} asChild className="absolute right-4 top-4">
          <Link to="/sign-in" >
            Fazer login
          </Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-4 ">
            <div>
                <Label htmlFor="restaurantName">Nome do estabelicimento</Label>
                <Input id="restaurantName" type="text" {...register('restaurantName')}  />
            </div>
            <div>
                <Label htmlFor="managerName">Seu nome</Label>
                <Input id="managerName" type="text" {...register('managerName')}  />
            </div>
            <div>
                <Label htmlFor="email">Seu e-mail</Label>
                <Input id="email" type="email" {...register('email')}  />
            </div>
            <div>
                <Label htmlFor="phone">Seu celular</Label>
                <Input id="phone" type="tel" {...register('phone')}  />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}  >Finalizar cadastro</Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">Ao continuar , você concorda com <a className="underline underline-offset-4">termos de servicos</a> e <a className="underline underline-offset-4">politicas de privacidade</a></p>
          </form>
        </div>
      </div>
    </>
  );
}