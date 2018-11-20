'use strict';

const fs = require('hexo-fs');

function lazyProcess(htmlContent) {
    const sourceImgKey = 'data-original';
    const imgRegExp = /<img(\s*?)src="(.*?)"(.*?)>/gi;
    let defaultImagePath = __dirname + '/default-image.json';
    let loadingImage = this.config.lazyload.loadingImg;

    if (!loadingImage) {
        loadingImage = JSON.parse(fs.readFileSync(defaultImagePath)).default;
    }

    return htmlContent.replace(/<img(\s*?)src="(.*?)"(\s*?)alt="(.*?)">/gi, function (str, p1, p2, p3, p4) {
        // might be duplicate
        if(/data-original/gi.test(str)){
            return str;
        }
        // return str.replace(p2, loadingImage + '" data-original="' + p2);
        return "<a class='fancy-ctn' href='"+p2+"' title='"+p4+"' data-fancybox='images' data-caption='"+p2.substring(p2.lastIndexOf("/")+1)+"'><img data-original='"+p2+"' src='"+loadingImage+"' title='"+p4+"' alt='"+p4+"'></a>"
    });
}
module.exports.processPost = function (data) {
    data.content = lazyProcess.call(this, data.content);
    return data;
};
module.exports.processSite = function (htmlContent) {
    return lazyProcess.call(this, htmlContent);
};

