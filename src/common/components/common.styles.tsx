import { styled } from '@mui/material/styles';

export const Container = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

export const MiddleContainer = styled('div')`
    display: flex;
    flex-direction: column;
    margin: auto;
    gap: 10px;
    width: 100%;
    min-width: 500px;
    height: 100%;
    min-height: 500px;
`;

export const SubTitle = styled('h3')`
    display: flex;
    font-weight: 300;
    justify-content: center;
    padding-bottom: 20px;
`;

export const Title = styled('h1')`
    justify-content: center;
    flex-direction: column;
    text-align: center;
    font-weight: 100;
    padding-top: 40px;
`;
