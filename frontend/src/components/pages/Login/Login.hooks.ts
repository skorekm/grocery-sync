import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "@/context/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormInputsInterface } from "./Login.interface";
import { registerFormSchema } from "./utils";

export const useLogin = () => {
  const navigate = useNavigate();
  const { userDispatch } = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputsInterface>({ resolver: zodResolver(registerFormSchema) });
  const onSubmit: SubmitHandler<RegisterFormInputsInterface> = (data) => {
    fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(data) })
      .then(response => response.json())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((data: any) => {
        userDispatch({ type: 'setUser', user: data.user });
        userDispatch({ type: 'setToken', token: data.token });
        navigate('/');
      })
      .catch(error => console.error(error));
  };

  return {
    register,
    errors,
    submitForm: handleSubmit(onSubmit)
  }
}