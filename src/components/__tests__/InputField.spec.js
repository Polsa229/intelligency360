
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputField from '../ui/InputField.vue'

describe('InputField', () => {
  it('affiche le label', () => {
    const wrapper = mount(InputField, {
      props: { label: 'Email', modelValue: '' }
    })
    expect(wrapper.text()).toContain('Email')
  })
  
  it('émet update:modelValue lors de la saisie', async () => {
    const wrapper = mount(InputField, {
      props: { modelValue: '' }
    })
    
    const input = wrapper.find('input')
    await input.setValue('test@example.com')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test@example.com'])
  })
})