const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy({
    'src/i18n/**/*.json': 'src/i18n/',
  });

  eleventyConfig.addPassthroughCopy({
    'src/data/**/*.json': 'src/data/',
  });

  eleventyConfig.addPassthroughCopy({
    'src/styles/global.css': 'src/styles/global.css',
  });

  eleventyConfig.addPassthroughCopy({
    'dev/index.html': 'index.html',
  });

  eleventyConfig.addPassthroughCopy(
    'node_modules/@webcomponents/webcomponentsjs'
  );

  eleventyConfig.addPassthroughCopy('node_modules/lit/polyfill-support.js');
  return {
    dir: {
      input: 'src',
      output: 'public',
    },
    templateExtensionAliases: {
      '11ty.cjs': '11ty.js',
      '11tydata.cjs': '11tydata.js',
    },
  };
};
