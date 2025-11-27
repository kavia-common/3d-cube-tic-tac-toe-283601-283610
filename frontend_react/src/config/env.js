//
// PUBLIC_INTERFACE
export function getEnv() {
  /**
   * Returns environment values from process.env in a safe way.
   * Note: These are injected by CRA at build-time. Do not read .env directly.
   */
  return {
    API_BASE: process.env.REACT_APP_API_BASE || '',
    BACKEND_URL: process.env.REACT_APP_BACKEND_URL || '',
    FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || '',
    WS_URL: process.env.REACT_APP_WS_URL || '',
    NODE_ENV: process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || 'development',
    NEXT_TELEMETRY_DISABLED: process.env.REACT_APP_NEXT_TELEMETRY_DISABLED || '1',
    ENABLE_SOURCE_MAPS: process.env.REACT_APP_ENABLE_SOURCE_MAPS || 'true',
    PORT: process.env.REACT_APP_PORT || '3000',
    TRUST_PROXY: process.env.REACT_APP_TRUST_PROXY || '0',
    LOG_LEVEL: process.env.REACT_APP_LOG_LEVEL || 'info',
    HEALTHCHECK_PATH: process.env.REACT_APP_HEALTHCHECK_PATH || '/health',
    FEATURE_FLAGS: process.env.REACT_APP_FEATURE_FLAGS || '{}',
    EXPERIMENTS_ENABLED: process.env.REACT_APP_EXPERIMENTS_ENABLED || '0',
  };
}
