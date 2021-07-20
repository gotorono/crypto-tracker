import React, { useState } from 'react';

import './App.css';

import List from './components/List/List';
import Add from './components/Add/Add';

function App() {
  const [fetch, setFetch] = useState(false);

  return (
    <div className="crypto-tracker">
      <List fetchCryptos={fetch} />
      <Add fetchCryptos={() => setFetch(!fetch)} />
    </div>
  );
}

export default App;
