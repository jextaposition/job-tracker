import React from 'react';
import { useSelector } from 'react-redux';
import JobItem from './JobItem';

const AppContent = () => {
  const jobList = useSelector((state) => state.jobs.jobList);
  const sortedJobList = [...jobList];
  sortedJobList.sort((a, b) => new Date(b.time) - new Date(a.time));
  return (
    <div>
      {sortedJobList && sortedJobList.length > 0
        ? sortedJobList.map((job) => <JobItem key={job.id} job={job} />)
        : 'no jobs found'}
    </div>
  );
};

export default AppContent;
