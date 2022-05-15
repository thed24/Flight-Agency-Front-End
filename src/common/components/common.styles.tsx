import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

export const MiddleContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    gap: 10px;
    width: 100%;
    min-width: 500px;
    height: 100%;
    min-height: 500px;
`;

export const SubTitle = styled.h3`
    font-family: 'Roboto', sans-serif;
    display: flex;
    font-weight: 500;
    justify-content: center;
`;

export const Title = styled.h1`
    font-family: 'Roboto', sans-serif;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding-top: 50px;
    padding-bottom: 10px;
`;
