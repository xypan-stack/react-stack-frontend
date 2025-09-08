import React from 'react';
import { Card, Typography, Box, CardContent } from '@mui/material';
import GaugeChart from './GaugeChart';

interface WorkExperienceProps {
  relevantYears: number;
  totalYears: number;
  requestYears: number;
}


export default function WorkingExperience({ 
  relevantYears = 2.8, 
  totalYears = 3.4, 
  requestYears = 5 
}: WorkExperienceProps) {

  return (
    <Card sx={{ 
      maxWidth: 500,
      width: '100%',
      height: '400px',
      overflowY: 'auto',
    }}>
      <CardContent>
        <Typography variant="h6" sx={{ 
          fontWeight: 'bold', 
          textAlign: 'center', 
          mb: 2,
          color: '#333'
        }}>
          Working Experience
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <GaugeChart />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" sx={{ color: '#555' }}>0</Typography>
          <Typography variant="body2" sx={{ color: '#555' }}>
            Request Year(s): {requestYears}
          </Typography>
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ 
              width: 12, 
              height: 12, 
              backgroundColor: '#4caf50', 
              borderRadius: 1,
              mr: 1 
            }} />
            <Typography variant="body2" sx={{ color: '#333' }}>
              Relevant Year(s): {relevantYears}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 1, color: '#333' }}>
            Total Years of Work Experience: {totalYears}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}