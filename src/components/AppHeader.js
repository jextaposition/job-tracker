import React, { useState } from 'react';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import JobModal from './JobModal';

const AppHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.appHeader}>
      <Button variant='primary' onClick={() => setModalOpen(true)}>
        Add New Job
      </Button>
      <SelectButton id='status'>
        <option value='all'>ALL</option>
        <option value='incomplete'>Incomplete</option>
        <option value='complete'>Complete</option>
      </SelectButton>
      <JobModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default AppHeader;
