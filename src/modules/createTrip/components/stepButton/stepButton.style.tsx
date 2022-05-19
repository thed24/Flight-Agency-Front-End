import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LeftButton = styled(IconButton)`
    margin: auto;
    display: block;
    position: fixed;
    top: 50%;
    left: 7.5%;
    transform: scale(1.8);
    :hover {
        background-color: #f5f5f5;
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
        background-color: #f5f5f5;
    }
`;
