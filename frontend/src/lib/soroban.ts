/**
 * Soroban Engine — pure mathematical logic, no UI concerns.
 * Each rod has 1 heaven bead (value 5) and 4 earth beads (value 1 each).
 * Rod value = (heaven ? 5 : 0) + activeEarthCount
 */

import type { Rod, SorobanState } from "@/types";

const ROD_COUNT = 7; // supports up to 9,999,999

// ─── Factory ──────────────────────────────────────────────────────────────────

export function createRod(placeValue: number): Rod {
  return {
    heavenBead: { active: false },
    earthBeads: Array.from({ length: 4 }, () => ({ active: false })),
    placeValue,
  };
}

export function createSoroban(): SorobanState {
  const placeValues = Array.from(
    { length: ROD_COUNT },
    (_, i) => Math.pow(10, ROD_COUNT - 1 - i)
  );
  return {
    rods: placeValues.map(createRod),
    value: 0,
  };
}

// ─── Rod value ────────────────────────────────────────────────────────────────

export function getRodValue(rod: Rod): number {
  const heavenValue = rod.heavenBead.active ? 5 : 0;
  const earthValue = rod.earthBeads.filter((b) => b.active).length;
  return heavenValue + earthValue;
}

// ─── Total value ──────────────────────────────────────────────────────────────

export function getSorobanValue(state: SorobanState): number {
  return state.rods.reduce(
    (total, rod) => total + getRodValue(rod) * rod.placeValue,
    0
  );
}

// ─── Number → Soroban ────────────────────────────────────────────────────────

export function numberToSoroban(n: number): SorobanState {
  const state = createSoroban();
  let remaining = Math.round(Math.abs(n));

  for (const rod of state.rods) {
    const digit = Math.floor(remaining / rod.placeValue);
    remaining -= digit * rod.placeValue;

    rod.heavenBead.active = digit >= 5;
    const earthCount = digit % 5;
    for (let i = 0; i < earthCount; i++) {
      rod.earthBeads[i].active = true;
    }
  }

  return { ...state, value: n };
}

// ─── Bead toggles (for interactive UI) ───────────────────────────────────────

export function toggleHeavenBead(state: SorobanState, rodIndex: number): SorobanState {
  const rods = state.rods.map((rod, i) => {
    if (i !== rodIndex) return rod;
    return {
      ...rod,
      heavenBead: { active: !rod.heavenBead.active },
    };
  });
  const next = { rods, value: 0 };
  return { ...next, value: getSorobanValue(next) };
}

export function toggleEarthBead(
  state: SorobanState,
  rodIndex: number,
  beadIndex: number
): SorobanState {
  const rods = state.rods.map((rod, i) => {
    if (i !== rodIndex) return rod;
    // When activating bead N, activate all beads 0..N; when deactivating, deactivate N..3
    const currentActive = rod.earthBeads.filter((b) => b.active).length;
    const isActivating = beadIndex >= currentActive;
    const earthBeads = rod.earthBeads.map((b, j) => ({
      active: isActivating ? j <= beadIndex : j < beadIndex,
    }));
    return { ...rod, earthBeads };
  });
  const next = { rods, value: 0 };
  return { ...next, value: getSorobanValue(next) };
}

export function resetSoroban(): SorobanState {
  const state = createSoroban();
  return { ...state, value: 0 };
}

// ─── Validation ───────────────────────────────────────────────────────────────

export function checkAnswer(sorobanValue: number, correctAnswer: number): boolean {
  return Math.abs(sorobanValue - correctAnswer) < 0.001;
}
