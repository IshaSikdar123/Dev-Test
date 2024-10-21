import React, { useState, useEffect } from 'react';
import { PlusCircle, Menu } from 'lucide-react';

const EventCard = ({ event }) => (
  <div className="bg-gray-900 text-white p-4 rounded-lg">
    <h3 className="font-bold text-lg mb-2">Town Hall Meeting</h3>
    <p className="text-sm">Time: 8:30 PM</p>
    <p className="text-sm">Date: 10/25/2024</p>
    <p className="text-sm">Age: {event.age}</p>
    <p className="text-sm">
      Address: {event.address.address}, {event.address.city} {event.address.postalCode}
    </p>
  </div>
);

const Mark = () => {
  const [events, setEvents] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(data => {
        const usersOver30 = data.users.filter(user => user.age > 30);
        setAllUsers(usersOver30);
        setEvents(usersOver30.slice(0, 6));
        setCurrentIndex(6);
        console.log('Users over 30:', usersOver30);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addNewEvent = () => {
    if (currentIndex < allUsers.length) {
      setEvents([...events, allUsers[currentIndex]]);
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("No more users to add!");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-slate-800 min-h-screen text-white">
      {/* Navbar */}
      <div className="bg-slate-800 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Dev.Test</h1>
        <button 
          className="sm:hidden text-white"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Orange gap between Navbar and Main content */}
      <div className="w-full h-4 bg-gray-900"></div> {/* Orange gap below navbar */}

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed sm:relative bg-slate-800 p-4 h-screen sm:w-48 w-64 transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } sm:translate-x-0`}
        >
          <h2 className="font-bold mb-2">Events</h2>
          <p className="text-gray-300">Calendar</p>
        </div>

        {/* Orange gap between sidebar and content */}
        <div className="hidden sm:block w-4 bg-gray-900 h-screen"></div>

        {/* Event Cards */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Button */}
      <button 
        className="fixed bottom-4 right-4 bg-pink-500 rounded-full p-3 hover:bg-pink-600 transition-colors"
        onClick={addNewEvent}
      >
        <PlusCircle size={24} />
      </button>
    </div>
  );
};

export default Mark;
