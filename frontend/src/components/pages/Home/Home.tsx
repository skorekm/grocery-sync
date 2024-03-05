import { Link, Navigate } from 'react-router-dom';
import { useUser } from '@/context/user';

export const Home = () => {
  const { user, loading } = useUser();
  console.log('user', user, 'loading', loading);
  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Hello there</h1>
        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        <Link to="login" className="btn btn-primary">Login</Link>
      </div>
    </div>
  );
}