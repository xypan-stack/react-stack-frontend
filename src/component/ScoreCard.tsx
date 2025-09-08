import { Typography,Box } from '@mui/material';
import ContainedCard from './ContainedCard';

interface Score{
  name:string;
  score:number;
}

interface ScoreText{
  item:string;
  text:string;
}

const scores:Score[] = [
  {name: 'Data Analytics Consultant', score:63},
  {name: 'Senior Manager - Marketing and Communications', score:55},
  {name: 'System Analyst', score:33},
]
const text:ScoreText[]= [
  {item:'Summary', text:' The candidate demonstrates a solid foundation in data integration, automation, and stakeholder management, along with practical experience in data analytics solutions such as Data Bricks and Power BI. However, they do not meet the position’s 5 - year experience requirement, having just 3 years in relevant roles. Moreover, there is no indication of cloud migration expertise, which is a critical aspect of this role. While their educational background in Financial Technology and Business Analysis bolsters their technical capabilities, the deficiency in required work experience and cloud migration exposure stands out as significant drawbacks for this position.'},
  {item:'Data Analytics and Automation',text:'The candidate actively applied data analytics and automation skills to optimize business processes. The candidate utilized Python and SQL for data extraction, transformation, and loading (ETL) operations, and employed Power BI to develop dynamic dashboards that improved stakeholder access to key performance metrics. Furthermore, they automated routine reporting tasks via Azure Data Factory, cutting down manual workload by roughly 30% and enhancing data accuracy.'}
]

const bestMatch = scores.reduce((prev, current) => (prev.score > current.score) ? prev : current);
export default function ScoreCard(){

  return(
    <ContainedCard title={`Score: ${bestMatch.score}/100`}>
      <Box sx={{ 
        height: '100%', 
        paddingRight: '10px'
      }}>
        {text.map((t, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontSize:'1.1rem', mb: 0.5, fontWeight: 'bold' }}>
              {t.item}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1rem' }}>
              {t.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </ContainedCard>
  )



}