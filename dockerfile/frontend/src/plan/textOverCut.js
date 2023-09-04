export function textOverCut(txt, len = 12, lastTxt = '...') {
    if (typeof len !== 'number' || typeof lastTxt !== 'string') {
        throw new Error('Invalid parameter types.');
    }

    if (txt.length > len) {
        txt = txt.substr(0, len) + lastTxt;
    }
    return txt;
}
