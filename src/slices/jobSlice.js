import { createSlice } from '@reduxjs/toolkit';

const getInitialJob = () => {
  // getting job list
  const localJobList = window.localStorage.getItem('jobList');
  // if job list is not empty
  if (localJobList) {
    return JSON.parse(localJobList);
  }
  window.localStorage.setItem('jobList', JSON.stringify([]));
  return [];
};

const initialValue = {
  filterStatus: 'all',
  jobList: getInitialJob(),
};

export const jobSlice = createSlice({
  name: 'jobs',
  initialState: initialValue,
  reducers: {
    addJob: (state, action) => {
      state.jobList.push(action.payload);
      const jobList = window.localStorage.getItem('jobList');
      if (jobList) {
        const jobListArr = JSON.parse(jobList);
        jobListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem('jobList', JSON.stringify(jobListArr));
      } else {
        window.localStorage.setItem(
          'jobList',
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    deleteJob: (state, action) => {
      const jobList = window.localStorage.getItem('jobList');
      if (jobList) {
        const jobListArr = JSON.parse(jobList);
        jobListArr.forEach((job, index) => {
          if (job.id === action.payload) {
            jobListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem('jobList', JSON.stringify(jobListArr));
        state.jobList = jobListArr;
      }
    },
    updateJob: (state, action) => {
      const jobList = window.localStorage.getItem('jobList');
      if (jobList) {
        const jobListArr = JSON.parse(jobList);
        jobListArr.forEach((job, index) => {
          if (job.id === action.payload.id) {
            job.title = action.payload.title;
            job.status = action.payload.status;
          }
        });
        window.localStorage.setItem('jobList', JSON.stringify(jobListArr));
        state.jobList = jobListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addJob, deleteJob, updateJob, updateFilterStatus } =
  jobSlice.actions;
export default jobSlice.reducer;
