export const languages = {
  en: "English"
} as const;

export type Language = keyof typeof languages;

export const defaultLang = 'en';

export const ui = {
  en: {
    '404.desc': '관련된 문서를 찾을 수 없습니다.',
    'index.name': 'enbraining',
    'index.desc':
      `<p><b>숨겨진</b> 요소를 찾는 것이 재미있는 개발자 김동학입니다.</p>` +
      `<p>남들과 소통하며 얻는 <b>새로운</b> 지식을 경험하고, 공유하며 성장합니다.</p>`,
    'index.currentWork':
      `<p>심리학이나, 악기에 관심이 많으며,</p>` +
      `<p>현재 <b><a class="external-link" href="https://github.com/GSM-MSG/" target="_blank">MSG</a></b>에서 개발하고 있습니다.</p>`,
  },
} satisfies Record<Language, { [key: string]: string }>;
