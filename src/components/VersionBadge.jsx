import React from 'react';
import { APP_CONFIG } from '../config/version';

export default function VersionBadge() {
  return (
    <div className="version-badge" title={`Released: ${APP_CONFIG.RELEASE_DATE}`}>
      <span className="version-icon">📦</span>
      <span className="version-text">v{APP_CONFIG.VERSION}</span>
    </div>
  );
}
