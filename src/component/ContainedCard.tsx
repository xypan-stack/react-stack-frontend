import { FC, ReactNode } from 'react';
import { Box, Card, CardContent, CardHeader, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

interface ContainedCardProps {
  title: string;
  children: ReactNode;
}

const ContainedCard: FC<ContainedCardProps> = ({ title, children }) => {
  return(
    <Card
      sx={{
          maxWidth: 500,
          width: '100%',
          height:'400px',
          overflowY:'auto'}}>
      <CardHeader 
        title={title} 
        sx={{
          backgroundColor: '#070630', 
          color: 'white',
          '& .MuiCardHeader-title': { 
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }
        }}
      />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default ContainedCard;
