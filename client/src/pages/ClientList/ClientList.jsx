import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import useStore from '../../store/zustand/formStore';
import useEvaluationStore from '../../store/zustand/evaluationStore';
import useUnitsStore from '../../store/zustand/unitsStore';
import ExternalApiContext from '../../store/context/ExternalApiContext';
import InternalApiContext from '../../store/context/InternalApiContext';
import useHeadingStore from '../../store/zustand/useHeadingStore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQuery } from '@tanstack/react-query';
import { fetchAllUsers } from '../../api/user';

function ClientList() {
  const navigate = useNavigate();

  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchAllUsers(),
  });

  const customers = users.filter((user) => user.role === "customer")
  const activeCustomers = customers.filter((user) => user.isArchived === false)
  const archivedCustomers = customers.filter((user) => user.isArchived === true)

  useEffect(() => {
    setSiteTitle("Asiakkuudet")
    setSubHeading("")
    setHeading("Asiakkuuksien hallinnointi")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  return (
    <div className='clientList__wrapper' id='main-wrapper'>
      <section className='clientList__container'>
        <Accordion sx={{ backgroundColor: "#E6E6E6" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Aktiiviset asiakkuudet
          </AccordionSummary>
          <AccordionDetails>
            {
              activeCustomers.map((user) => <p>{ user.firstName } { user.lastName }</p>)
            }
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ backgroundColor: "#E6E6E6" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Arkistoidut asiakkuudet
          </AccordionSummary>
          <AccordionDetails>
            {
              archivedCustomers.map((user) => <p>{ user.firstName } { user.lastName }</p>)
            }
          </AccordionDetails>
        </Accordion>

      </section>
    </div>
  );

}

export default ClientList;
