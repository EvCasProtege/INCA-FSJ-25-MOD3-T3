import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line react/prop-types
const ParentComponent = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                  ChatMessages
                </Typography>
                {children}
            </CardContent>
        </Card>
    </Box>
  );
};

export default ParentComponent;
