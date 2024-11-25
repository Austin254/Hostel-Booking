import { useQuery } from '@tanstack/react-query';
import { hostels } from '../data/hostels';
import { Hostel } from '../types';

export function useHostel(id: string) {
  return useQuery({
    queryKey: ['hostel', id],
    queryFn: async (): Promise<Hostel | undefined> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return hostels.find(hostel => hostel.id === id);
    }
  });
}