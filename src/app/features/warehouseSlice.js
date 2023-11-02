import { createSlice } from "@reduxjs/toolkit";

const warehouseSlice = createSlice({
  name: "warehouses",
  initialState: [],
  reducers: {
    setWarehouses: (state, action) => action.payload,
    updateWarehouse: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const index = state.findIndex((warehouse) => warehouse.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedData };
      }
    },
  },
});

export const { setWarehouses, updateWarehouse } = warehouseSlice.actions;
export default warehouseSlice.reducer;
