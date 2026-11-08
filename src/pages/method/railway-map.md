---
title: 'Leaflet.jsと国土数値情報で作る鉄道路線・駅マップ'
description: 'サーバー不要・API費用ゼロで、全国の鉄道路線と駅をダークテーマの地図に描画する手順'
tags: ['Leaflet.js', 'GeoJSON', '国土数値情報', '地図', 'JavaScript']
layout: '~/layouts/MarkdownLayout.astro'
---

> 単一のHTMLファイルとオープンデータだけで、全国の鉄道路線と駅を地図上に描画する。2026年11月3日時点の検証記録である。

## 概要

Flight Monitorで使った地図描画ライブラリ **Leaflet.js** と **Esri Dark Gray Canvas** の地図タイルの組み合わせを流用し、国土交通省の **国土数値情報（鉄道データ）** を重ねて路線マップを作る。

- **費用がかからない**：Google Maps APIのような従量課金やクレジットカード登録は不要である。
- **サーバーが要らない**：HTMLファイルをダブルクリックするだけで動く。ログイン認証やデータベースも不要である。
- **データの差し替えが簡単**：路線・駅データはGeoJSONで、背景の地図タイルはURLを1行変えるだけで切り替えられる。

Leaflet.jsは「下地の地図タイル」の上に「自分のデータ（線・点）」を重ねて描画する仕組みである。そのため、Flight Monitorで書いたマーカー描画やダークテーマのCSSはほぼそのまま使える。

## 全体の流れ

| Step | 作業 | 内容 |
| --- | --- | --- |
| 01 | データ入手 | 国土数値情報から路線・駅のGeoJSONをダウンロードする |
| 02 | JS化 | GeoJSONを `.js` ファイルに変換し、CORS制限を回避する |
| 03 | 路線描画 | `L.geoJSON` で路線を事業者別に色分けして描画する |
| 04 | 駅描画 | `MultiLineString` 形式の駅データから代表座標を取り出し、ピンを立てる |
| 05 | 駅名表示 | 画面内の駅だけにラベルを生成し、動作を軽く保つ |

## 1. 路線・駅データの入手

国土交通省の「国土数値情報（鉄道データ）」は、全国のJR・私鉄・地下鉄の路線と駅を収録したオープンデータである。

1. [国土数値情報 鉄道データ](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N02-2025.html) のダウンロードページを開く。
2. **GeoJSON形式** を選んでZIPをダウンロードする。
3. 解凍すると、路線データ `N02-20_RailroadSection.geojson` と駅データ `N02-20_Station.geojson` が入っている（`20` の部分は年度）。

属性は次のキーで取り出す。

| キー | 内容 |
| --- | --- |
| `N02_003` | 路線名 |
| `N02_004` | 運営会社名（事業者名） |
| `N02_005` | 駅名（駅データのみ） |

