const toggleDarkMode = {
    template: `
    <span class="position-absolute mt-3 top-0 start-0 translate-middle badge text-black"
        v-if="!darkMode" @click="setDarkMode()">
        <svg class="bi me-1 rounded-4" width="24" height="24">
            <use xlink:href="#dark-mode-icon" />
        </svg>
    </span>
        <span class="position-absolute mt-3 top-0 start-0 translate-middle badge text-white"
            v-if="darkMode" @click="setLightMode()">
            <svg class="bi me-1 rounded-4" width="24" height="24">
                <use xlink:href="#light-mode-icon" />
            </svg>
    </span>
    `, 
    data() {
        return {
            darkMode: false,
        }
    },

    emits: [
           'dark-mode',
           'light-mode',
    ],

    methods: {
        setDarkMode() {
            this.darkMode = true;
            this.$emit('dark-mode');
        },

        setLightMode() {
            this.darkMode = false;
            this.$emit('light-mode');
        },

        getDarkMode() {
            this.darkMode ? this.$emit('dark-mode') : this.$emit('light-mode');
        }
    }
}