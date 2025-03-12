import React from 'react';
import AddResourceForm from './components/add-resource-form';
import ResourcesList from './components/list-resource';

const App: React.FC = () => {
  return (
    <div className="App">
      <h2 className="bg-secondary text-center mt-3 p-3">React Resource App</h2>
      <AddResourceForm />
      <ResourcesList />
    </div>
  );
}

export default App;
