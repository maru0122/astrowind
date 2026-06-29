import { getPermalink } from './utils/permalinks';

// 🟢 別館（Architecture）専用のヘッダーメニュー定義
export const architectureHeaderData = {
  links: [
    {
      text: '別館初めての方へ',
      href: getPermalink('/newcomer'),
    },
    {
      text: '個別相談',
      links: [
        {
          text: '伴走支援サービスについて',
          href: getPermalink('/banso'),
        },
        {
          text: '実績紹介',
          href: getPermalink('/results'),
        },
      ],
    },
    {
      text: 'ブログ',
      href: '/architecture/blog', // 思想別館の一覧トップへ
    },
    {
      text: '会社概要',
      href: getPermalink('/company'),
    },
    {
      text: 'お問い合わせ',
      href: getPermalink('/contact'),
    },
  ],
  //actions: [{ text: '実績一覧', href: getPermalink('/results'), target: '_blank' }], // 右端のボタン
};

// 🟢 別館（Architecture）専用のフッター定義（フットノートなどを別館用に微調整可能にしています）
export const architectureFooterData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [],
  footNote: `© 2015 e-Shikumi-Labo // Architecture_`,
};