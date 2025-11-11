import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, RefreshCw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { TrackingEvent } from '@/types/tracking';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

interface TrackingSummaryProps {
  trackingNumber: string;
  courier: string;
  lastEvent: TrackingEvent;
  isRealTime?: boolean;
  onRefresh?: () => void;
}

export function TrackingSummary({
  trackingNumber,
  courier,
  lastEvent,
  isRealTime = true,
  onRefresh,
}: TrackingSummaryProps) {
  const getStatusVariant = (statusCode: string) => {
    switch (statusCode) {
      case 'DELIVERED':
        return 'default';
      case 'OUT_FOR_DELIVERY':
      case 'IN_TRANSIT':
        return 'secondary';
      case 'AT_PICKUP':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (statusCode: string) => {
    switch (statusCode) {
      case 'DELIVERED':
        return 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400';
      case 'OUT_FOR_DELIVERY':
      case 'IN_TRANSIT':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400';
      case 'AT_PICKUP':
        return 'bg-orange-500/10 border-orange-500/20 text-orange-700 dark:text-orange-400';
      default:
        return 'bg-muted';
    }
  };

  const formatTime = (timeString: string) => {
    try {
      const date = parseISO(timeString);
      return format(date, 'yyyy년 MM월 dd일 HH:mm', { locale: ko });
    } catch {
      return timeString;
    }
  };

  return (
    <Card className="border-2 overflow-hidden">
      <div className={`p-6 ${getStatusColor(lastEvent.status.code)}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-background/50">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{courier}</h1>
                <p className="text-sm text-muted-foreground mt-1">운송장 번호: {trackingNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant={getStatusVariant(lastEvent.status.code)}
                className="text-base px-3 py-1"
              >
                {lastEvent.status.name}
              </Badge>
              {isRealTime && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span>실시간 업데이트 중</span>
                </div>
              )}
            </div>
            <div className="flex items-start gap-2 pt-2 border-t border-border/50">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">{formatTime(lastEvent.time)}</p>
                <p className="text-sm text-muted-foreground">{lastEvent.description}</p>
              </div>
            </div>
          </div>
          {onRefresh && (
            <Button variant="outline" size="icon" onClick={onRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
