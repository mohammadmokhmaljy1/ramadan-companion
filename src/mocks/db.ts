export type UserRole = 'USER' | 'ADMIN';

export interface MockUser {
  id: number;
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  preferredLanguage: 'ar' | 'en';
  onboardingCompleted: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export const users: MockUser[] = [
  {
    id: 1,
    fullName: 'Test User',
    email: 'user@test.com',
    password: 'Test1234',
    role: 'USER',
    preferredLanguage: 'ar',
    onboardingCompleted: true,
    createdAt: '2026-11-25T08:00:00.000Z',
    lastLoginAt: null,
  },
  {
    id: 2,
    fullName: 'Admin User',
    email: 'admin@test.com',
    password: 'Admin1234',
    role: 'ADMIN',
    preferredLanguage: 'ar',
    onboardingCompleted: true,
    createdAt: '2026-11-25T08:00:00.000Z',
    lastLoginAt: null,
  },
];

// Access Token -> User ID
export const sessions = new Map<string, number>();

// Restore the fake refresh session when MSW starts after a page reload.
const MOCK_REFRESH_SESSION_KEY = 'mock-refresh-session';

interface MockRefreshSession {
  token: string;
  userId: number;
}

function readMockRefreshSession(): MockRefreshSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedSession = window.sessionStorage.getItem(MOCK_REFRESH_SESSION_KEY);

    if (!storedSession) {
      return null;
    }

    const session = JSON.parse(storedSession) as MockRefreshSession;

    if (typeof session.token !== 'string' || typeof session.userId !== 'number') {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

const initialRefreshSession = readMockRefreshSession();

// Refresh Token -> User ID
export const refreshTokens = new Map<string, number>(
  initialRefreshSession ? [[initialRefreshSession.token, initialRefreshSession.userId]] : [],
);

// Fake Refresh Cookie flag for MSW
export let hasRefreshCookie = Boolean(initialRefreshSession);

export function setMockRefreshSession(token: string, userId: number) {
  refreshTokens.clear();
  refreshTokens.set(token, userId);
  hasRefreshCookie = true;

  try {
    window.sessionStorage.setItem(MOCK_REFRESH_SESSION_KEY, JSON.stringify({ token, userId }));
  } catch {
    // Keep the mock session in memory if storage is unavailable.
  }
}

export function clearMockRefreshSession() {
  refreshTokens.clear();
  hasRefreshCookie = false;

  try {
    window.sessionStorage.removeItem(MOCK_REFRESH_SESSION_KEY);
  } catch {
    // Ignore storage errors.
  }
}

export const calculationMethods = [
  { id: 1, name: 'Muslim World League' },
  { id: 2, name: 'Islamic Society of North America' },
  { id: 3, name: 'Egyptian General Authority' },
  { id: 4, name: 'Umm Al-Qura University' },
  { id: 5, name: 'University of Islamic Sciences, Karachi' },
  { id: 7, name: 'Institute of Geophysics, University of Tehran' },
  { id: 8, name: 'Gulf Region' },
  { id: 9, name: 'Kuwait' },
  { id: 10, name: 'Qatar' },
  { id: 11, name: 'Majlis Ugama Islam Singapura' },
  { id: 12, name: 'Union of Islamic Organizations of France' },
  { id: 13, name: 'Diyanet İşleri Başkanlığı, Turkey' },
  { id: 14, name: 'Spiritual Administration of Muslims of Russia' },
  { id: 15, name: 'Moonsighting Committee Worldwide' },
  { id: 16, name: 'Dubai' },
];

export const fastMissReasons = [
  { id: 1, name: 'Travel' },
  { id: 2, name: 'Illness' },
  { id: 3, name: 'Excused' },
  { id: 4, name: 'Other' },
];

export const reminderTypes = [
  {
    id: 1,
    code: 'SUHOOR',
    name: 'Suhoor Reminder',
    defaultMinutesBefore: 45,
  },
  {
    id: 2,
    code: 'IFTAR',
    name: 'Iftar Reminder',
    defaultMinutesBefore: 15,
  },
  {
    id: 3,
    code: 'FAJR',
    name: 'Fajr Reminder',
    defaultMinutesBefore: 10,
  },
  {
    id: 4,
    code: 'DHUHR',
    name: 'Dhuhr Reminder',
    defaultMinutesBefore: 10,
  },
  {
    id: 5,
    code: 'ASR',
    name: 'Asr Reminder',
    defaultMinutesBefore: 10,
  },
  {
    id: 6,
    code: 'MAGHRIB',
    name: 'Maghrib Reminder',
    defaultMinutesBefore: 10,
  },
  {
    id: 7,
    code: 'ISHA',
    name: 'Isha Reminder',
    defaultMinutesBefore: 10,
  },
  {
    id: 8,
    code: 'QURAN_WIRD',
    name: 'Quran Wird Reminder',
    defaultMinutesBefore: 15,
  },
];

export const todayData = {
  gregorianDate: '2026-11-25',
  hijriDate: {
    day: 13,
    month: 6,
    monthName: 'Jumada al-Thani',
    year: 1448,
  },
  isRamadan: false,
  ramadanDay: null,
  daysUntilRamadan: null,
  season: null,
  dua: null,
  nextPrayer: null,
  summary: {
    quranPagesToday: 0,
    wirdToday: 0,
    worshipDone: 0,
    worshipTotal: 0,
    goalsDone: 0,
    goalsTotal: 0,
  },
};
