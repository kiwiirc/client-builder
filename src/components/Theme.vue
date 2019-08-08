<template>
    <div id="inputContainer">
        <div class="input-column">
            <h3>Themes</h3>
            <select v-model="localData.config.theme" @change="update">
                <option value = "Default">Default</option>
                <option value = "Dark">Dark</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Theme',
    props: ['localData'],
    methods: {
        update() {
            this.$emit('setConfig', 1);
        },
    },
};
</script>
