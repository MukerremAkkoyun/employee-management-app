/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {legacyPlugin} from '@web/dev-server-legacy';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  rootDir: './',
  nodeResolve: true,
  watch: true,
  appIndex: 'index.html',
  historyApiFallback: true, // Redirects unknown routes to index.html
  nodeResolve: {exportConditions: mode === 'dev' ? ['development'] : []},
  preserveSymlinks: true,
  plugins: [
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
    {
      // Custom plugin to define `process` globally for compatibility
      name: 'define-process-env',
      transform(context) {
        if (context.response.is('js')) {
          return {
            body: `window.process = { env: { NODE_ENV: '${mode}' } }; ${context.body}`,
          };
        }
      },
    },
  ],
};
