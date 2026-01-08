/**
 * Environment variable validation and utilities
 * Ensures required environment variables are present and valid
 */

const REQUIRED_ENV_VARS = {
  // Optional - only required if using email functionality
  RESEND_API_KEY: {
    required: false,
    description: 'Resend API key for sending emails',
  },
  CONTACT_EMAIL: {
    required: false,
    description: 'Email address to receive contact form submissions',
    default: 'dhwang1129@gmail.com',
  },
  // Optional - only required if using Google Reviews
  GOOGLE_PLACES_API_KEY: {
    required: false,
    description: 'Google Places API key for fetching reviews',
  },
  GOOGLE_PLACE_ID: {
    required: false,
    description: 'Google Place ID for the business',
  },
};

/**
 * Validates environment variables
 * @param {boolean} throwOnMissing - Whether to throw error on missing required vars
 * @returns {Object} Validation results
 */
export function validateEnv(throwOnMissing = false) {
  const missing = [];
  const warnings = [];
  const results = {};

  for (const [key, config] of Object.entries(REQUIRED_ENV_VARS)) {
    const value = process.env[key];
    const isRequired = config.required === true;
    const hasValue = value && value.trim().length > 0;

    if (isRequired && !hasValue) {
      missing.push({ key, description: config.description });
    } else if (!hasValue && config.default) {
      results[key] = config.default;
      warnings.push({
        key,
        message: `Using default value for ${key}: ${config.default}`,
      });
    } else if (hasValue) {
      results[key] = value;
    }
  }

  if (missing.length > 0) {
    const errorMessage = `Missing required environment variables:\n${missing
      .map(({ key, description }) => `  - ${key}: ${description}`)
      .join('\n')}`;

    if (throwOnMissing) {
      throw new Error(errorMessage);
    } else {
      console.warn('⚠️ Environment variable validation:', errorMessage);
    }
  }

  if (warnings.length > 0 && process.env.NODE_ENV === 'development') {
    warnings.forEach(({ key, message }) => {
      console.warn(`⚠️ ${message}`);
    });
  }

  return {
    isValid: missing.length === 0,
    missing,
    warnings,
    values: results,
  };
}

/**
 * Gets an environment variable with optional default
 * @param {string} key - Environment variable key
 * @param {string} defaultValue - Default value if not set
 * @returns {string} Environment variable value or default
 */
export function getEnv(key, defaultValue = '') {
  return process.env[key] || defaultValue;
}

/**
 * Gets all validated environment variables
 * @returns {Object} Environment variable values
 */
export function getEnvVars() {
  const validation = validateEnv(false);
  return validation.values;
}

