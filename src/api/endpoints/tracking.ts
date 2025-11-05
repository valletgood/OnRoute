import apiClient from '@/api/client';
import type { TrackingResponse } from '@/api/types';

/**
 * 배송 추적 관련 API 엔드포인트
 */

// GraphQL 쿼리
const TRACK_QUERY = `
  query Track($carrierId: ID!, $trackingNumber: String!) {
    track(carrierId: $carrierId, trackingNumber: $trackingNumber) {
      lastEvent {
        time
        status {
          code
          name
        }
        description
      }
      events(last: 10) {
        edges {
          node {
            time
            status {
              code
              name
            }
            location {
              countryCode
              postalCode
              name
            }
            description
          }
        }
      }
    }
  }
`.trim();

export const trackingApi = {
  /**
   * 배송 추적 정보 조회
   * @param carrierId - 택배사 ID (예: "kr.cjlogistics")
   * @param trackingNumber - 운송장 번호
   */
  getTracking: async (carrierId: string, trackingNumber: string): Promise<TrackingResponse> => {
    // 환경변수에서 API 키 가져오기
    const apiKey = import.meta.env.VITE_TRACKER_API_KEY;
    const secretKey = import.meta.env.VITE_TRACKER_SECRET_KEY;

    if (!apiKey) {
      console.error('TRACKER_API_KEY 환경변수가 설정되지 않았습니다.');
      throw new Error('TRACKER_API_KEY 환경변수가 설정되지 않았습니다.');
    }

    const response = await apiClient.post<TrackingResponse>(
      '/graphql',
      {
        query: TRACK_QUERY,
        variables: {
          carrierId,
          trackingNumber,
        },
      },
      {
        headers: {
          Authorization: `TRACKQL-API-KEY ${apiKey}:${secretKey}`,
        },
      },
    );

    const data = response.data;

    if (data.errors && data.errors.length > 0) {
      throw new Error(data.errors[0]?.message || 'GraphQL 쿼리 실행 중 오류가 발생했습니다.');
    }

    if (!data.data) {
      throw new Error('배송 정보를 찾을 수 없습니다.');
    }

    return data;
  },
};
