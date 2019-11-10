<template>
    <div id="inputContainer">
        <div class="input-column">
            <h3>Themes</h3>
            <select v-model="localData.config.theme" @change="update">
                <option
                    v-for="t in localData.config.themes"
                    :value="t.name"
                    :key="t.name"
                >{{ t.name }}</option>
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
