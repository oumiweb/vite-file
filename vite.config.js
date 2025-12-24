// vite.config.js
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import handlebars from 'vite-plugin-handlebars';

// ✅ file URL（import.meta.url）を、Windowsでも正しい「パス文字列」に変換するために使う
import { fileURLToPath } from 'url';

export default defineConfig({
  css: {
    devSourcemap: true, // SCSSのソースマップを有効化（開発中のデバッグが楽になる）
  },

  plugins: [
    // 画像最適化（そのままでOK）
    viteImagemin({
      gifsicle: { optimizationLevel: 7, interlaced: false },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 75 },
      pngquant: { quality: [0.65, 0.8], speed: 1 },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
      webp: { quality: 75 },
    }),

    // Handlebars（HTMLテンプレート）
    handlebars({
      /**
       * ✅ Windows対策ポイント
       * new URL(...).pathname だと「/C:/...」のようになり、
       * プラグインが正しくディレクトリとして扱えないことがある。
       * fileURLToPath() を使うと OS に合ったパス（C:\...）になる。
       */
      partialDirectory: fileURLToPath(new URL('./src/components', import.meta.url)),
    }),
  ],
});
