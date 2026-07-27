export interface CoupleInfo {
  husbandName: string;
  wifeName: string;
  weddingDate: string; // ISO String
  birthDate: string; // ISO String
  birthdayMonthDay: string; // "MM-DD"
  anniversaryMonthDay: string; // "MM-DD"
}

export interface IntroData {
  title: string;
  subtitle: string;
  interactiveHint: string;
}

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
}

export interface MemoryItem {
  id: number;
  title: string;
  shortDesc: string;
  fullStory: string;
  bgAccent: string;
}

export interface CounterData {
  title: string;
  subtitle: string;
}

export interface BirthdayData {
  title: string;
  subTitle: string;
  message: string;
  confettiColors: string[];
}

export interface AnniversaryData {
  title: string;
  subTitle: string;
  message: string;
}

export interface DreamItem {
  id: number;
  title: string;
  description: string;
  coordinates: {
    x: number;
    y: number;
  };
}

export interface LetterData {
  paragraphs: string[];
  signature: string;
}

export interface FooterData {
  text: string;
}

export interface StoryData {
  couple: CoupleInfo;
  intro: IntroData;
  timeline: TimelineEvent[];
  gallery: GalleryItem[];
  memories: MemoryItem[];
  counter: CounterData;
  birthday: BirthdayData;
  anniversary: AnniversaryData;
  dreams: DreamItem[];
  letter: LetterData;
  footer: FooterData;
}
