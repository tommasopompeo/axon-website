"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Container, MediaFrame } from "@/components/ui";
import { EASE, DURATION } from "@/lib/motion";

const applicationsData = [
  { 
    id: 1,
    title: "Ufficio",
    description: "Ore alla scrivania, riunioni e schermi luminosi accumulano tensione nel corpo senza che ce ne accorgiamo. AXON agisce in silenzio, mantenendo il sistema nervoso in equilibrio: meno rigidità, più lucidità.", 
    image: "/applicazioni/1.jpg"
  },
  { 
    id: 2,
    title: "Quotidianità",
    description: "La routine quotidiana è spesso più stancante di quanto si immagini. Con AXON addosso hai un supporto costante al benessere fisico, invisibile e sempre attivo — qualunque cosa stia facendo.", 
    image: "/applicazioni/2.jpg"
  },
  { 
    id: 3,
    title: "Sport",
    description: "AXON supporta la muscolatura durante la performance, migliora la gestione dell'energia e riduce la sensazione di affaticamento. Allenati di più, con meno sforzo percepito.", 
    image: "/applicazioni/3.jpg"
  },
  { 
    id: 4,
    title: "Recupero",
    description: "AXON amplifica i processi naturali di rigenerazione, riducendo i tempi di recupero tra uno sforzo e l'altro. Che sia dopo l'allenamento o una giornata intensa, il corpo ritrova equilibrio più in fretta.", 
    image: "/applicazioni/4.jpg"
  },
  { 
    id: 5,
    title: "Lavori intensivi",
    description: "In cantiere o in magazzino, arrivare a fine turno senza cedere alla fatica fa la differenza. AXON riduce il carico percepito sulla muscolatura e sostiene la concentrazione nelle condizioni più impegnative.", 
    image: "/applicazioni/5.jpg"
  },
  { 
    id: 6,
    title: "Riposo",
    description: "AXON favorisce il rilassamento del sistema nervoso nelle ore serali, preparando il corpo a un sonno più profondo e rigenerante. Non solo dormire — recuperare davvero.", 
    image: "/applicazioni/6.jpg"
  },
  { 
    id: 7,
    title: "Svago",
    description: "Che sia una passeggiata, una serata fuori o un viaggio, il tempo libero merita di essere vissuto senza pensare a come ci si sente. AXON mantiene il corpo in uno stato di benessere attivo, anche quando si stacca.", 
    image: "/applicazioni/7.jpg" 
  }
];

export default function StickyScrollApplicazioni() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numItems = applicationsData.length;
  
  // Each item gets ~45vh of scroll distance instead of 100vh for faster progression
  const itemScrollVh = 45;
  const containerHeight = `${numItems * itemScrollVh + 100}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // latest goes from 0 to 1 over 700vh of scrollable space.
    // Multiply by numItems (7) to get a value from 0 to 7.
    let index = Math.floor(latest * numItems);
    
    // Clamp index between 0 and numItems - 1
    if (index >= numItems) index = numItems - 1;
    if (index < 0) index = 0;
    
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const scrollToItem = (index: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const startY = rect.top + window.scrollY;
      const scrollableDistance = containerRef.current.scrollHeight - window.innerHeight;
      // We want to scroll to the middle of the item's scroll area
      const progress = (index + 0.5) / numItems;
      const targetScroll = startY + scrollableDistance * progress;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    scrollToItem(index);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative bg-black" 
      style={{ height: containerHeight }}
    >
      {/* Sticky wrapper */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <Container className="w-full">
          {/* Titolo solo per screen reader: ripara l'ordine dei heading
              (h1 hero → h3 dei contesti saltava il livello h2). */}
          <h2 className="sr-only">Contesti d&rsquo;uso</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            
            {/* Left Column: Vertical Interactive Accordion / Timeline */}
            <div className="flex flex-col space-y-1 py-10 lg:py-0 w-full">
              {applicationsData.map((item, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={item.id}
                    className="relative pl-6 py-4 group"
                  >
                    {/* Vertical indicator bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300 ${
                        isActive ? "bg-white" : "bg-white/10 group-hover:bg-white/30"
                      }`}
                      aria-hidden="true"
                    />

                    {/* Title — bottone vero (non div cliccabile): raggiungibile
                        e attivabile da tastiera (WCAG 2.1.1), stesso pattern di
                        ResultsAccordion. */}
                    <button
                      type="button"
                      onClick={() => handleItemClick(i)}
                      aria-expanded={isActive}
                      className="w-full text-left cursor-pointer"
                      style={{ background: 'none', border: 'none', padding: 0 }}
                    >
                      {/* white/40 e non /35: i titoli inattivi sono testo
                          "large" (30px) e a /35 il contrasto è 2.99:1, sotto
                          il minimo AA di 3:1 (misurato con axe). */}
                      <h3
                        className={`text-3xl md:text-4xl transition-all duration-300 ${
                          isActive ? "text-white" : "text-white/40"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </button>
                    
                    {/* Body Text */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: DURATION.uiSlow, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/70 mt-3 text-lg leading-relaxed pr-4">
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Media Display & Overlay Title */}
            <div className="w-full flex justify-center lg:justify-end">
              <MediaFrame>
                {applicationsData.map((item, i) => (
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
                      loading={Math.abs(i - activeIndex) <= 1 ? 'eager' : 'lazy'}
                      className="object-cover opacity-90 transition-transform duration-1000 scale-105"
                      style={{
                        transform: i === activeIndex ? 'scale(1)' : 'scale(1.05)'
                      }}
                    />
                    {/* Subtle gradient overlay at base of image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </motion.div>
                ))}
              </MediaFrame>
            </div>

          </div>
        </Container>
      </div>
    </section>
  );
}
