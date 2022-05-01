export function isSameWeek(old, now) {
    old = new Date(old);
    now = new Date(now);
    var oneDayTime = 1000 * 60 * 60 * 24;
    var old_count = parseInt(old.getTime() / oneDayTime);
    var now_other = parseInt(now.getTime() / oneDayTime);
    return parseInt((old_count + 4) / 7) === parseInt((now_other + 4) / 7);
} 