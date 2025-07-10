type Player = {
  rating: number;
  rd: number;
  name: string;
};

export function simulateMatchProbabilities(
  playerA: Player,
  playerB: Player
): { winner: "A" | "B"; probability: number } {
  const probAwin = winProbability(playerA.rating, playerA.rd, playerB.rating, playerB.rd);
  const probBwin = 1 - probAwin;

  if (probAwin > probBwin) {
    return { winner: "A", probability: +(probAwin * 100).toFixed(2) };
  } else {
    return { winner: "B", probability: +(probBwin * 100).toFixed(2) };
  }
}

// Fórmulas Glicko-2 simplificadas
function g(phi: number): number {
  return 1 / Math.sqrt(1 + (3 * phi * phi) / (Math.PI * Math.PI));
}

function ratingToMu(rating: number): number {
  return (rating - 1500) / 173.7178;
}

function rdToPhi(rd: number): number {
  return rd / 173.7178;
}

function winProbability(
  ratingA: number,
  rdA: number,
  ratingB: number,
  rdB: number
): number {
  const muA = ratingToMu(ratingA);
  const muB = ratingToMu(ratingB);
  const phiB = rdToPhi(rdB);

  const gPhiB = g(phiB);
  const exponent = -gPhiB * (muA - muB);
  return 1 / (1 + Math.exp(exponent));
}
