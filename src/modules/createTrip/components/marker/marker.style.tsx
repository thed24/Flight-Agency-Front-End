import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import { theme } from 'common/utilities/theme';

export const MarkerContainer = styled('div')`
    border: 3px solid #558dd6;
    box-shadow: 24;
    border-radius: 10px;
    width: 10vw;
    background-color: ${theme.palette.primary.main};
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        transition: 0.2s;
        border: 5px solid ${theme.palette.primary.main};
    }
`;

export const MarkerTop = styled(Card)`
    width: '100%';
    background-color: 'white';
    font-weight: bold;
    padding: 5px;
    border-radius: 5px 5px 0px 0px;
    border-color: ${theme.palette.primary.main};
    border: 5px;
`;

export const MarkerBottom = styled(Card)`
    width: '100%';
    background-color: ${theme.palette.primary.main};
    padding: 5px;
    border-radius: 0px 0px 5px 5px;
    border-color: ${theme.palette.primary.main};
    border: 5px;
`;
