export interface Method {
  title: string;
  subtitle: string;
  description: string;
  url: string;
  tags: string[]; // 🟢 タグを複数設定できるように配列に変更
}

export const methods: Method[] = [
  {
    title: 'AIに破綻しないコードを書かせる「Chrome拡張機能 初期設計プロンプト」',
    subtitle: '第1ステップ指示書',
    description: 'Chrome拡張機能の開発で、いきなりコードを書かせずモジュール構造・型定義・PROJECT_MAPの設計のみを最初に出力させるプロンプト。',
    url: '/method/chrome-extension-prompt',
    tags: ['Chrome拡張機能', 'プロンプト設計'],
  },
  {
    title: 'AIと共作するための設計図「PROJECT_MAP.md」',
    subtitle: 'アーキテクチャマップ',
    description: 'Chrome拡張機能やWebアプリ開発で、対話を重ねてもAIが文脈を見失わず一貫したロジックでコードを出力し続けるための設計図。',
    url: '/method/projectmap',
    tags: ['Chrome拡張機能', '設計手法'],
  },
];