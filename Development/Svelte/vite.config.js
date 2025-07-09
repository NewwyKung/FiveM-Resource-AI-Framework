import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	server: {
		port: 5171,
	},
	plugins: [svelte()],
    base: './',
	build: {
		rollupOptions: {
			output: {
				format: 'es',
				chunkFileNames: `assets/js/[name]-[hash].js`,
                entryFileNames: `assets/js/[name]-[hash].js`,
				assetFileNames: ({name}) => {
					if((/\.css$/).test(name ?? '')) {
                        return `assets/css/[name]-[hash][extname]`;
                    }
					return `assets/media/[name][extname]`;
				},
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return 'vendor'; // Split node_modules into a separate chunk
					}
				},
			},
		},
		chunkSizeWarningLimit: 9999,
		outDir: '../../html',
		minify: true,
	},
	resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@css': path.resolve(__dirname, './src/css'),
            '@js': path.resolve(__dirname, './src/js'),
            '@c': path.resolve(__dirname, './src/lib')
        }
    }
});
