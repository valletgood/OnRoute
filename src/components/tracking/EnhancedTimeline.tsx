import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Truck, MapPin, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TrackingEvent } from '@/types/tracking';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

interface EnhancedTimelineProps {
  events: TrackingEvent[];
  lastEventTime: string;
}

// 상태 코드에 따른 아이콘 매핑
const getStatusIcon = (statusCode: string) => {
  switch (statusCode) {
    case 'DELIVERED':
      return <Home className="h-4 w-4" />;
    case 'OUT_FOR_DELIVERY':
      return <Truck className="h-4 w-4" />;
    case 'IN_TRANSIT':
      return <Truck className="h-4 w-4" />;
    case 'AT_PICKUP':
      return <Package className="h-4 w-4" />;
    default:
      return <MapPin className="h-4 w-4" />;
  }
};

// 상태 코드에 따른 상태 타입 결정
const getEventStatus = (event: TrackingEvent, lastEventTime: string): 'completed' | 'current' => {
  return event.time === lastEventTime ? 'current' : 'completed';
};

export function EnhancedTimeline({ events, lastEventTime }: EnhancedTimelineProps) {
  // 시간순으로 정렬 (최신이 아래)
  const sortedEvents = [...events].sort((a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();
    return timeA - timeB;
  });

  const formatDateTime = (timeString: string) => {
    try {
      const date = parseISO(timeString);
      return {
        date: format(date, 'yyyy년 MM월 dd일', { locale: ko }),
        time: format(date, 'HH:mm', { locale: ko }),
      };
    } catch {
      const [date, time] = timeString.split('T');
      return {
        date: date || timeString,
        time: time?.substring(0, 5) || '',
      };
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>배송 진행 상황</CardTitle>
        <CardDescription>실시간 배송 상태를 확인하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6">
          {sortedEvents.map((event, index) => {
            const isLast = index === sortedEvents.length - 1;
            const eventStatus = getEventStatus(event, lastEventTime);
            const isCompleted = eventStatus === 'completed';
            const isCurrent = eventStatus === 'current';
            const { date, time } = formatDateTime(event.time);

            return (
              <div key={`${event.time}-${index}`} className="relative flex gap-4">
                {/* 타임라인 아이콘 및 연결선 */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                      isCompleted
                        ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                        : isCurrent
                          ? 'border-primary bg-background text-primary shadow-lg shadow-primary/30 animate-pulse'
                          : 'border-muted bg-background text-muted-foreground',
                    )}
                  >
                    {getStatusIcon(event.status.code)}
                    {isCurrent && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-primary" />
                      </span>
                    )}
                  </div>
                  {!isLast && (
                    <div
                      className={cn(
                        'mt-2 h-full w-0.5 transition-colors',
                        isCompleted ? 'bg-primary' : 'bg-muted',
                      )}
                      style={{ minHeight: '80px' }}
                    />
                  )}
                </div>

                {/* 타임라인 내용 */}
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <p
                        className={cn(
                          'font-semibold text-base',
                          isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground',
                        )}
                      >
                        {event.status.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                        {date}
                      </p>
                      <p className="text-xs text-muted-foreground whitespace-nowrap">{time}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
