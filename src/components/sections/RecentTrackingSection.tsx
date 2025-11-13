import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/configStore';
import type { RecentTracking } from '@/redux/slice/trackingSlice';
import { formatDate } from '@/lib/dateUtils';

function TrackingCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-32 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-24" />
      </CardContent>
    </Card>
  );
}

function TrackingCard({
  item,
  onClick,
}: {
  item: RecentTracking;
  onClick: (tracking: RecentTracking) => void;
}) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'default';
      case 'IN_TRANSIT':
        return 'secondary';
      case 'AT_PICKUP':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="transition-all hover:bg-muted/50 cursor-pointer">
      <CardHeader onClick={() => onClick(item)}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-base">{item.carrierName}</CardTitle>
              <CardDescription className="text-xs">{item.trackingNumber}</CardDescription>
            </div>
          </div>
          <Badge variant={getStatusVariant(item.lastEvent.status.code)}>
            {item.lastEvent.status.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{item.lastEvent.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{formatDate(item.lastEvent.time)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RecentTrackingSection({ isLoading = false }: { isLoading?: boolean }) {
  const recentTrackings = useSelector((state: RootState) => state.tracking.recentTrackings);
  const navigate = useNavigate();

  const handleClickHistory = (tracking: RecentTracking) => {
    const { carrierId, trackingNumber } = tracking;
    if (!trackingNumber.trim()) {
      return;
    }

    // Dashboard로 이동하면서 쿼리 파라미터로 전달
    const params = new URLSearchParams({
      trackingNumber: trackingNumber.trim(),
      carrierId: carrierId || 'auto',
    });

    navigate(`/dashboard?${params.toString()}`);
  };

  const handleClickMore = () => {
    navigate('/history');
  };

  return (
    <section className="w-full py-12 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">최근 조회한 배송</h2>
            <p className="text-muted-foreground mt-2">
              빠르게 다시 확인하고 싶은 배송 정보를 찾아보세요
            </p>
          </div>
          <Button variant="outline" className="hidden sm:flex" onClick={handleClickMore}>
            더 보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <TrackingCardSkeleton key={i} />)
            : recentTrackings.map((item) => (
                <TrackingCard key={item.lastEvent.time} item={item} onClick={handleClickHistory} />
              ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Button variant="outline" className="w-full sm:w-auto">
            더 보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
