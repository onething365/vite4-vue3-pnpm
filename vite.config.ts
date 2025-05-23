import path from 'path'
import { defineConfig } from 'vite'
import autoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import StylelintPlugin from 'vite-plugin-stylelint'
import postcssPresetEnv from 'postcss-preset-env'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    autoImport({
      imports: ['vue'], // 需要引入的类型来源
      dts: 'src/types/auto-import.d.ts', // 根据引入来源自动生成的类型声明文件路径
      eslintrc: {
        enabled: true, // 使用 eslint 配置
      },
    }),
    Components(),
    eslint(),
    StylelintPlugin(),
    // TODO: 开发环境儿端打包分析，线上环境不走这个
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: 'analysis.html', //分析图生成的文件名
      open: true, //如果存在本地服务端口，将在打包后自动展示
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 定义全局的scss变量
        // 给导入的路径最后加上 ;
        additionalData: `@import '@/common/style/vars.scss';`,
      },
    },
    postcss: {
      plugins: [tailwindcss, autoprefixer, postcssPresetEnv()],
    },
  },
})
