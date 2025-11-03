import { Link } from 'react-router';
import AuthForm from '../components/AuthForm';

const RegisterPage = () => {
    return (
        <div>
            <div className="mb-8 text-center">
                <div className="mb-3">
                    <b>Registrujte</b> se prosím
                </div>
                <div>
                    Nebo se{' '}
                    <Link
                        to="/register"
                        className="underline hover:no-underline"
                    >
                        Registrujte
                    </Link>
                </div>
            </div>

            <div>
                <AuthForm mode="register" />
            </div>
        </div>
    );
};

export default RegisterPage;
