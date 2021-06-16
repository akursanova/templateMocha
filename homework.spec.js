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
  it('check login for admin', async() => {
    await page.click('tbody > tr > td > #LoginLink > font');
    await page.fill('table #uid', 'admin');
    await page.fill('table #passw', 'admin');
    await page.click('table > tbody > tr:nth-child(3) > td > input');
    const message = ('body > table:nth-child(4) > tbody > tr > td:nth-child(2) > div > h1');
    const messageText = await page.textContent(message);
    const administrationText = await page.textContent('#_ctl0__ctl0_Content_Administration > b');
    expect(messageText).to.have.string('Hello Admin User');
    expect(administrationText).to.have.string('ADMINISTRATION');
  })
  it('check login for user', async() => {
    await page.click('tbody > tr > td > #LoginLink > font');
    await page.fill('table #uid', 'jsmith');
    await page.fill('table #passw', 'demo1234');
    await page.click('table > tbody > tr:nth-child(3) > td > input');
    const message = ('body > table:nth-child(4) > tbody > tr > td:nth-child(2) > div > h1');
    const messageText = await page.textContent(message);
    const administrationIsVisible = await page.isVisible('#_ctl0__ctl0_Content_Administration > b');
    expect(messageText).to.have.string('Hello John Smith');
    expect(administrationIsVisible).to.be.false;
})
  it('check transition to account history', async() => {
    await page.click('tbody > tr > td > #LoginLink > font');
    await page.fill('table #uid', 'admin');
    await page.fill('table #passw', 'admin');
    await page.click('table > tbody > tr:nth-child(3) > td > input');
    await page.selectOption('table #listAccounts', '800001');
    await page.click('table #btnGetAccount');
    const text = await page.textContent('body > table:nth-child(4) > tbody > tr > td:nth-child(2) > div > h1');
    expect(text).to.have.string('Account History - 800001 Checking');
  })
  it('check transfer money', async() => {
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
    expect(text).to.have.string('1000.0 was successfully transferred from Account 800000 into Account 800001');
  })
  it('check failed login for not existed user', async() => {
    await page.click('tbody > tr > td > #LoginLink > font');
    await page.fill('table #uid', 'demo');
    await page.fill('table #passw', 'demo');
    await page.click('table > tbody > tr:nth-child(3) > td > input');
    const error = ('#_ctl0__ctl0_Content_Main_message');
    const loginFieldIsVisible = await page.isVisible('table #uid');
    const errorText = await page.textContent(error);
    expect(loginFieldIsVisible).to.be.true;
    expect(errorText).to.have.string('Login Failed: We\'re sorry, but this username or password was not found in our system. Please try again.');

  })
})