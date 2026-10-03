import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'プロダクト',
      links:[
        {
          text: '拡張機能：FlightMonitor',
          href: getPermalink('/products/flightmonitor'),
        },
        {
          text: '拡張機能：AIMemo（無料）',
          href: getPermalink('/products/aimemo'),
        },
        {
          text: '拡張機能：ChatSaverforGemini Lite',
          href: getPermalink('/products/chatsaverforgeminilite'),
        },
        {
          text: '拡張機能：ChatSaverforGemini',
          href: getPermalink('/products/chatsaverforgemini'),
        },
        {
          text: 'WebApp：日米ITトレンドボード',
          href: getPermalink('/products/ittrendboard'),
        },
      ]
    },
    {
      text: '当ラボについて',
      href: getPermalink('/company'),
    },
    {
      text: 'お問い合わせ',
      href: getPermalink('/contact'),
    },
  ],
  // 🟢 ここを修正・有効化：右端に「EN」切り替えボタンを配置
  actions: [{ text: 'EN', href: getPermalink('/en') }], 
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