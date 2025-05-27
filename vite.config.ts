import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import autoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import StylelintPlugin from 'vite-plugin-stylelint'
import postcssPresetEnv from 'postcss-preset-env'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const base = env.VITE_BASE
  const shouldAnalyze = env.VITE_ANALYSIS === 'true' // 检查是否启用了分析模式

  const plugins = [
    vue(),
    autoImport({
      imports: ['vue', 'vue-router', 'pinia'], // 需要引入的类型来源
      dts: 'src/types/auto-import.d.ts', // 根据引入来源自动生成的类型声明文件路径
      eslintrc: {
        enabled: true, // 使用 eslint 配置
      },
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    eslint(),
    StylelintPlugin(),
  ]
  if (shouldAnalyze) {
    plugins.push(
      visualizer({
        gzipSize: true,
        brotliSize: true,
        emitFile: false,
        filename: 'analysis.html', //分析图生成的文件名
        open: true, //如果存在本地服务端口，将在打包后自动展示
      }),
    )
  }
  return {
    base,
    plugins,
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
      // 配置跨域
      // cors: {
      //   origin: 'http://localhost:3000', // 明确指定允许的来源
      //   credentials: true, // 允许凭据
      // },
      // 配置代理
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:8001',
      //     changeOrigin: true,
      //     rewrite: path => path.replace(/^\/api/, ''),
      //   },
      // },
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
  }
})
