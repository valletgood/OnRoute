import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, User, Truck, Clock, Calendar } from 'lucide-react';

interface TrackingDetailsProps {
  sender?: {
    name: string;
    address?: string;
  };
  recipient?: {
    name: string;
    address: string;
    phone?: string;
  };
  currentLocation?: string;
  estimatedDelivery?: string;
  courier?: string;
}

export function TrackingDetails({
  sender = { name: 'ABC 쇼핑몰', address: '서울시 강남구 테헤란로 123' },
  recipient = { name: '홍길동', address: '서울시 서초구 서초대로 456', phone: '010-1234-5678' },
  currentLocation = '서울 강남구',
  estimatedDelivery = '2024년 1월 15일 14:00',
  courier = 'CJ대한통운',
}: TrackingDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>배송 상세 정보</CardTitle>
        <CardDescription>배송 관련 상세 정보를 확인하세요</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 보낸 사람 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>보낸 사람</span>
          </div>
          <div className="pl-6 space-y-1">
            <p className="text-sm font-medium">{sender.name}</p>
            {sender.address && <p className="text-sm text-muted-foreground">{sender.address}</p>}
          </div>
        </div>

        <Separator />

        {/* 받는 사람 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>받는 사람</span>
          </div>
          <div className="pl-6 space-y-1">
            <p className="text-sm font-medium">{recipient.name}</p>
            <p className="text-sm text-muted-foreground">{recipient.address}</p>
            {recipient.phone && <p className="text-sm text-muted-foreground">{recipient.phone}</p>}
          </div>
        </div>

        <Separator />

        {/* 현재 위치 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Truck className="h-4 w-4 text-muted-foreground" />
            <span>현재 위치</span>
          </div>
          <div className="pl-6">
            <p className="text-sm text-muted-foreground">{currentLocation}</p>
          </div>
        </div>

        <Separator />

        {/* 예상 배송 시간 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>예상 배송 시간</span>
          </div>
          <div className="pl-6">
            <p className="text-sm text-muted-foreground">{estimatedDelivery}</p>
          </div>
        </div>

        <Separator />

        {/* 택배사 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>택배사</span>
          </div>
          <div className="pl-6">
            <p className="text-sm text-muted-foreground">{courier}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
