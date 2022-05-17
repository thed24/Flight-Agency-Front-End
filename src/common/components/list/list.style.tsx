import styled from '@emotion/styled';

export const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 15px;
    width: 100%;
    margin: 0 auto 0 auto;
`;

export const SubListContainer = styled.div`
    text-align: center;
    align-items: center;
    margin: 0 auto 0 auto;
    padding-left: 10px;
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
`;

export const RemoveButton = styled.button`
    float: right;
    border: none;
    background-color: transparent;
    color: blue;
    font-size: 1em;
    cursor: pointer;
`;
