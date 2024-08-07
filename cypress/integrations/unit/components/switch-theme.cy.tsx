import '../../../support/index'

import SwitchTheme from '@/components/ui/switch-theme'

describe('<SwitchTheme />', () => {
  beforeEach(() => {
    cy.mount(<SwitchTheme />)
    cy.get('[data-cy="btn-switch-theme"]').as('themeSwitchButton')
  })
  it('should toggle the theme when the button is clicked', () => {
    const expectedClasses = ['dark', 'ikea', 'light']
    expectedClasses.forEach((expectedClass) => {
      cy.get('@themeSwitchButton').click()
      cy.get('html').should('have.class', expectedClass)
    })
  })
})
