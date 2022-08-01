import { styled } from '@mui/material/styles';

export const FormContainer = styled('form')`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    max-width: 400px;
    margin: auto;
`;

export const AuthButton = styled('input')`
    border: 2px solid #6ca7ff;
    &:hover {
        background-image: linear-gradient(to right, #6ca7ff, #6ca7ff);
        color: white;
    }
    font: inherit;
    height: 40px;
    margin-top: 20px;
    padding: 0 20px;
    width: 100%;
    cursor: pointer;
`;
