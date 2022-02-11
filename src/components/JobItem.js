import { format } from 'date-fns';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteJob, updateJob } from '../slices/jobSlice';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import CheckButton from './CheckButton';
import JobModal from './JobModal';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const JobItem = ({ job }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (job.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [job.status]);

  const handleDelete = () => {
    dispatch(deleteJob(job.id));
    toast.success('Job successfully deleted!');
  };
  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };
  const handleCheckbox = () => {
    setChecked(!checked);
    dispatch(
      updateJob({
        ...job,
        status: checked ? 'incomplete' : 'complete',
      })
    );
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheckbox={handleCheckbox} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                job.status === 'complete' && styles['todoText--completed'],
              ])}
            >
              {job.title}
            </p>
            <p className={styles.time}>
              {format(new Date(job.time), 'p, MM/dd/yyyy')}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={handleDelete}
            onKeyDown={handleDelete}
            role='button'
            tabIndex={0}
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={handleUpdate}
            onKeyDown={handleUpdate}
            role='button'
            tabIndex={0}
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <JobModal
        type='update'
        job={job}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  );
};

export default JobItem;
