import {configureStore} from '@reduxjs/toolkit';
import employeeReducer, {setEmployees} from './employee-slice.js';
import translationReducer from './translation-slice.js';

// Middleware to save Redux state to localStorage on each update
const saveToLocalStorage = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('employees', JSON.stringify(state.employees));
  return result;
};

// Synchronously load initial state from localStorage or as an empty array
const loadInitialState = () => {
  const savedEmployees = localStorage.getItem('employees');
  return savedEmployees ? JSON.parse(savedEmployees) : [];
};

// Configure the Redux store with initial synchronous state
const store = configureStore({
  reducer: {
    employees: employeeReducer,
    translations: translationReducer,
  },
  preloadedState: {employees: loadInitialState()},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorage),
});

// Asynchronously load sample data if localStorage is empty
const initializeSampleData = async () => {
  const employeesInStorage = localStorage.getItem('employees');
  if (!employeesInStorage || JSON.parse(employeesInStorage).length === 0) {
    const response = await fetch('/src/data/sample-employees.json');
    const sampleEmployees = await response.json();
    localStorage.setItem('employees', JSON.stringify(sampleEmployees));
    store.dispatch(setEmployees(sampleEmployees)); // Dispatch action to load fetched data
  }
};

// Start loading sample data if needed
initializeSampleData();

export default store;
