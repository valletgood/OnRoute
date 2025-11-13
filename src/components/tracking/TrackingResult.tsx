import { TrackingSummary } from './TrackingSummary';
import { EnhancedTimeline } from './EnhancedTimeline';
import type { TrackingEvent } from '@/types/tracking';

interface TrackingResultProps {
  trackingNumber: string;
  courier: string;
  lastEvent: TrackingEvent;
  events: TrackingEvent[];
  isRealTime: boolean;
  onChangeIsRealTime: (value: boolean) => void;
  onRefresh: () => void;
}

export function TrackingResult({
  trackingNumber,
  courier,
  lastEvent,
  events,
  isRealTime,
  onChangeIsRealTime,
  onRefresh,
}: TrackingResultProps) {
  return (
    <div className="space-y-6">
      {/* 상단 요약 카드 */}
      <TrackingSummary
        trackingNumber={trackingNumber}
        courier={courier}
        lastEvent={lastEvent}
        isRealTime={isRealTime}
        onRefresh={onRefresh}
        onChangeIsRealTime={onChangeIsRealTime}
      />

      {/* 메인 컨텐츠 영역 */}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
        {/* 좌측: 타임라인 */}
        <div className="lg:col-span-2">
          <EnhancedTimeline events={events} lastEventTime={lastEvent.time} />
        </div>
      </div>
    </div>
  );
}
