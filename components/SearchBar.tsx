'use client';

import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

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

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [filteredStates, setFilteredStates] = useState<State[]>([]);

  // Pre-calculate Fuse instance for efficiency
  const fuse = new Fuse(STATES, { keys: ['label'] });

  useEffect(() => {
    const handleSearch = () => {
      if (query) {
        const results = fuse.search(query);
        setFilteredStates(results.map((result) => result.item));
      } else {
        setFilteredStates([]); // Clear results when query is empty
      }
    };

    handleSearch();
  }, [query]);

  const handleSelectState = (state: State) => {
    // Handle selection logic here (e.g., call a function, update state)
    console.log('Selected State:', state);
    setQuery(''); // Clear search bar after selection
  };

  const renderDropdownItem = (state: State) => (
    <li
      key={state.value}
      className="dropdownItem"
      onClick={() => handleSelectState(state)}
    >
      {state.label}
    </li>
  );

  return (
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
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default SearchBar;
