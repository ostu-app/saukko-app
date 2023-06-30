// Import react packages & dependencies
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNumbers from '../../../components/PageNumbers/PageNumbers';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import Button from '../../../components/Button/Button';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import useUnitsStore from '../../../unitsStore';
import useStore from '../../../useStore';
import DegreeContext from '../../../utils/context/DegreeContext';

function ConfirmSelection() {
  const navigate = useNavigate();

  // Set path & get degree units from DegreeContext
  const { setDegreeId, degree, degreeFound } = useContext(DegreeContext);
  const params = useParams();
  
  useEffect(() => {
    setDegreeId(params.degreeId);
  }, []);

  // Get checked units from unitsStore
  const checkedUnits = useUnitsStore((state) => state.checkedUnits);

  // Pop-up logic
  const [isOpen, setIsOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsOpen(true);
  };

  const handlePopupClose = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event) => {
    const popupContainer = document.querySelector('.popup__container');
    const clickedElement = event.target;
  
    if (popupContainer && !popupContainer.contains(clickedElement)) {
      handlePopupClose();
    }
  };

  // NotificationModal logic
  const {
    openNotificationModal,
    setOpenNotificationModal,
  } = useStore();

  const handleNotificationModalOpen = () => {
    setOpenNotificationModal(true);
  };

  return (
    <main className='confirmSelection__wrapper'>
        <WavesHeader title='Saukko' secondTitle={degreeFound && degree.name.fi} />
        <section className='confirmSelection__container'>
          <PageNumbers activePage={3}/>
          <h1 className='confirmSelection__container--title'>Vahvista pyyntö</h1>
          <p className='confirmSelection__container--desc'>{`Olet hakemassa ${degreeFound && degree.name.fi} osien suoria näyttöjä`} </p>
          <h1 className='confirmSelection__container--secondtitle'>Valitsemasi tutkinnonosat</h1>
          <div className='confirmSelection__container--units'>
            {console.log(console.log('checked units confirm selection page: ', checkedUnits))}
            {checkedUnits?.map((unit) => (
              <SelectUnit key={unit._id} unit={unit} allUnits={degreeFound && degree.units}/>
            ))}
          </div>
          <PageNavigationButtons 
            handleBack={() => navigate(`/degrees/${degree._id}/units`)} 
            handleForward={handlePopupOpen} 
            forwardButtonText={'Valitse tutkinnonosat'}
          />
        </section>
        <UserNav />

      {/* Pop-up confirmation component */}
      <>
        {isOpen && (
          <div className="popup__wrapper" onClick={handleOutsideClick}>
            <div className="popup__container">
              <h2 className="popup__container--title">Haluan suorittaa {degree.name.fi} -osien suoria näyttöjä</h2>
              <p className="popup__container--text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              </p>
              <div className="popup__container--buttons">
                <div className="popup__container--buttons-confirm" onClick={() => { handlePopupClose(); handleNotificationModalOpen();}}>
                  <Button text="Vahvista"/>
                </div>
                <div className="popup__container--buttons-cancel" onClick={handlePopupClose}>
                  <Button text="Peruuta"/>
                </div>
              </div>
            </div>
          </div>
        )}
      </>

      <NotificationModal
        type='success'
        title='Pyyntö lähetetty'
        body='Lorem ipsum, dolor sit amet consectetur adipisicing elit'
        open={openNotificationModal}
      />

    </main>
  );
}

export default ConfirmSelection;
