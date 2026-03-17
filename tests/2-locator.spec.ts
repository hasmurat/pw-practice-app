import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layout').click();
});

test('locator syntax rules', async ({ page }) => {

    //by tag name
    page.locator('input')

    //by id
    page.locator('#inputEmail1')

    //by class name
    page.locator('.form-group.row')

    //by attribute name
    page.locator('[placeholder="Email"]')

    //combine different locators
    page.locator('input[placeholder="Email"][nbinput]')

    //by Xpath (NOT RECOMMENDED)
    page.locator('//input[@placeholder="Email"]')

    //partial text match
    page.locator(':text("Using")')

    //exact text match
    page.locator(':text-is("Using the Grid")')

    // bu şekilde playwright çalıştırılırsa, pw herhangi bir elementi bulmaya çalışmayacak
    // element bulmaya bir action ile birlikte başlayacak.

});

//locator strtejisi olarak, kullanıcının davranışlarını taklit etmeye çalışıyoruz ve bu nedenle kullanıcıya dönük/kullanıcın gördüğü şeklide locatorlar belirlemek daha iyi olur.
test('User facing locators', async ({ page }) => {

    await page.getByRole('textbox', { name: 'Email' }).first().click();
    await page.getByRole('button', { name: 'Sign in' }).first().click();

    // tag veya attribute
    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByTitle('IoT Dashboard').click()

    await page.getByText('Using the Grid').click()

    //page.getByTestId("") // özel olarak element içerisinde data-testId varsa..

})

test('Locating child element', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();

    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();

    await page.locator('nb-card').getByRole('button', { name: 'SIGN IN' }).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click() //4th element
});

test('locating parent elements', async ({ page }) => {
    await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: 'Email' }).click()
    await page.locator('nb-card', { has: page.locator('#inputEmail') }).getByRole('textbox', { name: 'Email' }).click()

    await page.locator('nb-card').filter({ hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' }).click()
    await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: 'Password' }).click()

    await page.locator('nb-card')
        .filter({ has: page.locator('nb-checkbox') })
        .filter({ hasText: 'Sign in' })
        .getByRole('textbox', { name: 'Email' }).click();

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: 'Email' }).click();

})

test('Reusing the locators', async({page}) => {
    const basicForm = page.locator('nb-card', { hasText: "Basic form" })
    const emailField = basicForm.getByRole('textbox', { name: 'Email' })

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', { name: 'Password' }).fill('test@test.com')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')

})

test('exracting value', async({page}) => {
    // single text value
    const basicForm = page.locator('nb-card', { hasText: "Basic form" })
    const buttonText = await basicForm.getByRole('button').textContent()

    expect(buttonText).toEqual('Submit')

    // all text values
    const allRadioButtons = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtons).toContain('Option 1')

    //input value
    const emailField = basicForm.getByRole('textbox', { name: 'Email' })
    await emailField.fill('test@test.com')

    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    //placeholder value

    const placeHolder = await emailField.getAttribute('placeholder')
    expect(placeHolder).toEqual('Email')

})

test('Assertions', async({page}) => {
    //general assertions
    const value = 5;
    expect(value).toEqual(5)

    const basicFormButton = page.locator('nb-card', { hasText: "Basic form" }).getByRole('button')
    const text = await basicFormButton.textContent();
    expect(text).toEqual('Submit')

    //locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //soft assertion - assertion fail olsa bile test durmuyor.
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()

})