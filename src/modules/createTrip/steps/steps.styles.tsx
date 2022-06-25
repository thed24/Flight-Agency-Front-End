import { styled } from '@mui/material/styles';

export const MapContainer = styled('div')`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    margin: 0 auto 10px;
    justify-content: center;
`;

export const MapSubContainer = styled('div')`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    gap: 30px;
    margin: auto;
    justify-content: center;
    align-items: center;
`;

export const MapControls = styled('div')`
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    grid-template-rows: 1fr;
    gap: 10px;
    margin: auto;
    justify-content: center;
    align-items: center;
`;
