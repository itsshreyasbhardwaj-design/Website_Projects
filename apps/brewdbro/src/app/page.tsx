import { Hero } from "@/components/sections/Hero";
import { Combo } from "@/components/sections/Combo";
import { ThreeCups } from "@/components/sections/ThreeCups";
import { Ritual } from "@/components/sections/Ritual";
import { Cinematic } from "@/components/sections/Cinematic";
import { SocialProof } from "@/components/sections/SocialProof";
import { BusinessStrip } from "@/components/sections/BusinessStrip";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Combo />
      <ThreeCups />
      <Ritual />
      <Cinematic />
      <SocialProof />
      <BusinessStrip />
      <FinalCTA />
    </main>
  );
}
