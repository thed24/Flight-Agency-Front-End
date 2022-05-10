import { CreateTripProvider } from 'modules/createTrip/context';
import CreateTrip from 'modules/createTrip/createTrip';
import { NextPage } from 'next';

const CreateTripRedirect: NextPage = () => (
    <CreateTripProvider>
        <CreateTrip />
    </CreateTripProvider>
);

export default CreateTripRedirect;
