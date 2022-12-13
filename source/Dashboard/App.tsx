import React from 'react';

import ContextProvide from './context/context';
import Dashboard from './Dashboard';

export default function App() {
  return (
    <ContextProvide>
      <Dashboard />
    </ContextProvide>
  );
}
