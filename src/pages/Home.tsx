import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { RecentTrackingSection } from '@/components/sections/RecentTrackingSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <RecentTrackingSection />
      <FeaturesSection />
    </div>
  );
}
