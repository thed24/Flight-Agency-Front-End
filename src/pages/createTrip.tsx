import { NextPage } from 'next';
import CreateTrip from 'modules/createTrip/createTrip';

const CreateTripRedirect: NextPage = () => {
    // @ts-ignore
    return <CreateTrip />;
};

export default CreateTripRedirect;
