import {createSlice} from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employees',
  initialState: [],
  reducers: {
    setEmployees: (state, action) => {
      // Sets the state with a batch of employees, used for loading sample data
      return action.payload;
    },
    addEmployee: (state, action) => {
      state.push(action.payload);
    },
    deleteEmployee: (state, action) => {
      return state.filter((employee) => employee.id !== action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.findIndex(
        (employee) => employee.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const {setEmployees, addEmployee, deleteEmployee, updateEmployee} =
  employeeSlice.actions;
export default employeeSlice.reducer;
