<script lang="ts">
	/**
	 * Dependence
	 */
	import { onMount } from 'svelte';
	import PostsApi from '$lib/api/methods/posts';
	import { getReasonPhrase } from 'http-status-codes';

	/**
	 * Components
	 */
	import Feed from '$lib/components/feed/Feed.svelte';
	import Loader from '$lib/components/shared/Loader.svelte';
	import ErrorComponent from '$lib/components/shared/Error.svelte';
	import type { IPost } from '$lib/api/types/models/post';
	
	/**
	 * Post
	 */


	/**
	 * Переменные 
	 */
  // ... (импорты остаются без изменений)

  let posts: IPost[] | undefined = undefined;
  let error: string | null = null;
  let loading: boolean = true;

  async function loadData() {
    loading = true;
    error = null;

    try {
      const response = await PostsApi.getAll();

      if (!response.success) {
        // Более подробное сообщение об ошибке
        const errorMessage = `Ошибка API: ${response.data.code} - ${getReasonPhrase(response.data.code)}`;
        throw new Error(errorMessage);
      }

      posts = response.data;
      localStorage.setItem('posts', JSON.stringify(posts));
      alert('✅ Посты загружены успешно!');

    } catch (e: unknown) {
      // Обработка ошибок с типом ошибки
      if (e instanceof Error) {
        error = `Ошибка загрузки данных: ${e.message}`;
      } else {
        error = 'Неизвестная ошибка при загрузке данных.';
      }

      // Попытка загрузки из localStorage
      const cachedPosts = localStorage.getItem('posts');
      if (cachedPosts) {
        try {
          posts = JSON.parse(cachedPosts);
          alert('⚠️ Ошибка запроса. Загружено из LS.');
        } catch (parseError: unknown) {
          error = 'Ошибка парсинга данных из localStorage.'; // Обработка ошибки парсинга
          console.error('Ошибка парсинга:', parseError);
        }
      } else {
        alert(`❌ Ошибка: ${error}`);
      }
    } finally {
      loading = false;
    }
  }

  onMount(loadData);
</script>

{#if loading}
  <Loader />
{:else if error}
  <ErrorComponent>{error}</ErrorComponent>
{:else}
  <Feed {posts} />
{/if}
