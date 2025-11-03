import { Link } from 'react-router';
import AuthForm from '../components/AuthForm';

const LoginPage = () => {
    return (
        <div>
            <div className="mb-8 text-center">
                <div className="mb-3">
                    <b>Přihlašte </b>se prosím
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
                <AuthForm mode="login" />
            </div>
        </div>
    );
};

export default LoginPage;
