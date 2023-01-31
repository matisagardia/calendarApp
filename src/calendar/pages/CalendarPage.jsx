import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar } from "../components/Navbar";
import { localizer, getMessagesES } from '../../helpers';
import { CalendarEvent } from '../components/CalendarEvent';
import { useEffect, useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';
import { useAuthStore } from '../../hooks/useAuthStore';


export const CalendarPage = () => {

  const { user } = useAuthStore();

  const { openDateModal } = useUiStore();

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = ( user.uid === event.user._id) || ( user.uid === event.user._uid );

    const style = {
      backgroundColor: isMyEvent ? '#34CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  };

  const onSelect = (e) => {
    setActiveEvent(e);
  };

  const onDoubleClick = (e) => {
    openDateModal();
  };

  const onViewChanged = (e) => {
    localStorage.setItem('lastView', e)
    setlastView(e)
  };

  useEffect(() => {
    startLoadingEvents()
  }, []);
  

  return (
    
    <>
    
    <Navbar />

    <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc( 100vh - 80px )' }}
      messages={getMessagesES()}
      eventPropGetter={eventStyleGetter}
      components={{
        event: CalendarEvent
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}
    />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    
    </>
  )
}
