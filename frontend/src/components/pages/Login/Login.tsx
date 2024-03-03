import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import classNames from "classnames";

interface Inputs {
  email: string,
  password: string
}

const schema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' })
});

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <section className="hero-content text-center">
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-3xl">Login</h2>
          <p>to <strong>Grocery Sync</strong> and create, manage grocery lists</p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="w-full my-4">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input type="text" className={classNames({ 'input-error': errors.email },  'input input-bordered')} {...register('email', { required: true })} />
                <div className="label">
                {errors.email && <span className="label-text-alt text-error">{errors.email?.message}</span>}
                </div>
              </label>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input type="password" className={classNames({ 'input-error': errors.password },  'input input-bordered')} {...register('password', { required: true })} />
                <div className="label">
                  {errors.password && <span className="label-text-alt text-error">{errors.password?.message}</span>}
                </div>
              </label>
            </div>
            <div className="card-actions justify-end w-full">
              <button type="submit" className="btn btn-primary w-full">Login</button>
            </div>
          </form>
          <hr />
          <div className="justify-center card-actions">
            <Link to="/register" className="btn btn-link">Forgot password?</Link>
            <Link to="/register" className="btn btn-link">Create account</Link>
          </div>
        </div>
      </div>
    </section>
  )
}