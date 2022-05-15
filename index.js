const postcssPlugin = require('./postcss-plugin/index');

class TestPlugin {
    constructor(options = {}) {
        this.options = options;
    }

    /* eslint-disable-next-line */
    apply(compiler) {

        function needHandle(module, packages) {
            if (module && !module.rawRequest) {
                return false;
            }

            return packages.some((packageName) => {
                const reg = new RegExp(`(.*?)${packageName}(.*?)(less|css)$`);

                return reg.test(module.rawRequest);
            });
        }

        compiler.hooks.compilation.tap('test', (compilation) => {
            compilation.hooks.buildModule.tap('test', (module) => {
                const packages = this.options.packages || [];
                if (needHandle(module, packages)) {
                    module.loaders.push({
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [postcssPlugin],
                            },
                        },
                    });
                }
            });
        });
    }
}

module.exports = TestPlugin;
