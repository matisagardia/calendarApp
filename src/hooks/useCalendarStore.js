import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { convertEventDate } from "../helpers/convertEventDate";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar);
    const {user} = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    };

    const startSavingEvent = async(calendarEvent) => {

        if(calendarEvent._id) {
            //Update event
            dispatch(onUpdateEvent({...calendarEvent}));

        } else {
            //Create new event
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({...calendarEvent, id: data.event.id, user}));
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }

    const startLoadingEvents = async () => {
        try {
            
            const { data } = await calendarApi.get('/events');
            const events = convertEventDate(data.events);
            console.log(events)
            
        } catch (error) {
            console.log('Error loading events')
            console.log(error);
        }
    }


    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }

}
