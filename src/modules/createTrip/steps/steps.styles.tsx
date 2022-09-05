import { styled } from '@mui/material/styles';

export const MapContainer = styled('div')<{ solo: boolean }>`
    display: grid;
    grid-template-columns: ${(props) => (props.solo ? '1fr' : '1fr 1fr')};
    grid-template-rows: 1fr;
    gap: 30px;
    flex-wrap: nowrap;
`;

export const MapSubContainer = styled('div')`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    gap: 30px;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    align-items: center;
`;

export const MapControls = styled('div')`
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    grid-template-rows: 1fr;
    gap: 10px;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    align-items: center;
`;
