import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TrackingItem {
  id: string;
  trackingNumber: string;
  courier: string;
  status: string;
  lastEvent: string;
  lastEventTime: string;
  eta?: string;
}

const mockRecentTrackings: TrackingItem[] = [
  {
    id: '1',
    trackingNumber: '1234567890123',
    courier: 'CJ대한통운',
    status: '배송중',
    lastEvent: '배송 기사님께서 운송 중',
    lastEventTime: '2분 전',
    eta: '오늘 14:00 예상',
  },
  {
    id: '2',
    trackingNumber: '9876543210987',
    courier: '한진택배',
    status: '배송완료',
    lastEvent: '수령인에게 전달 완료',
    lastEventTime: '1시간 전',
  },
  {
    id: '3',
    trackingNumber: '5555555555555',
    courier: '롯데택배',
    status: '집하',
    lastEvent: '집하 매장에서 접수 완료',
    lastEventTime: '3시간 전',
  },
];

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

function TrackingCard({ item }: { item: TrackingItem }) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case '배송완료':
        return 'default';
      case '배송중':
        return 'secondary';
      case '집하':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="transition-all hover:bg-muted/50 cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-base">{item.courier}</CardTitle>
              <CardDescription className="text-xs">{item.trackingNumber}</CardDescription>
            </div>
          </div>
          <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{item.lastEvent}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{item.lastEventTime}</span>
          </div>
          {item.eta && <span className="text-primary">{item.eta}</span>}
        </div>
      </CardContent>
    </Card>
  );
}

export function RecentTrackingSection({ isLoading = false }: { isLoading?: boolean }) {
  const navigate = useNavigate();
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
            : mockRecentTrackings.map((item) => <TrackingCard key={item.id} item={item} />)}
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
