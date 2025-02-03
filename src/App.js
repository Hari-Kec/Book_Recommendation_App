import React, { useState } from 'react';
import Main from './Components/Main';

function App() {
  const [categories, setCategories] = useState("");

  return (
    <>
      <Main categories={categories} />
    </>
  );
}

export default App;
