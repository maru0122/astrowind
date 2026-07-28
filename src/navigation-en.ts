import { getPermalink, getAsset } from './utils/permalinks';
// ※ getBlogPermalink はデフォルト（日本語の /blog）に向いてしまうためインポートから外しています

export const headerData = {
  links: [
    {
      text: 'Product', // 商品（トップページへ戻る）
      href: getPermalink('/en'),
    },
    {
      text: 'Blog', // ブログ一覧へ直行（ドロップダウン廃止）
      href: getPermalink('/en/blog'), 
    },
    {
      text: 'Contact', // お問い合わせ
      href: getPermalink('/en/contact'),
    },
  ],
  // 🟢 右上に日本語サイト（/）への切り替えボタンを配置
  actions: [{ text: 'JP', href: '/' }],
};

export const footerData = {
  links: [],
  secondaryLinks: [
    { text: 'Blog', href: getPermalink('/en/blog') },
    { text: 'Contact', href: getPermalink('/en/contact') },
  ],
  socialLinks: [],
  footNote: `© 2015 e-Shikumi-Labo`, // 既存のコピーライトを維持
};