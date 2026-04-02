'use client'
import Image from 'next/image'

const REVIEWS_1 = [
  { name: "Priya S.", role: "Patient", treatment: "Acne Clarity", text: "The exact acne treatment I needed. It completely transformed my skin texture. Incredible results!", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80" },
  { name: "Rahul M.", role: "Patient", treatment: "Hair PRP", text: "After years of struggling, the PRP sessions finally gave me visible thickness. Highly recommend.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80" },
  { name: "Deepa K.", role: "Patient", treatment: "Laser Diode", text: "Almost painless and very effective. The staff made me feel comfortable throughout the process.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" },
  { name: "Sarah L.", role: "Patient", treatment: "Chemical Peel", text: "Glowing skin within one session! The clinic’s ambience is also very calming and premium.", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&q=80" }
]

const REVIEWS_2 = [
  { name: "Anita V.", role: "Patient", treatment: "Pigmentation Check", text: "The dark spots on my cheeks faded visibly after just three weeks. Doctors were brilliant.", avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&q=80" },
  { name: "Vikram N.", role: "Patient", treatment: "Botox Maintenance", text: "I look visibly refreshed! So confident with the outcome of my preventative treatments.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80" },
  { name: "Chloe T.", role: "Patient", treatment: "HydraFacial", text: "Luxurious, effective, and exceptionally professional. I will definitely be back for upkeep.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80" },
  { name: "Arjun D.", role: "Patient", treatment: "Microneedling", text: "Intimidating at first, but the results are astonishing. My pores are totally minimized.", avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&q=80" }
]

const REVIEWS_3 = [
  { name: "Meera R.", role: "Patient", treatment: "Dermal Fillers", text: "Subtle but incredibly impactful. I look rested rather than \"done\". They have a great eye.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80" },
  { name: "Tariq A.", role: "Patient", treatment: "Scalp Therapy", text: "The scalp revitalization halted my hair shedding immediately. Such a relief finding this.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80" },
  { name: "Elena S.", role: "Patient", treatment: "Anti-Aging Facial", text: "An hour of pure perfection. My skin felt plumper and intensely hydrated immediately.", avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&q=80" },
  { name: "Farah K.", role: "Patient", treatment: "Laser Resurfacing", text: "Cleared my old acne scars perfectly. The downtime was minimal. Worth every penny.", avatar: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=150&q=80" }
]

function MarqueeCard({ review }: { review: Record<string, string> }) {
  return (
    <div className="flex items-center w-[300px] md:w-[390px] h-[110px] bg-[#383731] border border-white/5 rounded-xl p-3 md:p-4 gap-3 md:gap-4 mr-4 md:mr-6 cursor-pointer flex-shrink-0 transition-all duration-300 hover:border-[rgba(201,168,130,0.45)] hover:shadow-[0_0_15px_rgba(201,168,130,0.15)] group/card">
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[rgba(201,168,130,0.8)] relative shadow-inner">
        <Image src={review.avatar} alt={review.name} fill className="object-cover" />
      </div>
      <div className="flex flex-col flex-1 h-full min-w-0 justify-center py-1">
        <p className="text-[#D8D2C9] text-[12px] md:text-[13px] leading-[1.3] text-left line-clamp-2 italic mb-1 md:mb-2 tracking-wide font-light">
          &quot;{review.text}&quot;
        </p>
        <div className="flex items-end justify-between mt-auto">
          <span className="text-[#C9A882] font-semibold text-[12px] md:text-[13px] tracking-wider">{review.name}</span>
          <span className="text-[#A49F96] text-[9px] md:text-[10px] uppercase font-medium tracking-widest truncate ml-2">
            {review.treatment}
          </span>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ items, direction, duration }: { items: Record<string, string>[], direction: 'left' | 'right', duration: number }) {
  // Duplicating arrays so the marquee covers full width gracefully
  const content = [...items, ...items, ...items, ...items, ...items, ...items]

  return (
    <div className="flex overflow-hidden w-full group">
      <div 
        className="flex shrink-0 w-max group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`
        }}
      >
        {content.map((review, i) => (
          <MarqueeCard key={`a-${i}`} review={review} />
        ))}
      </div>
      <div 
        className="flex shrink-0 w-max group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`
        }}
      >
        {content.map((review, i) => (
          <MarqueeCard key={`b-${i}`} review={review} />
        ))}
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#2C2B26] overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-100%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}} />

      <div className="container mx-auto px-4 mb-16 text-center">
        <p className="text-[#C9A882] text-xs font-bold tracking-[0.25em] uppercase mb-4">
          Testimonials
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-[#F2EDE7] font-light">
          What Our Patients Say
        </h2>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-[2000px] mx-auto">
        <MarqueeRow items={REVIEWS_1} direction="left" duration={80} />
        <MarqueeRow items={REVIEWS_2} direction="right" duration={95} />
        <MarqueeRow items={REVIEWS_3} direction="left" duration={70} />
      </div>
    </section>
  )
}
