const fs = require("fs");
const filesize = require("file-size");
require('dotenv').config();

const now = String(Date.now());

module.exports = (function(eleventyConfig) {
  
  eleventyConfig.setUseGitIgnore(false)
  eleventyConfig.addWatchTarget('./_tmp/style.css')
  eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' })
  
  eleventyConfig.addShortcode('version', function () {
    return now
  });

  eleventyConfig.addFilter("filesize", function(path) {
    let stat = fs.statSync(path);
    if( stat ) {
      return filesize(stat.size).human();
    }
    return "Unknown size";
  });

});
