<template>
    <div class="u-tabbed-view">
        <ul :key="a" class="tabs">
            <li v-for="c in tabs" :key="prefixID + a + c.name + c.header">
                <a
                    :class="{
                        'active': c.active
                    }"
                    @click="setActive(c)"
                >{{ c.header }}</a>
            </li>
        </ul>
        <slot/>
    </div>
</template>

<script>
'kiwi public';

import Vue from 'vue';

Vue.component('tabbed-tab', {
    props: {
        header: { status: String },
        focus: { status: Boolean },
        name: { status: String },
    },
    data: function data() {
        return { active: false };
    },
    template: '<div v-if="active" class="u-tabbed-content"><slot></slot></div>',
});

export default Vue.component('tabbed-view', {
    data: function data() {
        return {
            // We increment this when we need to re-render the tabs.
            // Vue doesn't pick up on the $children changes all the time so we handle
            // it ourselves.
            a: 1,
            prefixID: Math.floor(Math.random() * 100000).toString(36),
        };
    },
    computed: {
        tabs: function computedtabs() {
            window.t = this;
            return this.$children;
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.a++;
            this.setActiveCheck();
        });
    },
    methods: {
        getActive: function getActive() {
            let foundChild = null;
            this.$children.forEach((child) => {
                if (child.active) {
                    foundChild = child;
                }
            });

            return foundChild;
        },
        setActive: function setActive(c) {
            this.$children.forEach((child) => {
                if (child !== c) {
                    child.active = false;
                }
            });
            c.active = true;

            // Without this, vue doesnt update itself with the new $children :(
            this.a++;
            this.$emit('changed', c);
        },
        setActiveByName: function setActiveByName(name) {
            this.$children.forEach((child) => {
                if (child.name === name) {
                    this.setActive(child);
                }
            });
        },
        setActiveCheck: function setActiveCheck() {
            this.$children.forEach((t) => {
                if (t.focus) {
                    this.setActive(t);
                }
            });
        },
    },
});
</script>
