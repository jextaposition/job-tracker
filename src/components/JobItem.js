import { format } from 'date-fns';
import React from 'react';
import toast from 'react-hot-toast';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteJob } from '../slices/jobSlice';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
const JobItem = ({ job }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteJob(job.id));
    toast.success('Job successfully deleted!');
  };
  const handleUpdate = () => {
    console.log('updating');
  };
  return (
    <div className={styles.item}>
      <div className={styles.todoDetails}>
        []
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
    </div>
  );
};

export default JobItem;
