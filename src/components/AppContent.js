import React from 'react';
import { useSelector } from 'react-redux';
import JobItem from './JobItem';
import styles from '../styles/modules/app.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

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
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial='hidden'
      animate='visible'
    >
      <AnimatePresence>
        {filteredJobList && filteredJobList.length > 0 ? (
          filteredJobList.map((job) => <JobItem key={job.id} job={job} />)
        ) : (
          <motion.p className={styles.emptyText} variants={child}>
            no jobs found
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AppContent;
