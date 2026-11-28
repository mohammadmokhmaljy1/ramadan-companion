import { apiGet } from '@/shared/api/api-helpers';

export interface TodayData {
  gregorianDate: string;

  hijriDate: {
    day: number;
    month: number;
    monthName: string;
    year: number;
  };

  isRamadan: boolean;
  ramadanDay: number | null;
  daysUntilRamadan: number | null;

  season: unknown;
  dua: unknown;
  nextPrayer: unknown;

  summary: {
    quranPagesToday: number;
    wirdToday: number;
    worshipDone: number;
    worshipTotal: number;
    goalsDone: number;
    goalsTotal: number;
  };
}

export function getToday() {
  return apiGet<TodayData>('/me/today');
}
