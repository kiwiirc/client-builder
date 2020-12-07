// eslint-disable-next-line import/prefer-default-export
export function mergeConfig(target, config) {
    Object.entries(config).forEach(([key, val]) => {
        if (typeof val === 'object') {
            if (typeof target[key] !== 'object') {
                target[key] = Array.isArray(val) ? [] : {};
            }
            mergeConfig(target[key], val);
            return;
        }
        target[key] = val;
    });
}
