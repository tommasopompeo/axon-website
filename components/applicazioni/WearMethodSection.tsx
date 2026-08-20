"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Container, MediaFrame } from "@/components/ui";
import { EASE, DURATION } from "@/lib/motion";

const wearMethodsData = [
  {
    id: 1,
    title: "AXON + Band",
    description:
      "Il modo più immediato per indossare AXON. Inserisci il dispositivo nell’alloggiamento del cinturino AXON Band e allaccialo al polso come un orologio. Nessuna cucitura, nessuna preparazione: indossalo e sei pronto. Ideale per chi cerca massima praticità senza rinunciare al contatto diretto con la pelle.",
    image: "/applicazioni_axonband.jpg",
  },
  {
    id: 2,
    title: "AXON + Shell",
    description:
      "Cuci il guscio trasparente AXON Shell sul lato interno del capo che preferisci, all’altezza desiderata. Una volta fissato, ti basterà inserire il dispositivo AXON nel guscio ogni volta che indossi quel capo. I punti di applicazione più comuni sono la nuca, il centro del petto, tra le scapole e la zona lombare — tutti punti in cui il tessuto resta aderente al corpo.",
    image: "/applicazioni_axonshell.jpg",
  },
];

export default function WearMethodSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numItems = wearMethodsData.length;

  // Match StickyScrollApplicazioni: 45vh per item + 100vh buffer
  const itemScrollVh = 45;
  const containerHeight = `${numItems * itemScrollVh + 100}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.floor(latest * numItems);
    if (index >= numItems) index = numItems - 1;
    if (index < 0) index = 0;
    if (index !== activeIndex) setActiveIndex(index);
  });

  const scrollToItem = (index: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const startY = rect.top + window.scrollY;
      const scrollableDistance =
        containerRef.current.scrollHeight - window.innerHeight;
      const progress = (index + 0.5) / numItems;
      const targetScroll = startY + scrollableDistance * progress;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black">
      {/* ── Section header — sits ABOVE the scroll-pinned zone ── */}
      <div className="pb-10 lg:pb-14" style={{ paddingTop: 'var(--section-y)' }}>
        <Container>
          {/* Titolo: sotto lg niente clamp/nowrap (a 375px il clamp
              sforava il viewport dentro l'overflow-hidden del genitore) —
              fisso a 2.125rem/3rem per fascia, invariato da lg. */}
          <h2
            className="text-white mb-5 text-[2.125rem] md:text-[3rem] lg:[font-size:clamp(2.8rem,5.2vw,5.2rem)]"
            style={{
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
            }}
          >
            Scegli come indossarlo,{" "}
            <br className="hidden lg:block" />
            AXON funziona dovunque
          </h2>
          {/* text-lg → md:text-xl (non lg:text-xl): il token --fs-lead da
              tablet (20px) coincide col valore desktop esistente, quindi lo
              stesso passaggio anticipato a md riproduce l'attuale resa a
              lg invariata e allinea anche la fascia tablet. */}
          <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl">
            Qualunque metodo tu scelga, AXON si attiva nel momento in cui entra
            in contatto con il corpo. Non importa il punto di applicazione: il
            sistema agisce sull&rsquo;intero organismo attraverso il contatto
            diretto.
          </p>
        </Container>
      </div>

      {/* ── Sotto lg: swipe deck, stesso pattern di "Contesti d'uso" —
          card 4:3, titolo 1.75rem, testo 17px, gap 14px, 84%/50% di
          larghezza. Zero scroll-jacking, zero position:sticky. ── */}
      <section className="lg:hidden pb-14">
        <div className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 [scroll-padding-left:1.5rem] md:[scroll-padding-left:3rem] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {wearMethodsData.map((item, i) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 flex-[0_0_84%] md:flex-[0_0_calc(50%-7px)] snap-start"
            >
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading={i === 0 ? 'eager' : 'lazy'}
                  sizes="(min-width: 768px) 50vw, 84vw"
                  className="object-cover object-center opacity-90"
                />
              </div>
              <h3 className="text-[1.75rem] font-normal leading-[1.1] text-white">{item.title}</h3>
              <p className="text-[17px] leading-relaxed text-white/70" style={{ textWrap: 'pretty' }}>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Da lg: comportamento invariato (scroll-jack + pin) ── */}
      <div className="hidden lg:block">
        <section
          ref={containerRef}
          className="relative bg-black"
          style={{ height: containerHeight }}
        >
          {/* Sticky panel — full screen, image + accordion vertically centered */}
          <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
            <Container className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

                {/* ── Left: Image ── */}
                <div className="w-full flex justify-center lg:justify-start order-2 lg:order-1">
                  {/* Identical sizing & styling to StickyScrollApplicazioni */}
                  <MediaFrame>
                    {wearMethodsData.map((item, i) => (
                      <motion.div
                        key={item.id}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: i === activeIndex ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1280px) 620px, (min-width: 1024px) 576px, 512px"
                          className="object-cover object-center opacity-90 transition-transform duration-1000 scale-105"
                          style={{
                            transform: i === activeIndex ? "scale(1)" : "scale(1.05)",
                          }}
                        />
                        {/* Subtle gradient overlay at base of image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </motion.div>
                    ))}
                  </MediaFrame>
                </div>

                {/* ── Right: Accordion ── */}
                <div className="flex flex-col space-y-1 w-full order-1 lg:order-2">
                  {wearMethodsData.map((item, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <div
                        key={item.id}
                        className="relative pl-6 py-5 group"
                      >
                        {/* Vertical indicator */}
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300 ${
                            isActive
                              ? "bg-white"
                              : "bg-white/10 group-hover:bg-white/30"
                          }`}
                          aria-hidden="true"
                        />

                        {/* Title — bottone vero per l'accesso da tastiera e
                            white/40 per il contrasto 3:1 su testo large: stessi
                            fix di StickyScrollApplicazioni, v. commenti lì. */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveIndex(i);
                            scrollToItem(i);
                          }}
                          aria-expanded={isActive}
                          className="w-full text-left cursor-pointer"
                          style={{ background: "none", border: "none", padding: 0 }}
                        >
                          <h3
                            className={`text-3xl md:text-4xl transition-all duration-300 ${
                              isActive ? "text-white" : "text-white/40"
                            }`}
                          >
                            {item.title}
                          </h3>
                        </button>

                        {/* Expandable body */}
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: DURATION.uiSlow, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <p className="text-white/70 mt-3 text-base lg:text-lg leading-relaxed pr-4">
                                {item.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

              </div>
            </Container>
          </div>
        </section>
      </div>

      {/* ── Bottom padding before next section ── */}
      <div className="hidden lg:block" style={{ paddingBottom: 'var(--section-y)' }} />
    </div>
  );
}
