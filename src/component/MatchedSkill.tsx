import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ContainedCard from './ContainedCard';

interface Skill {
  name: string;
  matched: boolean;
}

const sampleSkills: Skill[] = [
  { name: 'Microsoft Powerbi', matched: true },
  { name: 'Data Bricks', matched: true },
  { name: 'Etl Design', matched: true },
  { name: 'Azure Data Factory', matched: false },
  { name: 'Data Lake', matched: false }
];

const skills: Skill[] = sampleSkills;

const matchedCount = skills.filter(skill => skill.matched).length;
const totalCount = skills.length;


export default function MatchedSkill(){
    return(
        <ContainedCard title={`Skills Matched: ${matchedCount}/${totalCount}`}>
        <List>
          {skills.map((skill, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                {skill.matched ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <CancelIcon color="error" />
                )}
              </ListItemIcon>
              <ListItemText 
                primary={skill.name} 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    fontWeight: 'medium',
                    color: '#333'
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </ContainedCard>
    )

}