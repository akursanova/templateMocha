import chai from 'chai';
import {goto, run, stop} from './framework/lib/browser';

const {expect} = chai;
describe('homework suite', () => {
  let page;
  beforeEach(async () => {
    await run();
    page = await goto('http://demo.testfire.net/index.jsp');
  })
  afterEach(async () => {
    await stop();
  })
  it('login test for admin', async() => {
    await page.click('tbody > tr > td > #LoginLink > font');
    await page.fill('table #uid', 'admin');
    await page.fill('table #passw', 'admin');
    await page.click('table > tbody > tr:nth-child(3) > td > input');
    const message = ('body > table:nth-child(4) > tbody > tr > td:nth-child(2) > div > h1');
    const messageText = await page.textContent(message);
    const administrationText = await page.textContent('#_ctl0__ctl0_Content_Administration > b');
    expect('Hello Admin User\n\t\t  ').to.have.string(messageText);
    expect('ADMINISTRATION').to.have.string(administrationText);
  })
    it('login test for user', async() => {
      await page.click('tbody > tr > td > #LoginLink > font');
      await page.fill('table #uid', 'jsmith');
      await page.fill('table #passw', 'demo1234');
      await page.click('table > tbody > tr:nth-child(3) > td > input');
      const message = ('body > table:nth-child(4) > tbody > tr > td:nth-child(2) > div > h1');
      const messageText = await page.textContent(message);
      const administrationIsHidden = await page.isHidden('#_ctl0__ctl0_Content_Administration > b');
      expect('Hello John Smith\n\t\t  ').to.have.string(messageText);
      expect(administrationIsHidden).to.be.true;
})
      it('go to account history', async() => {
        await page.click('tbody > tr > td > #LoginLink > font');
        await page.fill('table #uid', 'admin');
        await page.fill('table #passw', 'admin');
        await page.click('table > tbody > tr:nth-child(3) > td > input');
        await page.selectOption('table #listAccounts', '800001');
        await page.click('table #btnGetAccount');
        const text = await page.textContent('body > table:nth-child(4) > tbody > tr > td:nth-child(2) > div > h1');
        expect(text).to.have.string('Account History - 800001 Checking');
  })
  it('transfer money', async() => {
      await page.click('tbody > tr > td > #LoginLink > font');
      await page.fill('table #uid', 'admin');
      await page.fill('table #passw', 'admin');
      await page.click('table > tbody > tr:nth-child(3) > td > input');
      await page.click('tr #MenuHyperLink3');
      await page.selectOption('table #toAccount', '800001');
      await page.click('table #toAccount');
      await page.fill('table #transferAmount', '1000');
      await page.click('table #transfer');
      const text = await page.textContent('#_ctl0__ctl0_Content_Main_postResp > span');
      expect(text).to.match(/1000.0 was successfully transferred from Account 800000 into Account 800001 at /);
  })
})