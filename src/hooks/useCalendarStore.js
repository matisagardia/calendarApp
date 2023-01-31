import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
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


    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }

}
