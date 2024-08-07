import { expect, test } from '@playwright/test'

// import 'dotenv'

test('Sign in with credentials', async ({ page }) => {
  await test.step('should login and logout', async () => {
    // GO TO SIGNIN
    await page.goto('/auth/signin')
    await page.waitForURL('/auth/signin')

    // CHECK IF ERROR IS DISPLAYED
    const submitBtn = page.getByRole('button', { name: 'Login' })
    submitBtn.click()
    const emailErr = page.getByText(
      'String must contain at least 4 character(s)'
    )
    await expect(emailErr).toBeVisible()

    // FILL FORM AND SUBMIT
    await page.getByLabel('Email').fill(process.env.CYPRESS_USER as string)
    await page.getByLabel('Password').fill(process.env.CYPRESS_PASS as string)
    submitBtn.click()

    // CHECK IF LOGOUT BUTTON IS DISPLAYED
    await page.waitForURL('/dashboard')
    const logoutBtn = page.locator('button[aria-label="Logout user"]')
    await expect(logoutBtn).toBeVisible()
    logoutBtn.click()

    // CHECK IF REDIRECTED TO SIGNIN
    await page.waitForURL('/auth/signin')
    await expect(page).toHaveURL('/auth/signin')
  })
})
