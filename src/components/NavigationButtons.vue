<template>
    <div class="nav-wrapper">
        
        
        <div class="btnContainer desktop-only">
            <button 
                v-for="cat in categories" 
                :key="cat.id"
                class="searchBtn" 
                :class="{ isActive: isActive === cat.id }" 
                @click="SearchTerm(cat.id)"
            >
                <component :is="cat.icon" class="navicons"/> 
                <span>{{ cat.label }}</span>
            </button>
        </div>

        
        <div class="mobile-only">
            <button class="mobile-trigger" @click="showMenu = true">
                <component :is="currentCategory.icon" class="navicons"/>
                <span>{{ currentCategory.label }}</span>
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
        </div>

        
        <Transition name="overlay">
            <div v-if="showMenu" class="menu-overlay" @click.self="showMenu = false">
                <div class="menu-panel">
                    <div class="menu-header">
                        <h3>Filtrer par catégorie</h3>
                        <button class="close-btn" @click="showMenu = false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    <div class="menu-list">
                        <button 
                            v-for="cat in categories" 
                            :key="cat.id"
                            class="menu-item"
                            :class="{ active: isActive === cat.id }"
                            @click="selectMobile(cat.id)"
                        >
                            <div class="menu-item-icon">
                                <component :is="cat.icon" class="navicons"/>
                            </div>
                            <span>{{ cat.label }}</span>
                            <svg v-if="isActive === cat.id" class="check-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { 
    FlBeach, 
    CaAlignHorizontalLeft, 
    MaHistoric, 
    MaTown, 
    MaWaterfall, 
    MdOutlinedForest 
} from '@kalimahapps/vue-icons';

const isActive = ref('tout');
const showMenu = ref(false);
const emit = defineEmits(['term']);

const categories = [
    { id: 'tout', label: 'Tout', icon: CaAlignHorizontalLeft },
    { id: 'plage', label: 'Plages', icon: FlBeach },
    { id: 'historique', label: 'Historique', icon: MaHistoric },
    { id: 'ville', label: 'Villes', icon: MaTown },
    { id: 'cascade', label: 'Cascades', icon: MaWaterfall },
    { id: 'nature', label: 'Nature', icon: MdOutlinedForest },
];

const currentCategory = computed(() => 
    categories.find(c => c.id === isActive.value) || categories[0]
);

const SearchTerm = (term) => {
    isActive.value = term;
    emit('term', term);
};

const selectMobile = (term) => {
    SearchTerm(term);
    showMenu.value = false;
};
</script>

<style scoped>

.nav-wrapper {
    width: 100%;
    padding: 16px 0;
    display: flex;
    justify-content: center;
    position: relative;
}





.btnContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    padding: 6px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 50px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    max-width: 100%;
}

.searchBtn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: none;
    background: transparent;
    color: #cbd5e1;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: pointer;
    transition: color 0.3s ease, background 0.3s ease, transform 0.2s ease;
    white-space: nowrap;
}

.searchBtn:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
}

.navicons {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
    flex-shrink: 0;
}

.searchBtn:hover .navicons {
    transform: scale(1.15);
}

.isActive {
    background: var(--secondaryColor, #009afa);
    color: #fff;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(0, 154, 250, 0.4);
}

.isActive:hover {
    background: var(--secondaryColor, #009afa);
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 154, 250, 0.6);
}

.isActive .navicons {
    transform: scale(1.1);
}


.mobile-only {
    display: none;
}





.mobile-trigger {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 24px;
    background: rgba(0, 154, 250, 0.15);
    border: 1px solid rgba(0, 154, 250, 0.3);
    border-radius: 30px;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.mobile-trigger:hover,
.mobile-trigger:active {
    background: rgba(0, 154, 250, 0.25);
}

.mobile-trigger .navicons {
    width: 18px;
    height: 18px;
    color: var(--secondaryColor);
}

.mobile-trigger .chevron {
    color: var(--secondaryColor);
    transition: transform 0.3s ease;
}





.menu-overlay {
    position: fixed;
    inset: 0;
    background: rgba(13, 17, 23, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 9998;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

.menu-panel {
    width: 100%;
    background: #161c22;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    padding: 20px;
    padding-bottom: 40px;
    box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.5);
    max-height: 80vh;
    overflow-y: auto;
    animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
}

.menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.menu-header h3 {
    margin: 0;
    font-family: 'Smooch Sans', sans-serif;
    font-size: 1.3rem;
    color: #fff;
    font-weight: 700;
}

.close-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: none;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.25s ease;
}

.close-btn:hover {
    background: rgba(255, 255, 255, 0.1);
}

.menu-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid transparent;
    border-radius: 14px;
    color: #cbd5e1;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease;
    text-align: left;
    width: 100%;
}

.menu-item:hover {
    background: rgba(255, 255, 255, 0.06);
}

.menu-item.active {
    background: rgba(0, 154, 250, 0.15);
    border-color: rgba(0, 154, 250, 0.4);
    color: #fff;
    font-weight: 600;
}

.menu-item-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.menu-item.active .menu-item-icon {
    background: var(--secondaryColor, #009afa);
}

.menu-item-icon .navicons {
    width: 20px;
    height: 20px;
    color: #fff;
}

.menu-item span {
    flex: 1;
    text-align: left;
}

.check-icon {
    color: var(--secondaryColor);
    flex-shrink: 0;
}


.overlay-enter-active,
.overlay-leave-active {
    transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
    opacity: 0;
}





@media (max-width: 780px) {
    .desktop-only {
        display: none;
    }
    
    .mobile-only {
        display: block;
    }

    .nav-wrapper {
        justify-content: center;
        padding: 12px 16px;
    }
}
</style>