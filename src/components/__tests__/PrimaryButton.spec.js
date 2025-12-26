// src/components/__tests__/PrimaryButton.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimaryButton from '../ui/PrimaryButton.vue'

describe('PrimaryButton', () => {
  it('affiche le label passé en prop', () => {
    const wrapper = mount(PrimaryButton, { 
      props: { 
        label: 'Click me' 
      } 
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('émet un événement click lorsqu on clique et qu il n est pas disabled', async () => {
    const wrapper = mount(PrimaryButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('n émet pas click quand disabled', async () => {
    const wrapper = mount(PrimaryButton, { 
      props: { 
        disabled: true 
      } 
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('n émet pas click quand loading', async () => {
    const wrapper = mount(PrimaryButton, { 
      props: { 
        loading: true 
      } 
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})