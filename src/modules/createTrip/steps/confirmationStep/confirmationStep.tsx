import { Divider, SC } from 'common/components';
import { ConfirmationList } from 'modules/createTrip/components';
import { useTrip } from 'modules/createTrip/context';

export const ConfirmationStep = () => {
    const { trip } = useTrip();

    return (
        <SC.Container>
            <SC.SubTitle>
                Your current trip itinary for your trip to {trip.destination}
            </SC.SubTitle>

            <Divider />
            <ConfirmationList trip={trip} />
            <Divider />
        </SC.Container>
    );
};
