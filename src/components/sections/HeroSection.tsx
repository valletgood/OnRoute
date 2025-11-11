import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { COURIER_COMPANIES } from '@/define/courierCompanies';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const navigate = useNavigate();

  const handleSelectedCompany = (company: string) => {
    setSelectedCompany(company);
  };

  const handleTrackingNumber = (number: string) => {
    setTrackingNumber(number);
  };

  const handleSearch = () => {
    if (!trackingNumber.trim()) {
      return;
    }

    // Dashboard로 이동하면서 쿼리 파라미터로 전달
    const params = new URLSearchParams({
      trackingNumber: trackingNumber.trim(),
      carrierId: selectedCompany || 'auto',
    });

    navigate(`/dashboard?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* 메인 타이틀 */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              배송의 흐름을 한눈에,
              <br />
              실시간으로 확인하세요
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              React Query 기반의 실시간 배송 상태 추적 서비스
            </p>
          </div>

          {/* 검색 영역 */}
          <Card className="w-full max-w-2xl border-2 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="예: 1234567890123"
                    className="pl-9 text-base"
                    value={trackingNumber}
                    onChange={(e) => handleTrackingNumber(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <Select
                  defaultValue="auto"
                  value={selectedCompany}
                  onValueChange={handleSelectedCompany}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="택배사 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {COURIER_COMPANIES.map((company) => (
                      <SelectItem key={company.value} value={company.value}>
                        {company.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={handleSearch}
                  disabled={!trackingNumber.trim()}
                >
                  배송 조회
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
