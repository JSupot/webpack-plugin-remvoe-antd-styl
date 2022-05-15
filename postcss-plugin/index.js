// plugin.js
module.exports = () => ({
    postcssPlugin: 'postcss-plugin-remove-antd-style',

    AtRule(rule) {
        const reg = /(.*?)antd(.*?)(less|css)/;
        const { params } = rule;

        if (reg.test(params)) {
            rule.remove();
        }
    },

});

module.exports.postcss = true;
