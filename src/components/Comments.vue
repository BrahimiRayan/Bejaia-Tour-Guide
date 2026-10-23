<template>
    <div class="comments-block">
        <h4 id="comLabel">Discussion <span>({{ PostComments.length }})</span></h4>
        
        <form @submit.prevent="AddComment" class="comForm">
            <div class="input-wrapper">
                <input 
                    id="com" 
                    type="text" 
                    v-model="comment" 
                    placeholder="Partagez votre avis..." 
                    :disabled="isdisabled" 
                    autocomplete="off" 
                    minlength="1"
                >
                <button v-if="isAuthed" type="submit" :disabled="!comment.trim()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    Publier
                </button>
            </div>
        </form>

        <div class="Comment_section">
            <div v-if="PostComments && PostComments.length > 0" class="comment-card" v-for="(comment, index) in PostComments" :key="comment.id">
                
                <div class="user_iden">
                    <img :src="comment.user_img || defaultImg" alt="" width="40px" height="40px" @error="onImageError">
                    <div class="user-meta">
                        <h4>{{ comment.user_name }}</h4>
                        <span>{{ comment.created_at }}</span>
                    </div>
                </div>
                
                <button v-if="isAuthed?.uid === comment.user_id" class="delete-btn" @click="CommentDel(comment.id)" title="Supprimer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>

                <p class="comment-text">{{ comment.text }}</p>
            </div>

            <div v-else class="NoComments">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                <p>Soyez le premier à commenter ce lieu.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { isAuthed } from '@/composables/LogicAuth';
import { onMounted, ref } from 'vue';
import useComments from '@/composables/useComments';
import defaultImg from '@/assets/pics/user.png';

const { Commenting, fetchComments, deleteComment } = useComments();

const comment = ref('');
const PostComments = ref([]);
const isdisabled = ref(true);

const props = defineProps({
    post_id: String,
});

const onImageError = (event) => {
    event.target.src = defaultImg;
};

if (isAuthed.value) {
    isdisabled.value = false;
} else {
    isdisabled.value = true; 
}

const CommentDel = async (comment_id) => {
    await deleteComment(comment_id);
    PostComments.value = await fetchComments(props.post_id);
};

const AddComment = async () => {
    if(!comment.value.trim()) return;
    await Commenting(comment.value, props.post_id);
    comment.value = '';
    PostComments.value = await fetchComments(props.post_id);
};

onMounted(async () => {
    const cmntrs = await fetchComments(props.post_id);
    PostComments.value = cmntrs || [];
});
</script>

<style scoped>

.comments-block {
    width: 100%;
    font-family: 'Smooch Sans', sans-serif;
}

#comLabel {
    font-size: 1.8rem;
    color: #fff;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
}

#comLabel span {
    color: var(--secondaryColor, #009afa);
    background: rgba(0, 154, 250, 0.1);
    font-size: 1rem;
    padding: 2px 10px;
    border-radius: 20px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
}

.comForm {
    width: 100%;
    margin-bottom: 3rem;
}

.input-wrapper {
    display: flex;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 6px;
    transition: all 0.3s ease;
}

.input-wrapper:focus-within {
    border-color: var(--secondaryColor, #009afa);
    box-shadow: 0 0 0 3px rgba(0, 154, 250, 0.15);
    background: rgba(255, 255, 255, 0.05);
}

.input-wrapper input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #eef2f6;
    font-size: 1rem;
    padding: 10px 15px;
    font-family: 'Inter', sans-serif;
}

.input-wrapper input::placeholder {
    color: #6b7280;
}

.input-wrapper input:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.input-wrapper button {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--secondaryColor, #009afa);
    color: #fff;
    border: none;
    padding: 0 24px;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.input-wrapper button:hover:not(:disabled) {
    background: #007acc;
    transform: translateY(-1px);
}

.input-wrapper button:disabled {
    background: rgba(255, 255, 255, 0.1);
    color: #6b7280;
    cursor: not-allowed;
}

.Comment_section {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.comment-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    padding: 1.5rem;
    position: relative;
    transition: border-color 0.3s ease, background 0.3s ease;
}

.comment-card:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.12);
}

.user_iden {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}

.user_iden img {
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.1);
}

.user-meta h4 {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.2;
}

.user-meta span {
    color: #6b7280;
    font-size: 0.8rem;
    font-family: 'Inter', sans-serif;
}

.comment-text {
    color: #cbd5e1;
    font-size: .9rem;
    line-height: 1.6;
    margin: 0;
    padding-left: 1rem; 
    word-break: break-word;
}

.delete-btn {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    color: #6b7280;
    border: 1px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
}

.comment-card:hover .delete-btn {
    opacity: 1;
}

.delete-btn:hover {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
    border-color: rgba(239, 68, 68, 0.3);
}

.NoComments {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    text-align: center;
    color: #6b7280;
    background: rgba(255, 255, 255, 0.02);
    border: 1px dashed rgba(255, 255, 255, 0.1);
    border-radius: 16px;
}

.NoComments svg {
    margin-bottom: 1rem;
    opacity: 0.5;
}

.NoComments p {
    font-size: 1.1rem;
    font-family: 'Inter', sans-serif;
}

@media (max-width: 600px) {
    .input-wrapper {
        flex-direction: column;
        padding: 10px;
    }
    
    .input-wrapper input {
        padding: 10px;
    }

    .input-wrapper button {
        width: 100%;
        justify-content: center;
        padding: 12px;
        margin-top: 8px;
    }

    .comment-text {
        padding-left: 0;
        margin-top: 10px;
        font-size: 1rem;
    }

    .delete-btn {
        opacity: 1;
    }
}
</style>