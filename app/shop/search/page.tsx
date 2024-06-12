'use client';

import React from 'react';
import Fuse from 'fuse.js';
import { useState, useEffect } from 'react';
import { getStoresByState } from '@/utils/actions/shopActions';
import BusinessSection from '@/components/BusinessCardSection';
// import STATES from "../../../lib/models/States"

interface StoreData {
  storeName: string;
  storeImg: string | undefined;
  storeOwner: string;
  slug: string;
}

interface State {
  value: string;
  label: string;
}

const STATES: State[] = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Main' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pensylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [filteredStates, setFilteredStates] = useState<State[]>([]);
  const [businessByState, setBusinessByState] = useState<StoreData[]>([]);

  const fuse = new Fuse(STATES, { keys: ['label'] });

  useEffect(() => {
    const handleSearch = () => {
      if (query) {
        const results = fuse.search(query);
        setFilteredStates(results.map((result) => result.item));
      } else {
        setFilteredStates([]);
      }
    };

    handleSearch();
  }, [query]);

  async function handleSelectState(state: State) {
    console.log('Selected State:', state);
    setQuery('');

    // HERE is where businesses get delclared
    const businesses = await getStoresByState(state.label);
    setBusinessByState(businesses);
  }

  const renderDropdownItem = (state: State) => (
    <li
      key={state.value}
      className="dropdownItem"
      onClick={() => handleSelectState(state)}
    >
      {state.label}
    </li>
  );

  // if (businessByState === []) {
  //   return (
  //     <div>
  //       <p>no stores in that state</p>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Store State..."
        />
        {filteredStates.length > 0 && (
          <ul className="dropdown">{filteredStates.map(renderDropdownItem)}</ul>
        )}
      </div>
      <div style={{ marginTop: 20 }}>
        <BusinessSection stores={businessByState} />
      </div>
    </>
  );
}
