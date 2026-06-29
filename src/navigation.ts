import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: '初めての方へ',
      href: getPermalink('/newcomer'), // 固定ページ（後で作ります）へのリンク
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
      links: [
        {
          text: '記事一覧',
          href: getBlogPermalink(), // ブログのトップページへ
        },
        {
          text: 'GAS / スプレッドシート',
          href: getPermalink('gas-spreadsheet', 'category'), // カテゴリ絞り込み
        },
        {
          text: 'Chrome拡張機能',
          href: getPermalink('chrome-extension', 'category'), // カテゴリ絞り込み
        },
        {
          text: 'コラム',
          href: getPermalink('column', 'category'), // カテゴリ絞り込み
        },
      ],
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
  actions: [{ text: '実績一覧', href: getPermalink('/results'), target: '_blank' }], // 右端のボタン
};

export const footerData = {
  links: [], // カラム形式のリンクは使わないので空でOKです
  secondaryLinks: [
    // { text: '特定商取引法に基づく表示', href: getPermalink('/tokutei') },
    // { text: '個人情報保護の方針', href: getPermalink('/privacy') },
    // { text: '過去記事一覧', href: getBlogPermalink() },
  ],
  socialLinks: [], // SNSアイコンを使わない場合は空にします
  footNote: `© 2015 e-Shikumi-Labo`,
};