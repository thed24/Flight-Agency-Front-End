import styled from '@emotion/styled';

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    max-width: 400px;
    margin: auto;
`;

export const AuthButton = styled.input`
    background: #fafafa;
    border: 1px solid #bababa;
    border-radius: 4px;
    color: #000;
    font-size: 16px;
    font-weight: 600;
    height: 40px;
    margin-top: 20px;
    padding: 0 20px;
    text-transform: uppercase;
    width: 100%;
    cursor: pointer;
`;
