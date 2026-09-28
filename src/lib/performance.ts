/**
 * Runtime Performance System & Adaptive Device Detection
 * Enables high-fidelity desktop visual fidelity while guaranteeing 60fps on mobile.
 */

export type PerformanceMode = 'HIGH' | 'BALANCED' | 'LITE';

export interface PerformanceConfig {
  mode: PerformanceMode;
  dpr: number;
  isMobile: boolean;
  isTablet: boolean;
  enable3D: boolean;
  simplified3D: boolean;
  enableCursor: boolean;
  enableHeavyShadows: boolean;
  enableBackgroundAurora: boolean;
  maxTestimonialCards: number;
  enableScrollTilt: boolean;
}

export function detectPerformanceMode(): PerformanceConfig {
  if (typeof window === 'undefined') {
    return {
      mode: 'HIGH',
      dpr: 1,
      isMobile: false,
      isTablet: false,
      enable3D: true,
      simplified3D: false,
      enableCursor: false,
      enableHeavyShadows: false,
      enableBackgroundAurora: false,
      maxTestimonialCards: 2,
      enableScrollTilt: false,
    };
  }

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const width = window.innerWidth;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cpuCores = navigator.hardwareConcurrency || 4;
  const dprDevice = window.devicePixelRatio || 1;
  const isMobile = width < 768 || (isTouch && width < 900);
  const isTablet = !isMobile && (width < 1024 || isTouch);

  // Reduced motion: prioritize minimal animation and LITE mode
  if (prefersReducedMotion) {
    return {
      mode: 'LITE',
      dpr: 1,
      isMobile,
      isTablet,
      enable3D: true,
      simplified3D: true,
      enableCursor: false,
      enableHeavyShadows: false,
      enableBackgroundAurora: false,
      maxTestimonialCards: 2,
      enableScrollTilt: false,
    };
  }

  // Mobile Phones (< 768px)
  if (isMobile) {
    const isBudgetDevice = cpuCores <= 4;
    return {
      mode: isBudgetDevice ? 'LITE' : 'BALANCED',
      dpr: Math.min(dprDevice, 1.5),
      isMobile: true,
      isTablet: false,
      enable3D: true,
      simplified3D: true,
      enableCursor: false, // Absolutely disabled on mobile
      enableHeavyShadows: false,
      enableBackgroundAurora: !isBudgetDevice,
      maxTestimonialCards: 2,
      enableScrollTilt: false,
    };
  }

  // Tablets (768px - 1024px)
  if (isTablet) {
    return {
      mode: 'BALANCED',
      dpr: Math.min(dprDevice, 1.5),
      isMobile: false,
      isTablet: true,
      enable3D: true,
      simplified3D: false,
      enableCursor: false,
      enableHeavyShadows: true,
      enableBackgroundAurora: true,
      maxTestimonialCards: 3,
      enableScrollTilt: false,
    };
  }

  // Desktop (>= 1024px, non-touch)
  return {
    mode: 'HIGH',
    dpr: Math.min(dprDevice, 2),
    isMobile: false,
    isTablet: false,
    enable3D: true,
    simplified3D: false,
    enableCursor: true,
    enableHeavyShadows: true,
    enableBackgroundAurora: true,
    maxTestimonialCards: 3,
    enableScrollTilt: true,
  };
}
