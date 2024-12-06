import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, Star, Filter, Search, Calendar as CalendarIcon } from 'lucide-react';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Jha. ',
    specialty: 'Cardiologist',
    experience: '15 years',
    rating: 4.8,
    location: 'Sector 62,',
    availability: ['Monday', 'Wednesday', 'Friday'],
    image: "https://t4.ftcdn.net/jpg/06/47/16/29/360_F_647162966_SFu8GP6awkeW0OnFnAxPjiGXSoeme4ht.jpg",
    price: '$200',
    languages: ['English', 'Spanish'],
    education: 'Harvard Medical School',
    nextAvailable: '2024-02-28'
  },
  {
    id: 2,
    name: 'Dr. Sachin Maurya',
    specialty: 'Neurologist',
    experience: '12 years',
    rating: 4.9,
    location: 'Health Complex, Boston',
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200',
    price: '$180',
    languages: ['English', 'Mandarin'],
    education: 'Stanford Medical School',
    nextAvailable: '2024-02-27'
  },
  {
    id: 3,
    name: 'Dr. Priya Verma',
    specialty: 'Pediatrician',
    experience: '10 years',
    rating: 4.7,
    location: 'Children\'s Hospital, Chicago',
    availability: ['Monday', 'Tuesday', 'Thursday'],
    image: "https://media.istockphoto.com/id/1293373291/photo/portrait-of-confident-ethnic-female-doctor.jpg?s=612x612&w=0&k=20&c=CJsw6IgTecJZoBeVXqZdvh2BI-NyVa-8VcQM3fPhbYc=",
    price: '$150',
    languages: ['English', 'French'],
    education: 'Johns Hopkins University',
    nextAvailable: '2024-02-26'
  }
];

const specialties = ['All', 'Cardiologist', 'Neurologist', 'Pediatrician', 'Dermatologist', 'Orthopedist'];

const Appointments = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate booking success
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        reason: ''
      });
      setSelectedDoctor(null);
    }, 3000);
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book an Appointment</h1>
          <p className="text-xl text-gray-600">Schedule a consultation with our expert doctors</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#09B480]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#09B480]"
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctors List */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all duration-200 ${
                    selectedDoctor?.id === doctor.id ? 'ring-2 ring-[#09B480]' : ''
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-xl font-semibold">{doctor.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="ml-1">{doctor.rating}</span>
                        </div>
                      </div>
                      <p className="text-[#09B480]">{doctor.specialty}</p>
                      <p className="text-gray-600">{doctor.experience} experience</p>
                      <p className="text-gray-600">Consultation: {doctor.price}</p>
                      <div className="flex items-center mt-2">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-gray-600 text-sm">{doctor.location}</span>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">Languages: {doctor.languages.join(', ')}</p>
                        <p className="text-sm text-gray-600">Education: {doctor.education}</p>
                        <p className="text-sm text-[#09B480]">Next Available: {doctor.nextAvailable}</p>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">Available on:</p>
                        <div className="flex gap-2 mt-1">
                          {doctor.availability.map((day, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[#09B480] bg-opacity-30 text-grey rounded-full text-sm"
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Appointment Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6">Book Appointment</h2>
              {bookingSuccess ? (
                <div className="text-center p-4 bg-green-100 rounded-lg">
                  <p className="text-green-600">Appointment booked successfully!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <div className="mt-1 relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#09B480]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#09B480]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <div className="mt-1 relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#09B480]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                    <div className="mt-1 relative">
                      <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#09B480]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Preferred Time</label>
                    <div className="mt-1 relative">
                      <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#09B480]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reason for Visit</label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#09B480]"
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#09B480] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-200"
                    disabled={!selectedDoctor}
                  >
                    {selectedDoctor ? 'Confirm Appointment' : 'Book Appointment+np n'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;