import { EN } from './en';
import { Lang, SiteContent } from './types';
import { ZH } from './zh';

/** 所有語言版本的唯一登記處；新增語言時在這裡加一筆（見 .claude/skills/i18n-sync/SKILL.md） */
export const CONTENT: Record<Lang, SiteContent> = { zh: ZH, en: EN };

/** 基準語言：其他語言的結構都要與它一致 */
export const BASE_LANG: Lang = 'zh';
