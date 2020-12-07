/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const https = require('https');
const unzip = require('unzipper');

const { info, error } = require('@vue/cli-shared-utils');

const CopyWebpackPlugin = require('copy-webpack-plugin');

function pluginKiwi(options, kiwiPath) {
    options.configureWebpack.plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, kiwiPath),
                    to: path.join(__dirname, '../dist/kiwiirc'),
                    toType: 'dir',
                },
            ],
        }),
    );
}

function getKiwi() {
    info('Downloading Kiwi IRC...');
    const kiwiPath = path.join(__dirname, '../kiwiirc/');
    return new Promise((resolve, reject) => {
        https.get('https://builds.kiwiirc.com/zips/kiwiirc_master.zip', (r) => {
            r.on('error', (e) => {
                error('Failed to download Kiwi IRC', e);
                reject();
            });
            r.pipe(unzip.Parse())
                .on('entry', (entry) => {
                    const fileName = entry.path.replace(/^dist\//g, '');
                    const filePath = path.join(kiwiPath, fileName);

                    // Create directory structure
                    if (entry.type === 'Directory' && fileName) {
                        fs.mkdirSync(filePath, { recursive: true });
                    }

                    if (entry.type === 'File' && fileName) {
                        entry.pipe(fs.createWriteStream(filePath));
                    } else {
                        entry.autodrain();
                    }
                })
                .on('error', (e) => {
                    error('Failed to unzip Kiwi IRC', e);
                    reject();
                })
                .on('finish', resolve);
        });
    });
}

module.exports = (api, options) => {
    api.registerCommand('serve:prerequisites', async (args) => {
        const kiwiRepoPath = path.join(__dirname, '../../kiwiirc/dist/');
        if (fs.existsSync(path.join(kiwiRepoPath, 'index.html'))) {
            pluginKiwi(options, '../../kiwiirc/dist');
            await api.service.run('serve', args);
            console.log('Using Kiwi IRC from:', kiwiRepoPath);
            return;
        }

        const kiwiPath = path.join(__dirname, '../kiwiirc/');
        if (!fs.existsSync(path.join(kiwiPath, 'index.html'))) {
            await getKiwi();
        }

        if (fs.existsSync(path.join(kiwiPath, 'index.html'))) {
            pluginKiwi(options, kiwiPath);
        } else {
            error('Could not find Kiwi IRC');
        }

        await api.service.run('serve', args);
        console.log('Using Kiwi IRC from:', kiwiPath);
    });
};

module.exports.defaultModes = {
    'serve:prerequisites': 'development',
};
