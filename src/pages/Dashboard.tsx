import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TrackingResult } from '@/components/tracking/TrackingResult';
import { useTracking, useSaveRecentTracking } from '@/api/hooks/useTracking';
import { COURIER_COMPANIES } from '@/define/courierCompanies';
import type { TrackingData } from '@/api/types';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const trackingNumber = searchParams.get('trackingNumber') || '';
  const carrierId = searchParams.get('carrierId') || 'auto';

  // 쿼리 파라미터가 없으면 홈으로 리다이렉트
  useEffect(() => {
    if (!trackingNumber) {
      toast.error('배송 번호를 입력해주세요.');
      navigate('/');
    }
  }, [trackingNumber, navigate]);

  // 택배사 이름 찾기
  const carrierName = COURIER_COMPANIES.find((company) => company.value === carrierId)?.label || '';

  // 실시간 업데이트 상태
  const [isRealTime, setIsRealTime] = useState(true);

  // 배송 조회 쿼리
  const { data, isLoading, error, refetch } = useTracking(carrierId, trackingNumber, isRealTime);

  // 최근 조회 내역 저장
  const { mutate: saveRecentTracking } = useSaveRecentTracking();

  const handleIsRealTime = (value: boolean) => {
    setIsRealTime(value);
  };

  useEffect(() => {
    if (data?.data && !error) {
      saveRecentTracking({
        carrierId,
        carrierName,
        trackingNumber,
        trackingData: data.data as TrackingData,
      });
    }
  }, [data, error, carrierId, carrierName, trackingNumber, saveRecentTracking]);

  // 로딩 중
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
            <p className="text-muted-foreground">배송 정보를 조회하고 있습니다...</p>
          </div>
        </div>
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold text-destructive">배송 정보 조회 실패</p>
            <p className="text-muted-foreground">
              {error instanceof Error ? error.message : '배송 정보를 찾을 수 없습니다.'}
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => refetch()}>다시 시도</Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                홈으로 돌아가기
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 데이터가 없으면
  if (!data?.data) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold">배송 정보를 찾을 수 없습니다</p>
            <Button variant="outline" onClick={() => navigate('/')}>
              홈으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 성공 - 데이터 표시
  const trackData = data.data.track;
  const events = trackData.events.edges.map((edge) => edge.node);
  const lastEvent = trackData.lastEvent;

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <TrackingResult
        trackingNumber={trackingNumber}
        courier={carrierName || '택배사'}
        lastEvent={lastEvent}
        events={events}
        isRealTime={isRealTime}
        onChangeIsRealTime={handleIsRealTime}
        onRefresh={handleRefresh}
      />
    </div>
  );
}
