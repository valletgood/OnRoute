/**
 * React Query Key Factory
 * Query Key를 중앙에서 관리하여 일관성을 유지합니다.
 */

export const queryKeys = {
  tracking: {
    all: ['tracking'] as const,
    search: (carrierId: string, trackingNumber: string) =>
      ['tracking', 'search', carrierId, trackingNumber] as const,
  },
};
