// src/components/__tests__/HelloWorld.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('affiche la prop msg et incrémente le compteur', async () => {
    const wrapper = mount(HelloWorld, { 
      props: { 
        msg: 'Salut' 
      } 
    })
    
    // Vérifier le texte
    expect(wrapper.find('h1').text()).toBe('Salut')
    
    // Vérifier le compteur
    const button = wrapper.find('button')
    expect(button.text()).toContain('count is 0')
    
    // Simuler un clic
    await button.trigger('click')
    expect(button.text()).toContain('count is 1')
  })
})