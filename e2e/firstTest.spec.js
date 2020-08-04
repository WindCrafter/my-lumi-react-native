describe('Login', () => {
  it('First Test', async () => {
    await waitFor(element(by.id('test_Username')))
      .toBeVisible()
      .withTimeout(500);
    await element(by.id('test_Username')).tap();
    await element(by.id('test_Username')).replaceText('Hello@dz.com');
    await waitFor(element(by.id('test_Username')))
      .toHaveText('Hello@dz.com')
      .withTimeout(500);
    await element(by.id('test_Password')).tap();
    await element(by.id('test_Password')).replaceText('12121323');
    await waitFor(element(by.id('test_Password')))
      .toHaveText('12121323')
      .withTimeout(500);
    await element(by.id('test_Login')).tap();
    await element(
      by.label('failed').and(by.type('_UIAlertControllerActionView')),
    ).tap();
    // await element(by.text('failed')).tap();
    await element(by.id('test_ForgotPass')).tap();
    await element(by.id('test_GetCode')).tap();
    await element(by.id('test_Code')).tap();
    await element(by.id('test_Code')).replaceText('123456');
    await waitFor(element(by.id('test_Code')))
      .toHaveText('123456')
      .withTimeout(500);
    await element(by.id('test_Confirm')).tap();
    // await element(by.text('success')).tap();
    await element(
      by.label('success').and(by.type('_UIAlertControllerActionView')),
    ).tap();
  });
  it('Second Test', async () => {
    await element(by.id('header-back')).tap();
    await element(by.id('test_Password')).tap();
    await element(by.id('test_Password')).replaceText('123456789');
    await waitFor(element(by.id('test_Password')))
      .toHaveText('123456789')
      .withTimeout(500);
    await element(by.id('test_Login')).tap();
    // await element(by.text('success')).tap();
    await element(
      by.label('success').and(by.type('_UIAlertControllerActionView')),
    ).tap();
  });
});

