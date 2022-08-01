import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as SC from 'common/components/common.styles';

export const LeftButton = styled(IconButton)`
    margin: auto;
    display: block;
    position: fixed;
    top: 50%;
    left: 7.5%;
    transform: scale(1.8);
    :hover {
        color: #6ca7ff;
        background-color: transparent;
    }
`;

export const RightButton = styled(IconButton)`
    margin: auto;
    display: block;
    position: fixed;
    top: 50%;
    left: 90%;
    size: 50px;
    transform: scale(1.8);
    :hover {
        color: #6ca7ff;
        background-color: transparent;
    }
`;

export const ConfirmButton = styled(SC.Button)`
    margin: auto;
    display: block;
`;
