import { useState, useRef } from 'react';
import Grid from 'components/Grid';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import './app.scss';

const App = () => {
  const gridContainer = useRef(null);
  const appRef = useRef(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div id="app" ref={appRef}>
      <Header isSidebarCollapsed={isSidebarCollapsed} appRef={appRef} />
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />
      <div
        className={`main-content${
          isSidebarCollapsed ? ' sidebar-collapsed' : ''
        }`}>
        <div className="grid-container" ref={gridContainer}>
          <Grid container={gridContainer} />
        </div>
      </div>
    </div>
  );
};

export default App;
