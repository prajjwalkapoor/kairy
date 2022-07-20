import React from 'react';
import ContextProvide from './context/context';
import Popup from './Popup';

const App: React.FC = () => {
  return (
    <ContextProvide>
      <Popup />
    </ContextProvide>
  );
};
export default App;
