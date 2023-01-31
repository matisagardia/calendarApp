import { createSlice } from '@reduxjs/toolkit'



 const initialState = {
    isLoadingEvents: true,
    events: [],
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

            if(e.id === payload.id){
            return payload;
            }
        return e;
        });
    },
    onDeleteEvent: (state) => {
        if(state.activeEvent) {
            state.events = state.events.filter(e => e._id !== state.activeEvent.id);
            state.activeEvent = null;
        }
    },
    onLoadEvents: (state, {payload = []}) => {
        state.isLoadingEvents = false;
        // the payload is an array of events, so, I will loop over it and check if in the DB exists an event with the same ID as the payload
        // If that returns false, then I will push the event (i do not want two events with the same ID)
        payload.forEach(event => {
            const exists = state.events.some(dbEvent => dbEvent.id === event.id);
            if ( !exists ) {
                state.events.push(event);
            }
        });
    }
  }
});

export const {onSetActiveEvent, activeEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents} = calendarSlice.actions;

