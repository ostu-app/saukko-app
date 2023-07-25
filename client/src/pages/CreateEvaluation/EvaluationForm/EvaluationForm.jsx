import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

// Import MUI
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { createTheme, ThemeProvider } from '@mui/material/styles';

function EvaluationForm() {
  const navigate = useNavigate();

  const currentDate = dayjs().format('DD.MM.YYYY');

  // Calendar pop up styling
  const theme = createTheme({
    palette: {
      primary: {
        main: '#0000BF',
      },
    },
    components: {
      MuiButtonBase: {
        styleOverrides: {
          root: {
           '&.Mui-selected': {
              borderRadius: '0px',
            },
           '&:not(.Mui-selected)': {
              borderRadius: '0px',
            },
          }
        }
      }
    }
  });

  return (
    <main className='evaluationForm__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='evaluationForm__container'>
        <div>Stepper here (waiting for update)</div>
        <h1>Lisää asiakkaan tiedot</h1>

        {/* Customer information form */}
        <form>
          <div className='form__firstName'>
            <label>Etunimi *</label>
            <input className='form-input' />
          </div>
          <div className='form__lastName'>
            <label>Sukunimi *</label>
            <input className='form-input' />
          </div>
          <div className='form__email'>
            <label>Sähköposti *</label>
            <input type='email' className='form-input' />
          </div>
          <div className='form__startDate'>
            <label>Asiakkuuden aloituspäivä *</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <DesktopDatePicker 
                  format='DD.MM.YYYY'
                  slotProps={{ 
                    textField: { placeholder: currentDate },
                  }}
                />
              </ThemeProvider>
            </LocalizationProvider>
          </div>
          <div className='form__endDate'>
            <label>Asiakkuuden lopetuspäivä *</label>
          </div>
          <div className='form__extensionEndDate'>
            <label>Täydennysjakson päättymispäivä *</label>
          </div>
          <div className='form__tasks'>
            <label>Työtehtäväsi *</label>
            <textarea className='form-input'/>
          </div>
          <div className='form__goals'>
            <label>Omat tavoitteesi *</label>
            <textarea className='form-input'/>
          </div>
        </form>

        <PageNavigationButtons /* handleBack={() => navigate(`/`)} */ handleForward={() => navigate(`/evaluation-workplace`)} forwardButtonText={'Seuraava'} />
      </section>
      <UserNav />
    </main>
  );
}

export default EvaluationForm;
