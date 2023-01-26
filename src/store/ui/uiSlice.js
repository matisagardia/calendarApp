import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    isDateModalOpen: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenDateModal: (state) => {
        state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
        state.isDateModalOpen = false;
    }
  }
});

export const {onOpenDateModal, onCloseDateModal} = uiSlice.actions
