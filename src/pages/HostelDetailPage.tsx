import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Users, Wifi, Shield, MapPin } from 'lucide-react';
import { useHostel } from '../hooks/useHostel';
import RoomList from '../components/RoomList';
import Gallery from '../components/Gallery';
import LoadingSpinner from '../components/LoadingSpinner';

export default function HostelDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hostel, isLoading } = useHostel(id as string);

  if (isLoading) return <LoadingSpinner />;
  if (!hostel) return <div>Hostel not found</div>;

  const availableRooms = hostel.rooms.filter(room => !room.occupied).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <Gallery images={[hostel.image]} />

        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{hostel.name}</h1>
              <p className="text-gray-600 mt-2">{hostel.description}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-900">
                KSH {hostel.pricePerSemester.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">per semester</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="flex items-center space-x-2">
              <Bed className="h-5 w-5 text-blue-900" />
              <span>{availableRooms} rooms available</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-900" />
              <span>Capacity: {hostel.capacity}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi className="h-5 w-5 text-blue-900" />
              <span>Free Wi-Fi</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-900" />
              <span>24/7 Security</span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
            <RoomList rooms={hostel.rooms} />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span>Thika Main Campus, Mount Kenya University</span>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => navigate(`/booking/${hostel.id}`)}
              className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Book Now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}