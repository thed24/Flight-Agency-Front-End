import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { theme } from 'common/utilities/theme';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <Card
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            sx={{
                minWidth: '100%',
                minHeight: '80%',
                maxHeight: '80%',
                marginTop: '20px',
                border: `3px solid ${theme.palette.primary.main}`,
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.4)',
            }}
            {...other}
        >
            {value === index && (
                <Box textAlign="center" sx={{ paddingTop: 4 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </Card>
    );
};
