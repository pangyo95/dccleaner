const puppeteer = require('puppeteer');
const path = require('path');
const isPkg = typeof process.pkg !== 'undefined';

let chromiumExecutablePath = (isPkg ?
    puppeteer.executablePath().replace(
        /^.*?\\node_modules\\puppeteer\\\.local-chromium/,
        path.join(path.dirname(process.execPath), 'chromium')
    ) :
    puppeteer.executablePath()
);

async function start(id, pw) {
    console.log(`아이디 ${id}`)
    console.log(`비밀번호 ${pw}`)
    const browser = await puppeteer.launch({
        executablePath: chromiumExecutablePath,
        headless: false
    });
    const page = await browser.newPage();
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        if (dialog.message().includes("게시물을 삭제하시겠습니까?")) {
            console.log("게시물을 삭제하시겠습니까?")
            dialog.accept()
        } else {
            alarm.textContent = dialog.message()
            login_button.disabled = false
            await browser.close();
        }
    });
    await page.setDefaultNavigationTimeout(0)
    await page.goto('https://www.dcinside.com/');
    await page.type("#user_id", id)
    await page.type("#pw", pw)
    await page.click("#login_ok")
    await page.waitForNavigation()
    await page.waitForTimeout(15000)
    
    await page.goto(`https://gallog.dcinside.com/${id}/posting`);
    var delete_button = "#container > article > div > section > div > div > ul > li:nth-child(1) > div > div > button"
    while (await page.$(delete_button) !== null) {
        await page.click(delete_button)
        await page.waitForNavigation()
        await page.waitForTimeout(1000)
    }
    delete_button = "#container > article > div > section > div > div > ul > li > div > div > button"
    await page.goto(`https://gallog.dcinside.com/${id}/comment`);
    while (await page.$(delete_button) !== null) {
        await page.click(delete_button)
        await page.waitForNavigation()
        await page.waitForTimeout(1000)
    }
};

module.exports = start;
