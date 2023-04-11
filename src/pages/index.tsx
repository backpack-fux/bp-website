//src/pages/index.tsx
import React from 'react';
import DocumentForm from '../components/DocumentForm';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Submit a Document</h1>
      <DocumentForm />
      {/* Other components */}
    </div>
  );
};

export default HomePage;