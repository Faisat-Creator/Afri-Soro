"use client";

import { motion } from "framer-motion";
import type { SorobanState } from "@/types";
import { toggleHeavenBead, toggleEarthBead } from "@/lib/soroban";

interface Props {
  state: SorobanState;
  onChange: (next: SorobanState) => void;
  readonly?: boolean;
}

export default function SorobanDisplay({ state, onChange, readonly = false }: Props) {
  const visibleRods = state.rods.slice(-5); // show last 5 rods for MVP
  const visibleStart = state.rods.length - 5;

  function handleHeaven(rodIndex: number) {
    if (readonly) return;
    onChange(toggleHeavenBead(state, visibleStart + rodIndex));
  }

  function handleEarth(rodIndex: number, beadIndex: number) {
    if (readonly) return;
    onChange(toggleEarthBead(state, visibleStart + rodIndex, beadIndex));
  }

  return (
    <div className="flex flex-col items-center select-none">
      {/* Frame */}
      <div className="bg-brand-brown rounded-2xl p-4 shadow-2xl border-4 border-brand-gold">
        {/* Heaven section */}
        <div className="flex gap-3 mb-1 justify-center">
          {visibleRods.map((rod, ri) => (
            <div key={ri} className="flex flex-col items-center w-10">
              <motion.button
                whileTap={readonly ? {} : { scale: 0.9 }}
                onClick={() => handleHeaven(ri)}
                className={`w-8 h-8 rounded-full border-2 transition-colors ${
                  rod.heavenBead.active
                    ? "bg-brand-gold border-brand-orange shadow-lg"
                    : "bg-amber-100 border-amber-300 opacity-50"
                } ${readonly ? "cursor-default" : "cursor-pointer"}`}
                aria-label={`Heaven bead rod ${ri + 1} ${rod.heavenBead.active ? "active" : "inactive"}`}
              />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-1 bg-brand-gold rounded mb-1" />

        {/* Earth section */}
        <div className="flex gap-3 justify-center">
          {visibleRods.map((rod, ri) => (
            <div key={ri} className="flex flex-col items-center gap-1 w-10">
              {rod.earthBeads.map((bead, bi) => (
                <motion.button
                  key={bi}
                  whileTap={readonly ? {} : { scale: 0.9 }}
                  onClick={() => handleEarth(ri, bi)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors ${
                    bead.active
                      ? "bg-brand-orange border-brand-brown shadow-md"
                      : "bg-amber-100 border-amber-300 opacity-50"
                  } ${readonly ? "cursor-default" : "cursor-pointer"}`}
                  aria-label={`Earth bead ${bi + 1} rod ${ri + 1} ${bead.active ? "active" : "inactive"}`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Place value labels */}
        <div className="flex gap-3 mt-2 justify-center">
          {visibleRods.map((rod, ri) => (
            <div key={ri} className="w-10 text-center text-xs text-amber-200 font-mono">
              {rod.placeValue >= 1000
                ? `${rod.placeValue / 1000}k`
                : rod.placeValue}
            </div>
          ))}
        </div>
      </div>

      {/* Current value display */}
      <div className="mt-4 text-3xl font-bold text-brand-gold font-mono">
        {state.value.toLocaleString()}
      </div>
    </div>
  );
}
