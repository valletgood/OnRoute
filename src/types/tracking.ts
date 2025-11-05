// API 응답 타입 정의
export interface TrackingStatus {
  code: string;
  name: string;
}

export interface TrackingEvent {
  time: string;
  status: TrackingStatus;
  description: string;
}

export interface TrackingEventNode {
  node: TrackingEvent;
}

export interface TrackingData {
  track: {
    lastEvent: TrackingEvent;
    events: {
      edges: TrackingEventNode[];
    };
  };
}

export interface TrackingResponse {
  data: TrackingData;
}
