import { Button, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const OverlayList = styled(List)`
    position: absolute;
    top: 0;
    right: 0;
    width: 25%;
    height: 100%;
    background-color: rgba(158, 219, 255, 0.7);
    border-radius: 10px;
    border: 1px solid #558dd6;
    z-index: 1;
    overflow-y: scroll;
    overflow-x: hidden;
`;

export const OverlayListItem = styled(ListItem)`
    :hover {
        background-color: rgba(158, 219, 255, 0.6);
        cursor: pointer;
    }
`;

export const OverlayButton = styled(Button)`
    position: absolute;
    width: 25%;
    height: 10%;
    background-color: rgba(158, 219, 255, 1);
    :hover {
        background-color: rgba(158, 219, 255, 1);
    }
    border-radius: 0;
    border-top: 2.5px solid #377cd6;
    border-bottom: 2px solid #558dd6;
    border-left: 2px solid #558dd6;
    border-right: 2px solid #558dd6;
    margin-right: 2%;
    width: 23%;
    top: 0;
    right: 0;
    z-index: 2;
`;

export const RelativeContainer = styled('div')`
    position: relative;
    height: 50vh;
    width: 80vh;
`;
