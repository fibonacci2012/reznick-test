import { useState } from 'react';

function SearchBox(props) {
  const [searchText, setSearchText] = useState('');

  return (
    <div>
      <input
        type="text"
        placeholder="шо загубив?"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      <button onClick={() => props.onSearch(searchText)}>Search</button>
    </div>
  );
}

export default SearchBox;
