import { useState, useEffect } from 'react';
import THEMES from 'constants/themes';
import './header.scss';

const initializeCustomColorTones = () => {
  const customColorTonesString = localStorage.getItem('customColorTones');
  if (customColorTonesString) {
    return customColorTonesString.split(',');
  } else {
    return THEMES.DEFAULT.colors;
  }
};

const Header = ({ isSidebarCollapsed, appRef }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [customColorTones, setCustomColorTones] = useState(
    initializeCustomColorTones()
  );
  const [selectedTheme, setSelectedTheme] = useState(THEMES.DEFAULT.key);

  useEffect(() => {
    if (appRef.current && selectedTheme === THEMES.CUSTOM.key) {
      customColorTones.forEach((value, index) => {
        appRef.current.style.setProperty(`--color-tone-${index}`, value);
      });
      localStorage.setItem('customColorTones', customColorTones);
    }
  }, [customColorTones]);

  useEffect(() => {
    if (selectedTheme === THEMES.CUSTOM.key) {
      customColorTones.forEach((value, index) => {
        appRef.current.style.setProperty(`--color-tone-${index}`, value);
      });
    } else {
      THEMES[selectedTheme].colors.forEach((value, index) => {
        appRef.current.style.setProperty(`--color-tone-${index}`, value);
      });
    }
  }, [selectedTheme]);

  const onThemeSelectionChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  const onCustomColorTonesChange = (event) => {
    const index = parseInt(event.target.name);
    setCustomColorTones([
      ...customColorTones.slice(0, index),
      event.target.value,
      ...customColorTones.slice(index + 1, customColorTones.length + 1),
    ]);
  };

  return (
    <div
      className={`header-container${
        isSidebarCollapsed ? ' sidebar-collapsed' : ''
      }`}>
      <div className="contents">
        <div className="left">LEFT</div>
        <div className="center">CENTER</div>
        <div className="right">
          <div className="settings-container">
            <i
              className="bi bi-gear-fill"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            />
            {isSettingsOpen && (
              <div className="settings">
                <div className="contents">
                  <div className="theme-selection-form">
                    <div className="form-group">
                      <div className="label">Theme Selection: </div>
                      <select
                        name="theme-selection"
                        onChange={onThemeSelectionChange}
                        value={selectedTheme.key}>
                        {Object.keys(THEMES).map((key) => (
                          <option key={key} value={key}>
                            {THEMES[key].label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {selectedTheme === THEMES.CUSTOM.key && (
                    <div className="custom-theme-form">
                      {customColorTones.map((value, index) => (
                        <div key={index} className="form-group">
                          <div className="label">{`Tone #${index}: `}</div>
                          <input
                            type="color"
                            value={value}
                            name={index}
                            onChange={onCustomColorTonesChange}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
