import { useMutation, useQuery } from '@tanstack/react-query';
import { trackingApi } from '@/api/endpoints/tracking';
import { queryKeys } from '@/api/queryKeys';
import type { TrackingData } from '../types';

/**
 * 배송 추적 조회
 * @param carrierId - 택배사 ID (예: "kr.cjlogistics")
 * @param trackingNumber - 검색할 배송 추적 번호
 * @param isRealTime - 실시간 업데이트 여부 (기본값: false)
 */
export const useTracking = (carrierId: string, trackingNumber: string, isRealTime = false) => {
  return useQuery({
    queryKey: queryKeys.tracking.search(carrierId, trackingNumber),
    queryFn: async () => {
      const response = await trackingApi.getTracking(carrierId, trackingNumber);
      return response;
    },
    enabled: !!carrierId && !!trackingNumber,
    refetchInterval: isRealTime ? 10000 : false, // 10초마다 자동 갱신 (실시간 모드일 때만)
  });
};

export const useSaveRecentTracking = () => {
  return useMutation({
    mutationFn: async ({
      carrierId,
      carrierName,
      trackingNumber,
      trackingData,
    }: {
      carrierId: string;
      carrierName: string;
      trackingNumber: string;
      trackingData: TrackingData;
    }) => {
      trackingApi.saveRecentTracking(carrierId, carrierName, trackingNumber, trackingData);
    },
  });
};
