import { useState, type FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import Button from './Button';
import { loginUser, type ApiResponse } from '../api/api';
import { useNavigate } from 'react-router';

type AuthFormProps = {
    mode: 'register' | 'login';
};

const AuthForm = ({ mode }: AuthFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: () => {
            return loginUser({
                password,
                username: email,
            });
        },
    });

    const handleForm = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            return alert('vyplňte prosím jméno i heslo');
        }

        const data = (await mutateAsync()) as ApiResponse;

        window.localStorage.setItem('accessToken', data.message!);

        navigate('/');
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <Button
                        type="submit"
                        variant="gray"
                        text={isPending ? '...' : 'Odeslat'}
                        disabled={isPending}
                    />
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
