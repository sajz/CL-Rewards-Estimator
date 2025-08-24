
// ---------- Tail-Deadline Model (MER from p50 & p90) ----------
// Lognormal fit from p50 & p90, tail fraction after deadline, MER mapping

function num(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
function clamp(x, lo, hi) {
  const n = num(x, lo);
  return Math.min(Math.max(n, lo), hi);
}
function clamp01(x) { return clamp(x, 0, 1); }

// Normal CDF (Abramowitz–Stegun approx)
function stdNormCDF(z) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-0.5 * z * z);
  let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

export function tailFractionAfterDeadline(p50, p90, delta = 0, deadline = 4) {
  if (!(p50 > 0) || !(p90 > 0) || p90 <= p50) return NaN;
  const mu = Math.log(p50);
  const sigma = (Math.log(p90) - Math.log(p50)) / 1.2815515655; // z_0.90
  const D = Math.max(deadline - delta, 0.1);
  const z = (Math.log(D) - mu) / sigma;
  const q = 1 - stdNormCDF(z);
  return clamp(q, 0, 1);
}

export function merFromTailFraction(q) {
  // MER center & band (percent)
  let merC = 85.373 - 74.608 * q;
  let merHi = 85.300 - 59.923 * q;
  let merLo = 85.446 - 89.292 * q;
  merC = clamp(merC, 70, 86);
  merHi = clamp(merHi, 70, 86);
  merLo = clamp(merLo, 70, 86);
  return {
    center: merC,
    upper: merHi,
    lower: merLo
  };
}


