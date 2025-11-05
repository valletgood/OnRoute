import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Database, Palette } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: '실시간 갱신 (React Query Polling)',
    description: '배송 상태를 15초 단위로 자동 갱신하여 최신 정보를 제공합니다.',
  },
  {
    icon: <Database className="h-8 w-8 text-primary" />,
    title: '오프라인 캐싱',
    description: '최근 조회한 배송 정보를 자동으로 저장하여 오프라인에서도 확인 가능합니다.',
  },
  {
    icon: <Palette className="h-8 w-8 text-primary" />,
    title: 'ShadCN 기반 다크모드 UI',
    description: '사용자 친화적인 인터페이스와 편리한 다크모드 전환을 제공합니다.',
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-left mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">주요 기능</h2>
          <p className="text-muted-foreground max-w-[700px]">
            실시간 배송 추적을 위한 강력한 기능들을 만나보세요
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
