// Import react packages
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import libraries
import Pagination from '@mui/material/Pagination';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import Stepper from '../../../components/Stepper/Stepper';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import ExternalApiContext from '../../../store/context/ExternalApiContext';
import Searchbar from '../../../components/Searchbar/Searchbar';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

function DegreeUnits() {
  const navigate = useNavigate();

  // Set path & get degree from ExternalApiContext
  const { setDegreeId, degreeId, degree, degreeFound } = useContext(ExternalApiContext);
  const params = useParams();

  useEffect(() => {
    setDegreeId(params.degreeId);
  }, []);

  // Save degree units to state once degree is fetched
  const degreeUnits = degree.units;
  const [filteredUnits, setFilteredUnits] = useState(degreeUnits);

  useEffect(() => {
    setFilteredUnits(degreeUnits);
  }, [degree]);

  // Searchbar logic
  const handleSearch = (event) => {
    setPage(1); // Reset to the first page
    setFilteredUnits(
      degree.units.filter((unit) =>
        unit.name.fi.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  // Pagination logic
  const [page, setPage] = useState(1);
  const unitsPerPage = 4;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const indexOfLastUnit = page * unitsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - unitsPerPage;
  const currentUnits = filteredUnits?.slice(indexOfFirstUnit, indexOfLastUnit);

  // Labels and urls for stepper
  const stepperData = [
    {
      label: 'Tutkinto-tiedot',
      url: `/degrees/${degreeId}`
    },
    {
      label: 'Valitse tutkinnonosat',
      url: `/degrees/${degreeId}/units`
    },
    {
      label: 'Määritä tehtävät',
      url: `/degrees/${degreeId}/units/tasks`
    },
    {
      label: 'Yhteenveto',
      url: `/degrees/${degreeId}/units/confirm-selection`
    },
  ];

  return (
    <main className='degreeUnits__wrapper'>
      <WavesHeader title='Saukko' secondTitle={degreeFound && degree.name.fi} />
      <section className='degreeUnits__container'>
        <Stepper
          activePage={2}
          totalPages={4}
          data={stepperData}
        />
        <h1>Valitse tutkinnon osat</h1>
        <Searchbar
          handleSearch={handleSearch}
          placeholder={'Etsi tutkinnonosat'}
        />

        <div className='degreeUnits__container--units'>
          {currentUnits
            ? currentUnits.map((unit) => (
                <SelectUnit
                  key={unit._id}
                  unit={unit}
                  allUnits={degree.units}
                />
              ))
            : 'ei dataa APIsta'}
        </div>

        <Pagination
          count={
            filteredUnits && Math.ceil(filteredUnits.length / unitsPerPage)
          }
          page={page}
          onChange={handlePageChange}
        />

        <PageNavigationButtons
          handleBack={() => navigate(`/degrees/${degree._id}`)}
          handleForward={() =>
            navigate(`/degrees/${degreeId}/units/tasks`)
          }
          forwardButtonText={'Seuraava'}
        />
      </section>
      <UserNav />
    </main>
  );
}

export default DegreeUnits;