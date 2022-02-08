import React from 'react';
import styles from '../styles/modules/modal.module.scss';
import { MdOutlineClose } from 'react-icons/md';
import Button from './Button';
import { useState } from 'react';

const JobModal = ({ modalOpen, setModalOpen }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role='button'
          >
            <MdOutlineClose />
          </div>
          <form className={styles.form} onSubmit={(e) => handleSubmit}>
            <h1 className={styles.formTitle}>Create New Job</h1>
            <label htmlFor='title'>
              Title
              <input
                type='text'
                id='title'
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label htmlFor='status'>
              status
              <select
                name='status'
                id='status'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value='incomplete'>Incomplete</option>
                <option value='complete'>Complete</option>
              </select>
            </label>
            <div className={styles.buttonContainer}>
              <Button type='submit' variant='primary'>
                add job
              </Button>
              <Button
                type='button'
                variant='secondary'
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
              >
                cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default JobModal;
