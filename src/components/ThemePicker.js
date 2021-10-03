import React, { useState } from 'react';
import Modal from './Modal';
import styles from './ThemePicker.module.css';

const ThemePicker = ({ text, handleThemeChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hueValue, setHueValue] = useState(120);
  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const handleTouch = (e) => {
    e.preventDefault();
    setHueValue(e.target.value);
  };
  return (
    <div
      style={{
        '--hueValue': hueValue,
      }}
    >
      <div onClick={toggleModal} className={styles['theme-picker']}>
        {text}
      </div>
      {isModalOpen && (
        <Modal>
          <form
            style={{
              '--hueValue': hueValue,
            }}
            className={styles['modal--theme']}
            onSubmit={(e) => handleThemeChange(hueValue, e)}
          >
            <div className={styles['modal--theme__header']}>Select Hue</div>
            <input
              className={styles['slider']}
              type='range'
              min='0'
              max='360'
              step='1'
              defaultValue={hueValue}
              onMouseUp={(e) => setHueValue(e.target.value)}
              onTouchEnd={handleTouch}
            />
            <button className={styles['btn--theme']}>Apply</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ThemePicker;
