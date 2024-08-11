import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DegreeSelection from '../components/DegreeSelection.jsx';

const DegreesPage = () => {
  return (
    <div className="container mx-auto p-4">
      <DegreeSelection />
    </div>
  );
};

export default DegreesPage;
