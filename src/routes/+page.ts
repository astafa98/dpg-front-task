import type { PageLoad } from './$types';
import PostsApi from '$lib/api/methods/posts';

export const load: PageLoad = async () => {
    const response = await PostsApi.getAll();
    
    if (!response.success) {
        throw new Error('Failed to fetch posts');
    }

    return {
        posts: response.data
    };
};
