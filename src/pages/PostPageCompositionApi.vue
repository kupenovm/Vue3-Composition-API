<template>
    <div>
        <h1>Страница с постами</h1>

        <my-input v-model="searchQuery" placeholder="Поиск ..." v-focus />
        <div class="app__btns">
            <my-button @click="showDialog">Создать пост</my-button>
            <my-select v-model="selectedSort" :options="sortOptions" />
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div v-else>Идет загрузка ...</div>

        <div
            v-intersection="loadMorePosts"
            ref="observer"
            class="observer"
        ></div>
    </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import usePosts from '@/hooks/usePost';

export default {
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            dialogVisible: false,

            sortOptions: [
                { value: 'title', name: 'По названию' },
                { value: 'body', name: 'По содержимому' },
            ],
        };
    },
    setup(props) {
        const { posts, totalPages, isPostsLoading } = usePosts(10);

        return {
            posts,
            totalPages,
            isPostsLoading,
        };
    },
};
</script>

<style scoped>
.app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10px;
}

.current-page {
    border: 2px solid teal;
}

.observer {
    height: 30px;
    background: green;
}
</style>
