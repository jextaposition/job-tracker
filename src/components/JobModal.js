import React from 'react';
import styles from '../styles/modules/modal.module.scss';
import { MdOutlineClose } from 'react-icons/md';
import Button from './Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addJob } from '../slices/jobSlice';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';

const JobModal = ({ modalOpen, setModalOpen }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && status) {
      dispatch(
        addJob({
          id: uuid(),
          title,
          status,
          time: new Date().toLocaleString(),
        })
      );
      toast.success('Job added successfully!');
      setModalOpen(false);
    } else {
      toast.error('Title should not be empty');
    }
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
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h1 className={styles.formTitle}>Create New Job</h1>
            <label htmlFor='title'>
              Title
              <input
                type='text'
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label htmlFor='status'>
              status
              <select
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
