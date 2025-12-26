import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePostStore = defineStore('posts', () => {
  // State
  const posts = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const searchQuery = ref("");
  const currentPage = ref(1);
  const itemsPerPage = 8;
  
  // Actions
  const fetchPosts = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch('https://dummyjson.com/posts');
      const data = await response.json();
      posts.value = data.posts;
      return data.posts;
    } catch (err) {
      error.value = err.message;
      console.error('Error fetching posts:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const setSearchQuery = (query) => {
    searchQuery.value = query;
    currentPage.value = 1;
  };
  
  const setCurrentPage = (page) => {
    currentPage.value = page;
  };
  
  // Getters (computed)
  const displayedPosts = computed(() => {
    return posts.value.slice(0, 4);
  });
  
  const filteredPosts = computed(() => {
    let filtered = posts.value;
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = posts.value.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtered.slice(start, end);
  });
  
  const totalPages = computed(() => {
    let filtered = posts.value;
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = posts.value.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return Math.ceil(filtered.length / itemsPerPage);
  });
  
  return {
    // State
    posts,
    isLoading,
    error,
    searchQuery,
    currentPage,
    
    // Actions
    fetchPosts,
    setSearchQuery,
    setCurrentPage,
    
    // Getters (computed)
    displayedPosts,
    filteredPosts,
    totalPages,
  };
});