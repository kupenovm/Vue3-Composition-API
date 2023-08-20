<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Поиск ..."
            v-focus
        />
        <div class="app__btns">
            <my-button @click="showDialog">Создать пост</my-button>
            <my-select
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="sortOptions"
            />
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            dialogVisible: false,
        };
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
        }),
        ...mapActions({
            fetchPosts: 'post/fetchPosts',
            loadMorePosts: 'post/loadMorePosts',
        }),
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter((p) => p.id !== post.id);
        },
        showDialog() {
            this.dialogVisible = true;
        },
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
        }),
        ...mapState({
            posts: (state) => state.post.posts,
            isPostsLoading: (state) => state.post.isPostsLoading,
            selectedSort: (state) => state.post.selectedSort,
            searchQuery: (state) => state.post.searchQuery,
            page: (state) => state.post.page,
            totalPages: (state) => state.post.totalPages,
            limit: (state) => state.post.limit,
            sortOptions: (state) => state.post.sortOptions,
        }),
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
