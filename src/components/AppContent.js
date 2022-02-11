import React from 'react';
import { useSelector } from 'react-redux';
import JobItem from './JobItem';
import styles from '../styles/modules/app.module.scss';

const AppContent = () => {
  const jobList = useSelector((state) => state.jobs.jobList);
  const sortedJobList = [...jobList];
  const filterStatus = useSelector((state) => state.jobs.filterStatus);
  sortedJobList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredJobList = sortedJobList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <div className={styles.content__wrapper}>
      {filteredJobList && filteredJobList.length > 0
        ? filteredJobList.map((job) => <JobItem key={job.id} job={job} />)
        : 'no jobs found'}
    </div>
  );
};

export default AppContent;
