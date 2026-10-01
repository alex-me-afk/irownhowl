/**
 * Friend Island mini-game spots, in map world coordinates (the map loads at scale 1, no offset).
 * Positions were measured from the screen / table meshes in the island model:
 *  - arcade: the 16 cabinet screens in the arcade hall
 *  - tabletop: the 4 wooden game tables next to it
 */
export type StationKind = "arcade" | "tabletop";
export type Station = { kind: StationKind; x: number; z: number };

const ARCADE_X = [-163, -165.6, -168.2, -170.8, -173.4, -176];
export const ISLAND_STATIONS: Station[] = [
  ...ARCADE_X.map((x) => ({ kind: "arcade" as const, x, z: 107.9 })),
  ...ARCADE_X.map((x) => ({ kind: "arcade" as const, x, z: 114.3 })),
  ...[117, 121.3, 125.7, 130].map((z) => ({ kind: "arcade" as const, x: -176.3, z })),
  { kind: "tabletop", x: -149, z: 114 },
  { kind: "tabletop", x: -155.5, z: 114 },
  { kind: "tabletop", x: -155.5, z: 121.5 },
  { kind: "tabletop", x: -149, z: 121.7 },
];

const REACH: Record<StationKind, number> = { arcade: 1.8, tabletop: 2.6 };

export function nearestStation(x: number, z: number): Station | null {
  let best: Station | null = null;
  let bestD = Infinity;
  for (const s of ISLAND_STATIONS) {
    const d = Math.hypot(s.x - x, s.z - z);
    if (d < REACH[s.kind] && d < bestD) {
      best = s;
      bestD = d;
    }
  }
  return best;
}

/** Leftover node in the island model that must never be shown. */
export const ISLAND_STRAY_NODES = new Set(["Cube"]);
