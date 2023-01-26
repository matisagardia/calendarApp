import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';


const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumpleanos',
    notes: 'Comprar torta',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      id: '123',
      name: 'Matias'
    }
};

 const initialState = {
    events: [tempEvent],
    activeEvent: null
}


export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, {payload}) => {

        state.activeEvent = payload;
    },
    onAddNewEvent: (state, {payload}) => {

        state.events.push(payload);
        state.activeEvent = null;
    },
    onUpdateEvent: (state, {payload}) => {

        state.events = state.events.map(e => {

            if(e._id === payload._id){
            return payload;
            }
        return e;
        });
    },
    onDeleteEvent: (state) => {
        
        if(state.activeEvent) {
            state.events = state.events.filter(e => e._id !== state.activeEvent._id);
            state.activeEvent = null;
        }
    }
  }
});

export const {onSetActiveEvent, activeEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent} = calendarSlice.actions;

