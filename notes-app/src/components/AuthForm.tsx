import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import type { NewUser } from '../types/global';
import Button from './Button';

type AuthFormProps = {
    mode: 'register' | 'login';
};
/*
type A =
    | {
          mode: 'register';
          username: string;
          password: string;
          firstName: string;
      }
    | {
          mode: 'login';
          username: string;
          password: string;
      };
*/

const AuthForm = ({ mode }: AuthFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { loginUser, registerUser } = useAuth();

    /*
    const a = (x: A) => {
        if (x.mode === 'login') {
            x.username = 'aaa';
        }
    };
    */

    const handleForm = async (e: FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            return alert('vyplňte prosím jméno i heslo');
        }

        const userData: NewUser = {
            username,
            password,
        };

        if (mode === 'login') {
            try {
                await loginUser(userData);
                navigate('/');
            } catch (error) {
                alert('Nepodařilo se přihlásit');
            }
        } else {
            try {
                await registerUser(userData);
                navigate('/login');
            } catch (error) {
                alert('Nepodařilo se registrovat');
            }
        }
    };

    return (
        <div className="flex justify-center">
            <form className="w-full max-w-md space-y-6" onSubmit={handleForm}>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="username">Uživatelské jméno</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border px-3 py-2"
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="password">Heslo</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border px-3 py-2"
                    />
                </div>

                <div className="flex justify-center">
                    <Button type="submit" variant="gray" text="Odeslat" />
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
