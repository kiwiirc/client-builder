export default function extractStructure(source, whitelist, ret) {
    ret = ret || {};
    Object.keys(whitelist).forEach(key => {
        if (typeof source[key] === 'undefined') {
            return;
        }

        let v = whitelist[key];
        let sourceV = source[key];
        // if (v === true && typeof sourceV !== 'object') {
        if (v === true) {
            ret[key] = sourceV;
        } else if (typeof v === 'object' && typeof sourceV === 'object') {
            ret[key] = {};
            extractStructure(sourceV, v, ret[key]);
        }
    });

    return ret;
}
