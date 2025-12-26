import { mount } from '@vue/test-utils'
import { it, expect } from 'vitest'
import HelloWorld from '../HelloWorld.vue'

it('affiche la prop msg et incrémente le compteur', async () => {
  const wrapper = mount(HelloWorld, { props: { msg: 'Salut' } })
  expect(wrapper.find('h1').text()).toBe('Salut')

  const button = wrapper.get('button')
  await button.trigger('click')
  expect(button.text()).toContain('count is 1')
})
