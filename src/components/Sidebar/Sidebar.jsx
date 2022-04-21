import './sidebar.scss';

const Sidebar = ({ isSidebarCollapsed, setIsSidebarCollapsed }) => {
  return (
    <div
      className={`sidebar-container${
        isSidebarCollapsed ? ' sidebar-collapsed' : ''
      }`}>
      <div className="content">Hello World</div>
      <div className="collapse-container">
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="collapse-button">
          <i
            className={`bi bi-arrow-bar-${
              isSidebarCollapsed ? 'right' : 'left'
            }`}></i>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
