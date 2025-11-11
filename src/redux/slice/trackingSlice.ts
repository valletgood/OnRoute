import type { TrackingData } from '@/api';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TrackingState {
  recentTrackings: {
    carrierId: string;
    trackingNumber: string;
    trackingData: TrackingData;
  }[];
}

const initialState: TrackingState = {
  recentTrackings: [],
};

const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    addRecentTracking: (
      state,
      action: PayloadAction<{
        carrierId: string;
        trackingNumber: string;
        trackingData: TrackingData;
      }>,
    ) => {
      state.recentTrackings.push(action.payload);
    },
    removeRecentTracking: (
      state,
      action: PayloadAction<{ carrierId: string; trackingNumber: string }>,
    ) => {
      state.recentTrackings = state.recentTrackings.filter(
        (tracking) =>
          tracking.carrierId !== action.payload.carrierId ||
          tracking.trackingNumber !== action.payload.trackingNumber,
      );
    },
  },
});

export const { addRecentTracking, removeRecentTracking } = trackingSlice.actions;
export default trackingSlice.reducer;
