import PetsList from '../components/PetsList';

const PetsPage = () => {
    return (
        <div>
            <div className="text-xl text-center mb-4">Pets Page</div>
            <div>
                <PetsList />
            </div>
        </div>
    );
};

export default PetsPage;
