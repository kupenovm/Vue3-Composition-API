import axios  from 'axios';
import { onMounted, ref } from 'vue';

export default function usePost(limit) {

	const posts =ref([])
	const totalPages = ref(0)
	const isPostsLoading = ref(true)

	const fetching = async () => {
		try {
			const response = await axios.get(
				'https://jsonplaceholder.typicode.com/posts',
				{
					params: {
						_page: this.page,
						_limit: this.limit,
					},
				}
			);

			totalPages.value = Math.ceil(
			response.headers['x-total-count'] /limit
			);
			posts.value = response.data;
			isPostsLoading.value = false;
		} catch (e) {
			alert('Ошибка');
		} 
	}

	onMounted(fetching)

	return {
		posts, isPostsLoading, totalPages
	}

   
}