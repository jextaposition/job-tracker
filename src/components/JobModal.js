import React from 'react';
import styles from '../styles/modules/modal.module.scss';
import { MdOutlineClose } from 'react-icons/md';
import Button from './Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addJob, updateJob } from '../slices/jobSlice';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

const JobModal = ({ type, modalOpen, setModalOpen, job }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');

  useEffect(() => {
    if (type === 'update' && job) {
      setTitle(job.title);
      setStatus(job.status);
    } else {
      setTitle('');
      setStatus('incomplete');
    }
  }, [type, job, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please enter a title');
      return;
    }
    if (title && status) {
      if (type === 'add') {
        dispatch(
          addJob({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success('Job added successfully!');
      }
      if (type === 'update') {
        if (job.title !== title || job.status !== status) {
          dispatch(
            updateJob({
              ...job,
              title,
              status,
            })
          );
          toast.success(`${job.id} successfully updated!`);
        } else {
          toast.error('no changes were made!');
          return;
        }
      }
      setModalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <motion.div
              className={styles.closeButton}
              onClick={() => setModalOpen(false)}
              onKeyDown={() => setModalOpen(false)}
              tabIndex={0}
              role='button'
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === 'update' ? 'Update' : 'Create New'} Job
              </h1>
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
                  {type === 'update' ? 'update' : 'add'} job
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobModal;
