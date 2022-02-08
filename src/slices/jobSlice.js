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
  },
});

export const { addJob } = jobSlice.actions;
export default jobSlice.reducer;
