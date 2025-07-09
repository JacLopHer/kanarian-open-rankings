function simulateMatch(
  ratingA: number,
  rdA: number,
  ratingB: number,
  rdB: number,
  drawProbability = 0.1 // probabilidad fija de empate, ajustable
): "A" | "B" | "D" {
  const probAwin = winProbability(ratingA, rdA, ratingB, rdB);

  // Probabilidad que gana B es el resto menos empate
  const probBwin = 1 - probAwin - drawProbability;

  // Ajustar si drawProbability es muy alta y hace probBwin negativa
  const adjustedDraw = drawProbability;
  const adjustedBwin = probBwin < 0 ? 0 : probBwin;
  const adjustedAwin = 1 - adjustedBwin - adjustedDraw;

  // Generamos un número aleatorio entre 0 y 1
  const rand = Math.random();

  if (rand < adjustedAwin) {
    return "A";
  } else if (rand < adjustedAwin + adjustedBwin) {
    return "B";
  } else {
    return "D";
  }
}


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
  const E = 1 / (1 + Math.exp(exponent));

  return E;
}