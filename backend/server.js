const fs = require('fs');
const crypto = require('crypto');

const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');

const host = '127.0.0.1';
const port = 8181;
const path = '/client-builder';
const store = './configs';

const app = new Koa();
const router = new Router();

if (!fs.existsSync(store)) {
    fs.mkdirSync(store);
}

app.use(koaBody({ multipart: true, includeUnparsed: true }));
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'x-auth-token');
    await next();
});
app.use(router.routes());
app.use(router.allowedMethods());

router.post(`${path}/save`, async (ctx) => {
    let id = false; // Object.keys(ctx.request.query)[0];

    ctx.response.status = 500;
    ctx.response.body = { error: 'Error saving settings' };

    if (typeof ctx.request.body !== 'object') {
        ctx.response.status = 400;
        return;
    }

    if (!id || id.length !== 32) {
        id = crypto.randomBytes(16).toString('hex');
    }

    await fs.promises.writeFile(`configs/${id}.json`, JSON.stringify(ctx.request.body))
        .then(() => {
            ctx.response.status = 201;
            ctx.response.body = { status: 'success', settings_id: id };
        })
        .catch((err) => {
            console.log('save error:', err);
        });
});

router.get(`${path}`, async (ctx) => {
    let id = ctx.request.query.settings;

    ctx.response.status = 500;
    ctx.response.body = { error: 'Bad request' };

    if (!id || id.length !== 32) {
        return;
    }

    await fs.promises.readFile(`configs/${id}.json`)
        .then((data) => {
            ctx.response.status = 200;
            ctx.response.body = JSON.parse(data);
        })
        .catch((err) => {
            console.log('read error:', err);
        });
});

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
