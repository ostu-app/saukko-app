// import * as React from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SimpleAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          sx={{ backgroundColor: '#FFF4B4' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        
        >

          <Typography sx={{ fontWeight: '600' }}>Kesken</Typography>

        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ display: 'flex', flexDirection: 'column' }}>
            <a href="">Alex Tenorio</a>
            <a href="">Oea Romana</a>
            <a href="">Emiliya Pere</a>

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          sx={{ backgroundColor: '#efeff0' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontWeight: '600' }} >Aloittamatta</Typography>

        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ display: 'flex', flexDirection: 'column' }}>
            <a href="">Alex Tenorio</a>
            <a href="">Oea Romana</a>
            <a href="">Emiliya Pere</a>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          sx={{ backgroundColor: '#E2F5F3' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >

          <Typography sx={{ fontWeight: '600' }}>Suorittanut</Typography>

        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ display: 'flex', flexDirection: 'column' }}>
            <a href="">Alex Tenorio</a>
            <a href="">Oea Romana</a>
            <a href="">Emiliya Pere</a>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}