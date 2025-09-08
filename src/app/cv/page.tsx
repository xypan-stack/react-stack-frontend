'use client'
import { Box, Typography } from '@mui/material';
import MatchedSkill from '../../component/MatchedSkill';
import ScoreCard from '../../component/ScoreCard';
import Remarks from '../../component/Remarks';
import MachedOpening from '../../component/MachedOpening';
import WorkingExperience from '../../component/WorkingExperience';
import RadarChart from '../../component/RadarChart';

interface Score{
  name:string;
  score:number;
}

const scores:Score[] = [
  {name: 'Data Analytics Consultant', score:63},
  {name: 'Senior Manager - Marketing and Communications', score:55},
  {name: 'System Analyst', score:33},
]

export default function CvPage(){

  return(
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2,gap:2,flexDirection:'row' }}>
      {/* <MatchedSkill /> */}

      {/* <ScoreCard /> */}

      {/* <Remarks /> */}

      <MachedOpening />

      <WorkingExperience 
        relevantYears={2.8}
        totalYears={3.4}
        requestYears={5}
      />
      <RadarChart/>
    </Box>
  );
};
