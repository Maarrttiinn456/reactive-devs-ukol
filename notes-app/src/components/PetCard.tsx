import type { Pet } from '../types/global';

type PetCardProps = {
    pet: Pet;
};

const PetCard = ({ pet }: PetCardProps) => {
    return (
        <div className="p-6 border rounded-md space-y-2">
            <div>id: {pet?.id} </div>
            <div>category: {pet.category?.name}</div>
            <div className="bg-gray-200 px-2 py-0.5 w-fit">{pet.status}</div>
            {!!pet.tags?.length && (
                <div>
                    <div>Tags:</div>
                    {pet.tags.map((tag) => (
                        <div key={tag.id}>{tag.name}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PetCard;
