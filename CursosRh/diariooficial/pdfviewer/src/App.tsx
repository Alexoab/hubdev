/* import './App.css'; */

import React from 'react';
import PdfViewer from './components/PdfViewer/PdfViewer';

const App: React.FC = () => {
  return (
    <div>
  <PdfViewer url={'https://api.anapolis.go.gov.br/apiupload/diario/00000000000/DIARIO-OFICIAL-1680060174695.pdf'} />

      
    </div>
  );
};

export default App;

