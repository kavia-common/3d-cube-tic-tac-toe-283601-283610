import { getEnv } from '../config/env';

const DEFAULT_FLAGS = {
  explodeOnRelease: true,
  keyboardEnabled: true,
};

// PUBLIC_INTERFACE
export function getFeatureFlags() {
  /** Returns a merged feature flag object from env with safe defaults. */
  const raw = getEnv().FEATURE_FLAGS;
  try {
    const parsed = typeof raw === 'string'
      ? (raw.trim().startsWith('{') ? JSON.parse(raw) : parseFromCSV(raw))
      : {};
    return { ...DEFAULT_FLAGS, ...parsed };
  } catch {
    return { ...DEFAULT_FLAGS };
  }
}

function parseFromCSV(csv) {
  // Supports "explodeOnRelease=true,keyboardEnabled=false"
  const result = {};
  if (!csv) return result;
  csv.split(',').forEach(pair => {
    const [k, v] = pair.split('=').map(s => s?.trim());
    if (!k) return;
    if (v === undefined) {
      result[k] = true;
    } else {
      if (v.toLowerCase() === 'true') result[k] = true;
      else if (v.toLowerCase() === 'false') result[k] = false;
      else result[k] = v;
    }
  });
  return result;
}
