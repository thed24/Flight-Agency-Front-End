import { styled } from '@mui/material/styles';

export const ModalContainer = styled('div')`
    background-color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    border: 3px solid #558dd6;
    box-shadow: 24;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 25px;
`;

export const DateTimePicker = styled('input')`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;
