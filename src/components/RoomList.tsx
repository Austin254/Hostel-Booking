import React from 'react';
import { motion } from 'framer-motion';
import { Bed, User } from 'lucide-react';
import { Room } from '../types';

interface RoomListProps {
  rooms: Room[];
}

export default function RoomList({ rooms }: RoomListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <motion.div
          key={room.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-lg border ${
            room.occupied ? 'bg-gray-50' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bed className="h-5 w-5 text-blue-900" />
              <div>
                <p className="font-medium">Room {room.number}</p>
                <p className="text-sm text-gray-600 capitalize">{room.type}</p>
              </div>
            </div>
            <div className={`flex items-center space-x-2 ${
              room.occupied ? 'text-red-500' : 'text-green-500'
            }`}>
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">
                {room.occupied ? 'Occupied' : 'Available'}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}