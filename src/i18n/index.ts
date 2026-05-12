import es from './es';
import en from './en';
import zh from './zh';

export type Language = 'es' | 'en' | 'zh';
export type Translations = typeof es;

const translations: Record<Language, Translations> = { es, en, zh };

export default translations;
