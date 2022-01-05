const htmlmin = require("html-minifier");
const markdownIt = require('markdown-it');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const Image = require("@11ty/eleventy-img");

// Image shortcode for social sharing
async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [null],
    formats: ["png"]
  });

  let imageAttributes = {
    alt: "",
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  (async () => {
    let url = "https://www.flickr.com/photos/194726204@N02/51800576522";
    let stats = await Image(url);
  
    console.log( stats );
  })();

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline"
  });
}

module.exports = function (eleventyConfig) {
  // PLUGINS
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);
  

  // shortcode to render markdown from string => {{ STRING | markdown | safe }}
  eleventyConfig.addFilter('markdown', function(value) {
    let markdown = require('markdown-it')({
      html: true
    });
    return markdown.render(value);
  });



  // Copy `img/favicon/` to `_site/`
  eleventyConfig.addPassthroughCopy({ "src/static/img/favicon": "/" });

  // rebuild on CSS changes
  eleventyConfig.addWatchTarget('./src/_includes/css/');

  // Markdown
  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true
    })
  )

  //create collections
  eleventyConfig.addCollection('sections', async (collection) => {
    return collection.getFilteredByGlob('./src/sections/*.md');
  });

  // STATIC FILES
  eleventyConfig.addPassthroughCopy({ './src/static/': '/' });

  // TRANSFORM -- Minify HTML Output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath && outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  return {
    dir: {
      input: 'src',
      output: 'public',
      data: './_data',
      includes: './_includes',
      layouts: './_layouts'
    },
    templateFormats: [
      'md',
      'njk',
      '11ty.js'
    ],
    htmlTemplateEngine: 'njk'
  };
};