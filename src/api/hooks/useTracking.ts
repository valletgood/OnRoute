import { useQuery } from '@tanstack/react-query';
import { trackingApi } from '@/api/endpoints/tracking';
import { queryKeys } from '@/api/queryKeys';

/**
 * 배송 추적 조회
 * @param carrierId - 택배사 ID (예: "kr.cjlogistics")
 * @param trackingNumber - 검색할 배송 추적 번호
 * @param enabled - 쿼리 활성화 여부 (기본값: true)
 */
export const useTracking = (carrierId: string, trackingNumber: string) => {
  console.log(carrierId, trackingNumber);
  return useQuery({
    queryKey: queryKeys.tracking.search(carrierId, trackingNumber),
    queryFn: async () => {
      const response = await trackingApi.getTracking(carrierId, trackingNumber);
      return response;
    },
    enabled: !!carrierId && !!trackingNumber,
  });
};
