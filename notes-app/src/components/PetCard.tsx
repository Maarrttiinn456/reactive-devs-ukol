import type { Pet } from '../api/api';

type PetCardProps = {
    pet: Pet;
};

const PetCard = ({ pet }: PetCardProps) => {
    return (
        <div className="p-6 border rounded-md space-y-2">
            <div>id: {pet?.id} </div>
            <div className="clamp-1">Name: {pet?.name}</div>
            <div className="bg-gray-200 px-2 py-0.5 w-fit">{pet.status}</div>
        </div>
    );
};

export default PetCard;
