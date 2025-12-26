// src/stores/__tests__/postStore.spec.js
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePostStore } from '../postStore'

describe('postStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it('initialise avec un tableau posts vide', () => {
    const store = usePostStore()
    expect(store.posts).toEqual([])
  })
  
  it('ajoute un post', async () => {
    const store = usePostStore()
    const newPost = { 
      id: 1, 
      title: 'Test Post',
      content: 'Test content',
      author: 'Test Author',
      date: '2024-01-01'
    }
    
    // Selon votre implémentation du store
    store.posts.push(newPost) // Ou await store.addPost(newPost) si c'est une action
    expect(store.posts).toHaveLength(1)
    expect(store.posts[0]).toEqual(newPost)
  })
})