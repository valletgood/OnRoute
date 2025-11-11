import type { TrackingEvent } from '@/api';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface RecentTracking {
  carrierId: string;
  carrierName: string;
  trackingNumber: string;
  lastEvent: TrackingEvent;
}

export interface TrackingState {
  recentTrackings: RecentTracking[];
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
        carrierName: string;
        trackingNumber: string;
        lastEvent: TrackingEvent;
      }>,
    ) => {
      state.recentTrackings.push({
        carrierId: action.payload.carrierId,
        carrierName: action.payload.carrierName,
        trackingNumber: action.payload.trackingNumber,
        lastEvent: action.payload.lastEvent,
      });
    },
    removeRecentTracking: (
      state,
      action: PayloadAction<{ carrierId: string; carrierName: string; trackingNumber: string }>,
    ) => {
      state.recentTrackings = state.recentTrackings.filter(
        (tracking) =>
          tracking.carrierId !== action.payload.carrierId ||
          tracking.carrierName !== action.payload.carrierName ||
          tracking.trackingNumber !== action.payload.trackingNumber,
      );
    },
  },
});

export const { addRecentTracking, removeRecentTracking } = trackingSlice.actions;
export default trackingSlice.reducer;
