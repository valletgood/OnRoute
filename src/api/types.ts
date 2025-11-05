// API 응답 타입 정의
export interface TrackingStatus {
  code: string;
  name: string;
}

export interface Location {
  countryCode?: string;
  postalCode?: string;
  name?: string;
}

export interface ContactInfo {
  name?: string;
  location?: Location;
  phoneNumber?: string;
}

export interface TrackingEvent {
  time: string;
  status: TrackingStatus;
  description: string;
  location?: Location;
  contact?: ContactInfo;
}

export interface TrackingEventNode {
  node: TrackingEvent;
}

export interface TrackingData {
  track: {
    trackingNumber: string;
    lastEvent: TrackingEvent;
    events: {
      edges: TrackingEventNode[];
    };
    sender?: ContactInfo;
    recipient?: ContactInfo;
  };
}

export interface GraphQLError {
  message: string;
  extensions?: Record<string, unknown>;
}

export interface TrackingResponse {
  data?: TrackingData;
  errors?: GraphQLError[];
}

export interface LocationSearchResponse {
  // 필요한 경우 추가
}
