import { WellnessPage } from './app.po';

describe('wellness App', () => {
  let page: WellnessPage;

  beforeEach(() => {
    page = new WellnessPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
