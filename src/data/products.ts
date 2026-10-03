import type { ImageMetadata } from 'astro';

// 🟢 src/assets 以下の画像を直接 import します
import imgTrendBoard from '~/assets/images/products/ittrendboard/20260708_001.png';
import imgChatSaver from '~/assets/images/products/chatsaver/chatsaver01.gif';
import imgChatSaverLite from '~/assets/images/products/chatsaverlite/chatsaverlight01.png';
import imgAimemo from '~/assets/images/products/aimemo/20250911_4.png'; 
import imgFlightMonitor from '~/assets/images/products/flightmonitor/flightmonitor01.png'; 


export interface Product {
  no: number;
  status: string;
  type: string;
  method: string;
  price: string;
  name: string;
  siteUrl?: string;
  directUrl?: string;
  image: ImageMetadata | string; // 🟢 画像オブジェクト、または外部URL文字列を受け取れる型
  tags: string[];
}

export const products: Product[] = [
  {
    no: 1,
    status: '公開',
    type: 'Webアプリ',
    method: 'リンク',
    price: '無料',
    name: '日米ITトレンドボード',
    siteUrl: '/products/ittrendboard/',
    directUrl: 'https://script.google.com/a/macros/e-shikumi-labo.com/s/AKfycbxS_ImGSnJDyKPDMbZ3VrDCz6LGrqMBvcwXB8fKYFYF-Zjd1Z_UHAHYHH9L-HledHFOIQ/exec',
    image: imgTrendBoard,
    tags: ['スプレッドシート', 'WebApp', 'GAS'],
  },
  {
    no: 2,
    status: '公開',
    type: 'Chrome拡張',
    method: 'Gumroad',
    price: '$29',
    name: 'Chat Saver for Gemini',
    siteUrl: '/products/chatsaverforgemini/',
    directUrl: 'https://maru0122.gumroad.com/l/chatsaverforgemini?layout=profile',
    image: imgChatSaver,
    tags: ['スプレッドシート', '拡張機能', 'GAS'],
  },
  {
    no: 3,
    status: '公開',
    type: 'Chrome拡張',
    method: 'GitHub',
    price: '無料',
    name: 'Chat Saver for Gemini Lite',
    siteUrl: '/products/chatsaverforgeminilite/',
    directUrl: 'https://github.com/maru0122/chat-saver-for-gemini-lite',
    image: imgChatSaverLite,
    tags: ['スプレッドシート', '拡張機能', 'GAS'],
  },
  {
    no: 4,
    status: '公開',
    type: 'Chrome拡張',
    method: 'ChromeWebストア',
    price: '無料',
    name: 'AIMemo',
    siteUrl: '/products/aimemo/',
    directUrl: 'https://chromewebstore.google.com/detail/aimemo-project-notes-for/defcpmdjodcnhaaihkplkonippbnjnpd?authuser=0&hl=ja',
    image: imgAimemo,
    tags: ['スプレッドシート', '拡張機能'],
  },
  {
    no: 5,
    status: '公開',
    type: 'Chrome拡張',
    method: 'GitHub',
    price: '無料',
    name: 'Flight Monitor',
    siteUrl: '/products/flightmonitor/',
    directUrl: 'https://github.com/maru0122/FlightMonitor',
    image: imgFlightMonitor,
    tags: ['スプレッドシート', '拡張機能', 'GAS'],
  },
];