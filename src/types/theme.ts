export type ThemeMode = 'girly_rose' | 'lavender_dream' | 'teal_mint' | 'sunset_peach' | 'classic_indigo';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  subtitle: string;
  icon: string;
  // Color tokens
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryBorder: string;
  primaryText: string;
  badgeBg: string;
  badgeText: string;
  gradientHeader: string;
  accentColor: string;
  accentBg: string;
  bgPage: string;
  cardBorder: string;
  navActive: string;
  glowShadow: string;
  highlightChip: string;
}

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  girly_rose: {
    id: 'girly_rose',
    name: 'الوردي اللطيف (Rose Blossom)',
    subtitle: 'ألوان وردية ناعمة ومحفزة وجذابة للطالبات',
    icon: '🌸',
    primary: 'bg-rose-500',
    primaryHover: 'hover:bg-rose-600',
    primaryLight: 'bg-rose-50',
    primaryBorder: 'border-rose-200',
    primaryText: 'text-rose-600',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-700',
    gradientHeader: 'from-rose-500 via-pink-500 to-fuchsia-500',
    accentColor: 'text-pink-600',
    accentBg: 'bg-pink-50',
    bgPage: 'bg-gradient-to-br from-rose-50/40 via-pink-50/20 to-purple-50/30',
    cardBorder: 'border-rose-100 hover:border-rose-300',
    navActive: 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-200',
    glowShadow: 'shadow-rose-100',
    highlightChip: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  lavender_dream: {
    id: 'lavender_dream',
    name: 'اللافندر الحالم (Lavender Dream)',
    subtitle: 'درجات البنفسجي الهادئ والوردي الأنيق',
    icon: '💜',
    primary: 'bg-purple-500',
    primaryHover: 'hover:bg-purple-600',
    primaryLight: 'bg-purple-50',
    primaryBorder: 'border-purple-200',
    primaryText: 'text-purple-600',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700',
    gradientHeader: 'from-purple-500 via-fuchsia-500 to-pink-500',
    accentColor: 'text-purple-600',
    accentBg: 'bg-purple-50',
    bgPage: 'bg-gradient-to-br from-purple-50/40 via-fuchsia-50/20 to-indigo-50/30',
    cardBorder: 'border-purple-100 hover:border-purple-300',
    navActive: 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-md shadow-purple-200',
    glowShadow: 'shadow-purple-100',
    highlightChip: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  teal_mint: {
    id: 'teal_mint',
    name: 'الفيروزي والنعناعي (Mint & Teal)',
    subtitle: 'ألوان فيروزية منعشة ومريحة للعين',
    icon: '🌿',
    primary: 'bg-teal-500',
    primaryHover: 'hover:bg-teal-600',
    primaryLight: 'bg-teal-50',
    primaryBorder: 'border-teal-200',
    primaryText: 'text-teal-600',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-700',
    gradientHeader: 'from-teal-500 via-emerald-500 to-cyan-500',
    accentColor: 'text-teal-600',
    accentBg: 'bg-teal-50',
    bgPage: 'bg-gradient-to-br from-teal-50/40 via-emerald-50/20 to-cyan-50/30',
    cardBorder: 'border-teal-100 hover:border-teal-300',
    navActive: 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md shadow-teal-200',
    glowShadow: 'shadow-teal-100',
    highlightChip: 'bg-teal-50 text-teal-700 border-teal-200'
  },
  sunset_peach: {
    id: 'sunset_peach',
    name: 'الخوخي الدافئ (Sunset Peach)',
    subtitle: 'درجات المشمشي والوردي الدافئ والحلوى',
    icon: '🍑',
    primary: 'bg-amber-500',
    primaryHover: 'hover:bg-amber-600',
    primaryLight: 'bg-amber-50',
    primaryBorder: 'border-amber-200',
    primaryText: 'text-amber-600',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
    gradientHeader: 'from-amber-500 via-rose-400 to-pink-500',
    accentColor: 'text-amber-600',
    accentBg: 'bg-amber-50',
    bgPage: 'bg-gradient-to-br from-amber-50/40 via-orange-50/20 to-rose-50/30',
    cardBorder: 'border-amber-100 hover:border-amber-300',
    navActive: 'bg-gradient-to-r from-amber-500 to-rose-400 text-white shadow-md shadow-amber-200',
    glowShadow: 'shadow-amber-100',
    highlightChip: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  classic_indigo: {
    id: 'classic_indigo',
    name: 'الكلاسيكي النيلي (Classic Indigo)',
    subtitle: 'المظهر الأكاديمي الكلاسيكي الهادئ',
    icon: '📘',
    primary: 'bg-indigo-600',
    primaryHover: 'hover:bg-indigo-700',
    primaryLight: 'bg-indigo-50',
    primaryBorder: 'border-indigo-200',
    primaryText: 'text-indigo-600',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-700',
    gradientHeader: 'from-indigo-600 via-blue-600 to-purple-600',
    accentColor: 'text-indigo-600',
    accentBg: 'bg-indigo-50',
    bgPage: 'bg-slate-50',
    cardBorder: 'border-slate-200 hover:border-indigo-300',
    navActive: 'bg-indigo-600 text-white shadow-md shadow-indigo-200',
    glowShadow: 'shadow-indigo-100',
    highlightChip: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  }
};
