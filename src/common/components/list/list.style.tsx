import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ListTitle = styled('h1')`
    justify-content: center;
    flex-direction: column;
    text-align: center;
    font-weight: 100;
`;

type ListContainerProps = {
    verticle?: boolean;
};

export const ListContainer = styled('h1')<ListContainerProps>`
    display: flex;
    flex-direction: ${(props) => (props?.verticle ?? false ? 'column' : 'row')};
    padding: 15px;
    width: 100%;
    margin: 0 auto 0 auto;
`;

export const SubListContainer = styled('h1')`
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

export const RemoveButton = styled(IconButton)`
    float: right;
    border: none;
    background-color: transparent;
    color: #6a6af8;
    font-size: 1em;
    cursor: pointer;
`;
