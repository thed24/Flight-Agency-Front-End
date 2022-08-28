import { Button as ButtonMUI, Typography } from '@mui/material';
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

export const SubTitle = styled(Typography)`
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding-top: 10px;
`;

SubTitle.defaultProps = {
    variant: 'subtitle1',
    fontWeight: 300,
};

export const Title = styled(Typography)`
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding-top: 40px;
`;

Title.defaultProps = {
    variant: 'h4',
    fontWeight: '300',
};

export const Button = styled(ButtonMUI)`
    border: 2px solid #6ca7ff;
    padding: 10px;
    ${({ variant }) => {
        if (variant === 'contained') {
            return `
                background-color: #6ca7ff;
                color: white;
                &:hover {
                    background-color: #4186d4;
                }
            `;
        }
        return `
            &:hover {
                background-image: linear-gradient(to right, #6ca7ff, #6ca7ff);
                color: white;
            }
        `;
    }}
`;
