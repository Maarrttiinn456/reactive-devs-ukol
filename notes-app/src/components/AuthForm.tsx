import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import type { NewUser } from '../types/global';
import Button from './Button';

type AuthFormProps = {
    mode: 'register' | 'login';
};

const AuthForm = ({ mode }: AuthFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleForm = async (e: FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            return alert('vyplňte prosím jméno i heslo');
        }

        const userData: NewUser = {
            username,
            password,
        };
    };

    return (
        <div className="flex justify-center">
            <form className="w-full space-y-6" onSubmit={handleForm}>
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
