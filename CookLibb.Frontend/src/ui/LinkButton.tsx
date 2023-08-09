import { Link, useNavigate } from 'react-router-dom';

interface LinkButtonProps {
  children: React.ReactNode;
  to: string;
}

function LinkButton({ children, to }: LinkButtonProps) {
  const navigate = useNavigate();
  const className = 'text-blue-500 hover:text-blue-900 hover:underline';
  if (to === '-1') {
    return (
      <button onClick={() => navigate(-1)} className={className}>
        &larr; Go back
      </button>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
