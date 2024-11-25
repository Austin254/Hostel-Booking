import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useHostel } from '../hooks/useHostel';
import { useAuth } from '../context/AuthContext';
import PaymentForm from '../components/PaymentForm';
import LoadingSpinner from '../components/LoadingSpinner';

export default function BookingPage() {
  const { hostelId } = useParams();
  const navigate = useNavigate();
  const { hostel, isLoading } = useHostel(hostelId as string);
  const { user } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState('');
  const [loading, setLoading] = useState(false);

  if (isLoading) return <LoadingSpinner />;
  if (!hostel) return <div>Hostel not found</div>;

  const handleBooking = async (paymentDetails: any) => {
    if (!user) {
      toast.error('Please login to continue');
      return;
    }

    setLoading(true);
    try {
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Booking successful! Check your email for confirmation.');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6"
      >
        <h1 className="text-2xl font-bold mb-6">Book Your Room</h1>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">Selected Hostel</h2>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium">{hostel.name}</p>
            <p className="text-gray-600">KSH {hostel.pricePerSemester.toLocaleString()} per semester</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">Select Room</h2>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a room...</option>
            {hostel.rooms
              .filter(room => !room.occupied)
              .map(room => (
                <option key={room.id} value={room.id}>
                  Room {room.number} ({room.type})
                </option>
              ))}
          </select>
        </div>

        {selectedRoom && (
          <PaymentForm
            amount={hostel.pricePerSemester}
            onSubmit={handleBooking}
            loading={loading}
          />
        )}
      </motion.div>
    </div>
  );
}