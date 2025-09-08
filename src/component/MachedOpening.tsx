import { Typography, Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState } from 'react';

interface Score{
  name: string;
  score: number;
  isApplied?: boolean;
}

const scores: Score[] = [
  {name: 'Data Analytics Consultant', score: 63, isApplied: true},
  {name: 'Senior Manager - Marketing and Communications', score: 37},
  {name: 'System Analyst', score: 33},
]

export default function MachedOpening(){
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  
  const handleRowClick = (index: number, name: string) => {
    setSelectedRow(index);
    console.log(name);
  };

  return(
    <Card 
      sx={{ 
        maxWidth: 500,
        width: '100%',
        height:'400px',
        overflowY:'auto'
    }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                  Matched Openings
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                  Score
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {scores.map((score, index) => (
              <TableRow 
                key={index} 
                onClick={() => handleRowClick(index, score.name)}
                sx={{ 
                  backgroundColor: selectedRow === index ? '#e0e0e0' : 'inherit',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: selectedRow === index ? '#e0e0e0' : '#f5f5f5',
                  }
                }}
              >
                <TableCell>
                  <Typography sx={{ fontSize: '1rem' }}>
                    {score.name} {score.isApplied && <span style={{ marginLeft: '4px' }}>*</span>}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography sx={{ fontWeight: 'medium', fontSize: '1rem' }}>
                    {score.score}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ p: 1, pl: 2 }}>
        <Typography variant="caption">
          * = Applied Position(s)
        </Typography>
      </Box>
    </Card>
  )
}