**ファイルが重い場合**：全国の路線データはカーブの座標が多く、数十MBになることがある。ブラウザ上で動く無料ツール **[mapshaper](https://mapshaper.org/)** にファイルをドラッグ＆ドロップし、「Simplify」で点を10〜20%程度まで間引いてから「Export」でGeoJSONとして書き出すと軽くなる。見た目はほとんど変わらない。

## 2. GeoJSONを「.js」に変換する（CORS対策）

HTMLを直接ダブルクリックして開く（アドレスバーが `file:///` になる）と、`fetch('./xxx.geojson')` によるローカルファイルの読み込みはブラウザのセキュリティ制限でブロックされる。エラーが出ていなくても路線は表示されない。

ローカルサーバーを立てずに済ませるため、GeoJSONをJavaScriptの変数として読み込む方式に切り替える。

1. `N02-20_RailroadSection.geojson` をテキストエディタで開く。
2. ファイルの先頭（1文字目）に次の1行を書き加える。

   ```javascript
   const railwayData =
   ```

   先頭が `{"type":"FeatureCollection"...` であれば、`const railwayData = {"type":"FeatureCollection"...` となる。
3. 拡張子を `.js` に変えて `N02-20_RailroadSection.js` として保存する。
4. 駅データも同じように、先頭に `const stationData =` を書き加えて `N02-20_Station.js` として保存する。
5. 2つの `.js` ファイルをHTMLと同じフォルダに置く。

HTML側は `fetch` を使わず、通常の `<script src>` タグで読み込む。

```html
<script src="./N02-20_RailroadSection.js"></script>
<script src="./N02-20_Station.js"></script>
```

## 3. 完成コード（デモ）

路線の描画、駅ピン、駅名ラベルまでを含めた最終版を、デモページとして公開している。

<a href="/demos/railway-map/index.html" target="_blank" rel="noopener">▶ デモページを別タブで開く</a>（路線・駅データで約13MBあるため、表示まで数秒かかる）

広域表示では路線だけが表示され、ズーム13以上まで拡大すると、画面内の駅に白いピンと駅名ラベルが現れる。

手元で動かす場合は、次のコードを `maptest.html` として保存し、手順2の `.js` ファイルと同じフォルダに置いてブラウザで開く。

<details>
<summary>デモページのソースコードを表示</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>路線 ＆ 駅マップ</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <style>
        body { margin: 0; padding: 0; background: #111; font-family: sans-serif; }
        #map { width: 100vw; height: 100vh; }

        /* ポップアップのダークテーマ化 */
        .leaflet-popup-content-wrapper, .leaflet-popup-tip {
            background-color: #222;
            color: #fff;
            border: 1px solid #444;
        }
        .leaflet-popup-content b { color: #00ffcc; }

        /* 駅名ラベル（背景透明＋黒フチ文字） */
        .station-label {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            color: #ffffff !important;
            font-size: 11px !important;
            font-weight: bold !important;
            text-shadow:
                1px 1px 2px #000,
               -1px -1px 2px #000,
                1px -1px 2px #000,
               -1px 1px 2px #000,
                0px 0px 4px #000;
            pointer-events: none;
        }
        .station-label::before { display: none !important; }
    </style>
</head>
<body>
    <div id="map"></div>

    <!-- JS化した路線・駅データ -->
    <script src="./N02-20_RailroadSection.js"></script>
    <script src="./N02-20_Station.js"></script>

    <script>
        // preferCanvas: true で大量のマーカーもCanvasにまとめて描画する
        const map = L.map('map', { preferCanvas: true })
            .setView([35.6812, 139.7671], 13); // 東京駅周辺

        // Esri ダークグレータイル（Flight Monitorと同じ）
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; Esri',
            maxZoom: 16
        }).addTo(map);

        // 1. 路線データの描画（JRは緑、それ以外はオレンジ）
        if (typeof railwayData !== 'undefined') {
            L.geoJSON(railwayData, {
                style: function(feature) {
                    const props = feature.properties || {};
                    const isJR = (props.N02_004 || '').includes('旅客鉄道');
                    return {
                        color: isJR ? '#00ffcc' : '#ff7700',
                        weight: 2.5,
                        opacity: 0.8
                    };
                },
                onEachFeature: function(feature, layer) {
                    const props = feature.properties || {};
                    layer.bindPopup(`<b>${props.N02_004 || ''}</b><br>${props.N02_003 || ''}`);
                }
            }).addTo(map);
        }

        // 2. 駅データを座標の配列としてメモリに保持（この時点ではDOMを作らない）
        const stationList = [];
        if (typeof stationData !== 'undefined') {
            stationData.features.forEach(feature => {
                const geom = feature.geometry || {};
                const props = feature.properties || {};
                let lat, lng;

                if (geom.type === 'MultiLineString' && geom.coordinates.length > 0) {
                    // coordinates[ライン番号][頂点番号][0:経度, 1:緯度]
                    const firstLine = geom.coordinates[0];
                    const mid = Math.floor(firstLine.length / 2);
                    lng = firstLine[mid][0];
                    lat = firstLine[mid][1];
                } else if (geom.type === 'LineString' && geom.coordinates.length > 0) {
                    const mid = Math.floor(geom.coordinates.length / 2);
                    lng = geom.coordinates[mid][0];
                    lat = geom.coordinates[mid][1];
                } else if (geom.type === 'Point') {
                    lng = geom.coordinates[0];
                    lat = geom.coordinates[1];
                }

                if (lat !== undefined && lng !== undefined) {
                    stationList.push({
                        lat: lat,
                        lng: lng,
                        name: props.N02_005 || '駅名未設定',
                        line: props.N02_003 || '',
                        company: props.N02_004 || ''
                    });
                }
            });
        }

        // 3. 画面内に入っている駅だけピンとラベルを生成する
        const visibleStationLayer = L.layerGroup().addTo(map);

        function updateVisibleStations() {
            visibleStationLayer.clearLayers();

            // 広域表示（ズーム13未満）では何も作らない
            if (map.getZoom() < 13) return;

            const bounds = map.getBounds();
            for (let i = 0; i < stationList.length; i++) {
                const st = stationList[i];
                if (!bounds.contains([st.lat, st.lng])) continue;

                const marker = L.circleMarker([st.lat, st.lng], {
                    radius: 5,
                    fillColor: '#ffffff',
                    color: '#00ffff',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.9
                });

                marker.bindTooltip(st.name, {
                    permanent: true,
                    direction: 'right',
                    offset: [6, 0],
                    className: 'station-label'
                });

                marker.bindPopup(`<b>${st.name}駅</b><br>${st.company} / ${st.line}`);
                visibleStationLayer.addLayer(marker);
            }
        }

        // 移動・ズームが止まった時に再判定し、初回ロード時にも実行する
        map.on('moveend', updateVisibleStations);
        updateVisibleStations();
    </script>
</body>
</html>
```

</details>
