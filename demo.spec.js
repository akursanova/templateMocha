import chai from 'chai';
import {goto, run, stop} from './framework/lib/browser';

const {expect} = chai;
describe('demo suite', () => {
  let page;
  beforeEach(async () => {
    await run();
    page = await goto('https://try.vikunja.io/login');
  })
  afterEach(async () => {
    await stop();
  })
     it('demo test', async() => {
       await page.fill('#username', 'demo');
       await page.click('#password');
       await page.fill('#password', 'demo');
       await page.click('.is-primary');
       await page.waitForNavigation({waitUntil: 'networkidle'});
       const profileName = ('.user > .dropdown > .dropdown-trigger > .button > .username');
       await page.click(profileName);
       const profileNameText = await page.textContent(profileName);
       expect(profileNameText).to.have.string('demo');

  })
})