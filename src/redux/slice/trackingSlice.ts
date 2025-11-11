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
      const { carrierId, trackingNumber } = action.payload;

      // 동일한 carrierId와 trackingNumber 조합이 이미 있는지 확인
      const existingIndex = state.recentTrackings.findIndex(
        (tracking) =>
          tracking.carrierId === carrierId && tracking.trackingNumber === trackingNumber,
      );

      const newTracking = {
        carrierId: action.payload.carrierId,
        carrierName: action.payload.carrierName,
        trackingNumber: action.payload.trackingNumber,
        lastEvent: action.payload.lastEvent,
      };

      if (existingIndex >= 0) {
        // 이미 존재하면 업데이트 (최신 정보로 갱신)
        state.recentTrackings[existingIndex] = newTracking;
      } else {
        // 새로운 정보면 추가
        state.recentTrackings.push(newTracking);
      }
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
