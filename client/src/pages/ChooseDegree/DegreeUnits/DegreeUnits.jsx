// Import react packages & dependencies
import React, { useState } from "react";
import { Icon } from "@iconify/react";

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from "../../../components/UserNav/UserNav";
import PageNumbers from "../../../components/PageNumbers/PageNumbers";

// import temporary data
import { units } from "./unitsTempData";

function DegreeUnits() {

  const [checkedUnits, setCheckedUnits] = useState([]);

  const handleCheckboxChange = (unitId) => {
    if (checkedUnits.includes(unitId)) {
      setCheckedUnits(checkedUnits.filter((id) => id !== unitId));
    } else {
      setCheckedUnits([...checkedUnits, unitId]);
    }
  };
  
  return (
    <main className="degreeUnits__wrapper">
        <WavesHeader title="Saukko" secondTitle="Autoalan perustutkinto" fill="#9fc9eb" />
        <section className="degreeUnits__container">
            <PageNumbers activePage={2}/>
            <h1>Valitse tutkinnon osat</h1>
            <div className="degreeUnits__container--searchField">
					    <input
					    	/* value={searchResult}
					    	onChange={handleSearchResult} */
					    	placeholder="Etsi tutkinnonosat"
					    />
					    <Icon icon="material-symbols:search" hFlip={true} />
				    </div>


            <div className="degreeUnits__container--units">
              {units.map((unit, index) => (
                  <div key={unit._id} className="degreeUnits__container--units-unit">
                    <div
                      className={`degreeUnits__container--units-unit-checkbox ${checkedUnits.includes(unit._id) && 'checked'}`}
                      onClick={() => handleCheckboxChange(unit._id)}
                    >
                      {checkedUnits.includes(unit._id) && (
                        <Icon icon="mdi:tick" color="white"/>
                        )}
                        {console.log(checkedUnits)}
                    </div>
                    <p key={unit._id}><b>{index+1}.</b> {unit.name.fi}</p>
                    <Icon icon="iconamoon:arrow-right-2-light" className="degreeUnits__container--units-unit-arrow" />
                  </div>
              )
              )}
            </div>


        </section>
        <UserNav />
    </main>
  )
}

export default DegreeUnits