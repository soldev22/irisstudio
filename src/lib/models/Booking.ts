export interface Booking {
  _id?: string;
  userId: string;
  date: string;
  timeSlot: string;
  status: 'provisional' | 'confirmed';
}
