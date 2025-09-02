import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admins: [
    { id: 1, name: 'admin01', email: 'admin01@example.com', password: '********' },
    { id: 2, name: 'admin02', email: 'admin02@example.com', password: '********' },
    { id: 3, name: 'admin03', email: 'admin03@example.com', password: '********' },
    { id: 4, name: 'admin04', email: 'admin04@example.com', password: '********' },
    { id: 5, name: 'admin05', email: 'admin05@example.com', password: '********' },
    { id: 6, name: 'admin06', email: 'admin06@example.com', password: '********' },
    { id: 7, name: 'admin07', email: 'admin07@example.com', password: '********' },
    { id: 8, name: 'admin08', email: 'admin08@example.com', password: '********' },
    { id: 9, name: 'admin09', email: 'admin09@example.com', password: '********' },
  ],
  loading: false,
  error: null,
  selectedJourney: null,
  monitoringDevices: [
    { id: 1, name: 'Device 01', type: 'single', status: 'active' },
    { id: 2, name: 'Device 02', type: 'sync', status: 'active' },
    { id: 3, name: 'Device 03', type: 'single', status: 'inactive' },
    { id: 4, name: 'Device 04', type: 'sync', status: 'active' },
    { id: 5, name: 'Device 05', type: 'sync', status: 'inactive' },
    { id: 6, name: 'Device 06', type: 'single', status: 'active' },
    { id: 7, name: 'Device 07', type: 'single', status: 'inactive' },
    { id: 8, name: 'Device 08', type: 'sync', status: 'active' },
    { id: 9, name: 'Device 09', type: 'single', status: 'inactive' },
  ],
  journeys: [
    { id: 1, name: 'Incredible India' },
    { id: 2, name: 'Hidden Gems' },
    { id: 3, name: 'Human Body' },
    { id: 4, name: 'Life in 2050' },
  ],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    addAdmin: (state, action) => {
      const newAdmin = {
        id: state.admins.length + 1,
        ...action.payload,
        password: '********',
      };
      state.admins.push(newAdmin);
    },
    updateAdmin: (state, action) => {
      const index = state.admins.findIndex(admin => admin.id === action.payload.id);
      if (index !== -1) {
        state.admins[index] = { ...state.admins[index], ...action.payload };
      }
    },
    deleteAdmin: (state, action) => {
      state.admins = state.admins.filter(admin => admin.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    selectJourney: (state, action) => {
      state.selectedJourney = action.payload;
    },
    updateDeviceStatus: (state, action) => {
      const { deviceId, status } = action.payload;
      const device = state.monitoringDevices.find(d => d.id === deviceId);
      if (device) {
        device.status = status;
      }
    },
    updateDeviceType: (state, action) => {
      const { deviceId, type } = action.payload;
      const device = state.monitoringDevices.find(d => d.id === deviceId);
      if (device) {
        device.type = type;
      }
    },
  },
});

export const {
  addAdmin,
  updateAdmin,
  deleteAdmin,
  setLoading,
  setError,
  clearError,
  selectJourney,
  updateDeviceStatus,
  updateDeviceType,
} = adminSlice.actions;

export default adminSlice.reducer;