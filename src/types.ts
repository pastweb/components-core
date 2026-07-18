export interface AnimationInfo {
  /**
   * value between 0 and 1 (inclusive).
   * 0 = no delay, 1 = full cycle delay.
   */
  animationDelay?: number;

  /**
   * Normalized value between 0 and 1 (inclusive).
   * 0 = instant, 1 = full cycle duration.
   */
  animationDuration?: number;
  animationTimingFunction?: string;
};

export interface Animation {
  name: string;
  in?: AnimationInfo;
  out?: AnimationInfo;
};
