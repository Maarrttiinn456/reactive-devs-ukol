import { AiOutlineLoading } from 'react-icons/ai';

const LoadingSpinner = () => {
    return (
        <div className="max-w-xl mx-auto flex items-center justify-center min-h-96">
            {' '}
            <AiOutlineLoading className="animate-spin" />
        </div>
    );
};

export default LoadingSpinner;
