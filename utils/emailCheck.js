import dns from 'dns';
import util from 'util';

const resolveMx = util.promisify(dns.resolveMx);

function isEmailFormatValid(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export async function checkEmail(email) {
    if (!isEmailFormatValid(email)) return false;

    try {
        const domain = email.split('@')[1];
        if (!domain) return false;

        const mxRecords = await resolveMx(domain);
        return mxRecords && mxRecords.length > 0;
    } catch (err) {
        return false;
    }
}
