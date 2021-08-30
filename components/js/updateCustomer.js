const updateCustomer = {
    template: `
        <div class="modal fade py-0" tabindex="-1" aria-labelledby="modalUpdateCustomer" id="modalUpdateCustomer"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content rounded-5 shadow" :class="selectedTheme">
                <div class="modal-header p-5 pb-4 border-bottom-0">
                    <h2 class="fw-bold mb-0">Editar cliente </h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" :class="buttonTheme">
                    </button>
                </div>

                <div class="modal-body p-5 pt-0">
                    <form class="" id="customer">
                        <div class="form-floating mb-3 center">
                            <img v-bind:src="selectedCustomer.profileImage" class="rounded-circle">
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control rounded-4" id="name" name="name"
                                placeholder="Nome" v-model="selectedCustomer.name" :class="inputTheme">
                            <label for="name">Nome</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control rounded-4" id="lastname" name="lastname"
                                placeholder="Sobrenome" v-model="selectedCustomer.lastName" :class="inputTheme">
                            <label for="lastname">Sobrenome</label>
                        </div>

                        <div class="form-floating mb-3">
                            <select class="form-select" aria-label="Gender" name="gender" 
                                v-model="selectedCustomer.gender" :class="inputTheme">
                                <option value="men">Masculino</option>
                                <option value="women">Feminino</option>
                                <option value="other">Outros</option>
                            </select>
                            <label for="gender">Gênero</label>
                        </div>
                        <button @click="update(selectedCustomer)" class="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
                            type="button" data-bs-dismiss="modal">Editar</button>
                        <small class="text-muted">Clicando em Editar, você concorda com os termos de uso.</small>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            customer: {
                name: '',
                lastName: '',
                gender: '',
            },
        }
    },
    computed: {
        selectedTheme() {
            if (this.darkMode) {
                ret = ['bg-dark', 'text-white'];
            } else {
                ret = ['bg-white', 'text-black'];
            }
            console.log('selectedTheme this.darkMode ' +  this.darkMode);        
            console.log('selectedTheme = ' +  ret);        
            return ret;
        }, 

        buttonTheme() {
            if (this.darkMode) {
                ret = ['btn-secondary', 'bg-light'];
            } else {
                ret = ['btn-light'] ;
            } 
            console.log('buttonTheme this.darkMode ' +  this.darkMode);        
            console.log('buttonTheme = ' +  ret);        
            return ret;
        }, 

        inputTheme() {
            if (this.darkMode) {
                ret = ['bg-secondary', 'text-white'];
            } else {
                ret = [''] ;
            } 
            console.log('inputTheme this.darkMode ' +  this.darkMode);        
            console.log('inputTheme = ' +  ret);        
            return ret;
        },
    },

    props: {
        selectedCustomer: Object,
        darkMode: Boolean,
    },

    emits: [
        'update-customer',
    ],

    methods: {
        update() {
            console.log("Emitindo evento update-customer com customer ", this.selectedCustomer);
            this.$emit('update-customer', this.selectedCustomer);
            this.reset(); 
        },

        closeCreateCustomer() {
            selectedCustomer.backup.pop();
            console.log("Edição cancelada cliente = ", updateCustomer + "backup = ", customer.backup);
        },

        reset() {
            this.customer.name = '';
            this.customer.lastName = '';
            this.customer.gender = '';
        }

    }
}