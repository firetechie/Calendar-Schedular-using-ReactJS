import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik } from 'formik'
import "./App.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "StandUp Meeting",
        allDay: true,
        start: new Date(Date.UTC(2022, 6, 25)),
        end: new Date(Date.UTC(2022, 6, 26)),
    }
];

function App() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
    }
    return (
        <Formik>
            <div className="App">
                <h1>Calendar Picker</h1>
                <hr class="solid" />

                <div class="div-left">
                    <h3>Add New Event</h3>
                    <div class="div-border">
                        <input class="title-input" type="text" placeholder="Add Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                        <DatePicker showTimeSelect dateFormat="dd/MM/yyyy  EE hh:mm a" placeholderText="Start Date & Time" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                        <DatePicker showTimeSelect dateFormat="dd/MM/yyyy  EE hh:mm a" placeholderText="End Date & Time" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                        <button class="button-submit" onClick={handleAddEvent}>
                            Add Event
                        </button>
                    </div>
                </div>
                <div class="div-right" >
                    <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" />
                </div>
            </div>
        </Formik>
    );
}

export default App;
