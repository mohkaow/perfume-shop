// Configuration - Version Information
// ใช้สำหรับแสดงเวอร์ชันในแอพ

export const APP_CONFIG = {
  // Version Information
  VERSION: '1.1.0',
  VERSION_NAME: 'Stable Release',
  RELEASE_DATE: '2025-11-28',
  LAST_UPDATED: '2025-11-28',
  
  // Build Information
  BUILD_NUMBER: '20251128',
  ENVIRONMENT: 'production',
  
  // Feature Flags
  FEATURES: {
    TABLE_VIEW: true,
    ORDER_FILTERS: true,
    PAYMENT_SLIP_UPLOAD: true,
    ADMIN_DASHBOARD: true,
    REAL_TIME_STATS: true,
  },
  
  // API Configuration
  API: {
    FIRESTORE_ENABLED: true,
    STORAGE_ENABLED: true,
    AUTHENTICATION_ENABLED: true,
  },
  
  // App Information
  APP_NAME: 'Perfume Shop',
  APP_DESCRIPTION: 'น้ำหอมคัดพิเศษ กลิ่นเป็นเอกลักษณ์ของแบรนด์คุณ',
  APP_AUTHOR: 'Your Name',
  APP_WEBSITE: 'https://perfume-shop-eta.vercel.app',
  
  // Contact Information
  SUPPORT_EMAIL: 'support@perfume-shop.com',
  ADMIN_EMAIL: 'admin@perfume-shop.com',
  
  // Limits & Configuration
  LIMITS: {
    MAX_FILE_SIZE_MB: 5,
    MAX_PRODUCTS: 100,
    MAX_ORDERS: 999999,
  },
  
  // Version History
  VERSIONS: {
    '1.1.0': {
      name: 'Stable Release',
      date: '2025-11-28',
      features: ['Table View', 'Enhanced Filters', 'Better Error Handling'],
      status: 'active'
    },
    '1.0.0': {
      name: 'Initial Release',
      date: '2025-11-27',
      features: ['Product Catalog', 'Shopping Cart', 'Admin Panel'],
      status: 'active'
    }
  }
};

// Helper function to get version string
export function getVersionString() {
  return `${APP_CONFIG.APP_NAME} v${APP_CONFIG.VERSION}`;
}

// Helper function to get version info
export function getVersionInfo() {
  return {
    version: APP_CONFIG.VERSION,
    name: APP_CONFIG.VERSION_NAME,
    releaseDate: APP_CONFIG.RELEASE_DATE,
    buildNumber: APP_CONFIG.BUILD_NUMBER,
    environment: APP_CONFIG.ENVIRONMENT,
  };
}

// Helper function to check if feature is enabled
export function isFeatureEnabled(featureName) {
  return APP_CONFIG.FEATURES[featureName] || false;
}

// Log version info to console
if (typeof window !== 'undefined') {
  console.log(`%c${getVersionString()}`, 'color: #d4af37; font-size: 16px; font-weight: bold;');
  console.log(`Released: ${APP_CONFIG.RELEASE_DATE}`);
  console.log(`Environment: ${APP_CONFIG.ENVIRONMENT}`);
  console.log(`Build: ${APP_CONFIG.BUILD_NUMBER}`);
}
