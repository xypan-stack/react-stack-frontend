import ContainedCard from "./ContainedCard"
import { Typography, Box } from "@mui/material";

interface RemarkText{
  item:string;
  text:string;
}
const text:RemarkText[]= [
  {item: 'Salary',text:'The candidate did not provide expected salary information.'},
  {item: 'Notice Period', text:'The candidate is available to join within 30 days.'},
  {item: 'Relocation', text:'The candidate is open to relocation for the right opportunity.'},
  {item: 'Interview Availability', text:'The candidate is available for interviews on weekdays after 6 PM and on weekends.'}
]

export default function Remarks(){
  return(
    <ContainedCard title="Remarks">
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