export type UserRole = 'USER' | 'ADMIN';

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export const users: MockUser[] = [
  {
    id: '1',
    name: 'Test User',
    email: 'user@test.com',
    password: 'Test1234',
    role: 'USER',
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'Admin1234',
    role: 'ADMIN',
  },
];
export const sessions = new Map<string, string>();

export const countries = [
  { id: '1', name: 'Syria', code: 'SY' },
  { id: '2', name: 'Switzerland', code: 'CH' },
  { id: '3', name: 'Saudi Arabia', code: 'SA' },
];

export const cities = [
  { id: '1', name: 'Damascus', countryCode: 'SY' },
  { id: '2', name: 'Zurich', countryCode: 'CH' },
  { id: '3', name: 'Riyadh', countryCode: 'SA' },
];

export const prayerMethods = [
  { id: '1', name: 'Muslim World League', code: 'MWL' },
  { id: '2', name: 'Umm Al-Qura University', code: 'UMM_AL_QURA' },
  { id: '3', name: 'Egyptian General Authority', code: 'EGAS' },
];

export const todayData = {
  date: '2026-11-23',
  hijriDate: '13 Jumada al-Thani 1448',
  prayerTimes: {
    fajr: '05:30',
    sunrise: '06:50',
    dhuhr: '12:00',
    asr: '15:00',
    maghrib: '17:10',
    isha: '18:30',
  },
  fasting: {
    isFasting: false,
    completedDays: 0,
    totalDays: 30,
  },
};
