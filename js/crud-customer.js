const crudCustomer = {
    template: `
    <div class="modal fade py-0" tabindex="-1" aria-labelledby="modalCreateCustomer" id="modalCreateCustomer"
    aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content rounded-5 shadow">
                <div class="modal-header p-5 pb-4 border-bottom-0">
                    <h2 class="fw-bold mb-0">Criar cliente </h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body p-5 pt-0">
                    <form class="" id="customer">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control rounded-4" id="name" name="name"
                                placeholder="Nome" v-bind:value="customer.name">
                            <label for="name">Nome</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control rounded-4" id="lastname" name="lastname"
                                placeholder="Sobrenome" v-bind:value="customer.lastName">
                            <label for="lastname">Sobrenome</label>
                        </div>

                        <div class="form-floating mb-3">
                            <select class="form-select" aria-label="Gender" name="gender"
                                v-bind:value="customer.gender">
                                <option selected>Escolha o gênero</option>
                                <option value="men">Masculino</option>
                                <option value="women">Feminino</option>
                                <option value="other">Outros</option>
                            </select>
                        </div>
                        <button @click="create()" class="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
                            type="button" data-bs-dismiss="modal">Criar</button>
                        <small class="text-muted">Clicando em Criar, você concorda com os termos de uso.</small>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="modal modal-signin position-static d-block py-0 d-none" tabindex="-1" role="dialog"
            aria-labelledby=="modalCallbackSocial">
            <div class="modal-dialog" role="document">
                <div class="modal-content rounded-5 shadow">
                    <div class="modal-header p-5 pb-4 border-bottom-0">
                        <h2 class="col fw-bold mb-0 text-center">
                            Que bom ter você aqui,</h2>
                    </div>
                    <div class="modal-body p-5 pt-0">
                        <div class="row">
                            <div class="col">
                                <img v-bind:src="customer.profileImage" class="rounded-circle">
                            </div>
                            <div class="col align-self-center justify-self-center">
                                <h2 class="text-muted">{{ customer.name }} {{ customer.lastName }} </h2>
                            </div>
                        </div>
                        <div class="row">
                            <button class="w-100 py-2 mt-2 mb-2 btn btn-lg rounded-4 btn-primary"
                                type="submit">Entrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="card rounded-5 shadow position-static d-block col py-0 m-2 p-4 pb-4" :class="selectedTheme"> 
            <div class="card-body">
                <div class="container p-4">
                    <div class="box">
                        <h2 class="card-title col-auto fw-bold mb-0 text-center position-relative"> Clientes
                            <span
                                class="position-absolute mt-3 top-0 start-100 translate-middle badge rounded-pill bg-success">
                                {{ customers.length }}
                            </span>
                            <span
                                class="position-absolute mt-3 top-0 start-0 translate-middle badge text-black"
                                v-if="!darkThemed" @click="toogleDarkTheme()">
                                <svg class="bi me-1 rounded-4" width="24" height="24">
                                    <use xlink:href="#dark-mode" />
                                </svg>
                            </span>
                            <span
                                class="position-absolute mt-3 top-0 start-0 translate-middle badge text-white"
                                v-if="darkThemed" @click="toogleDarkTheme()">
                                <svg class="bi me-1 rounded-4" width="24" height="24">
                                    <use xlink:href="#bright-mode" />
                                </svg>
                            </span>
                        </h2>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped table-sm table-hover" :class="tableTheme">
                        <thead>
                            <tr class="">
                                <th scope="col">#</th>
                                <th scope="col">Foto</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Sobrenome</th>
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="customer in customers" :key="customer.id" :class="[customer.deleted ? 'table-warning text-muted deleted' : '',
                                        customer.selected ? 'table-primary' : '']">
                                <td>{{customer.id}}</td>
                                <td><img v-bind:src="customer.profileImage" class="rounded-circle" width="50"
                                        height="50"></td>
                                <td>{{customer.name}}</td>
                                <td>{{customer.lastName}}</td>
                                <td>
                                    <button @click="select(customer)" class="btn" :class="buttonTheme"
                                        v-if="!customer.selected && !customer.deleted">
                                        <svg class="bi me-1 rounded-4" width="24" height="24">
                                            <use xlink:href="#select" />
                                        </svg>
                                    </button>
                                    <button @click="select(customer)" class="btn btn-outline-dark"
                                        v-if="customer.selected">
                                        <svg class="bi me-1 rounded-4" width="24" height="24">
                                            <use xlink:href="#deselect" />
                                        </svg>
                                    </button>
                                    <button @click="undelete(customer)" class="btn btn-outline-secondary"
                                        v-if="customer.deleted">
                                        <svg class="bi me-1 rounded-4" width="24" height="24">
                                            <use xlink:href="#undelete" />
                                        </svg></button>
                                </td>
                        </tbody>
                    </table>
                </div>
                <div class="container">
                    <div class="row justify-content-between">
                        <div class="col-2">
                            <button class="btn btn-outline-primary position-relative" data-bs-toggle="modal"
                                data-bs-target="#modalCreateCustomer">
                                <svg class="bi me-1 rounded-4" width="24" height="24">
                                    <use xlink:href="#add" />
                                </svg>
                                <span 
                                    class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-primary"
                                    v-show="numCreated > 0">
                                    {{numCreated}} 
                                </span>
                            </button>
                        </div>
                        <div class="col-2">
                            <button class="btn btn-outline-secondary position-relative" data-bs-toggle="modal"
                                data-bs-target="#modalCreateCustomer" v-show="numSelected === 1">
                                <svg class="bi me-1 rounded-4" width="24" height="24">
                                    <use xlink:href="#edit" />
                                </svg>
                            </button>
                        </div>
                        <div class="col-2">
                            <button @click="deleteSelected()" class="btn btn-outline-danger position-relative"
                                v-show="numSelected > 0">
                                <svg class="bi me-1 rounded-4" width="24" height="24">
                                    <use xlink:href="#delete" />
                                </svg>
                                <span
                                    class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger">
                                    {{numSelected}} </span>
                            </button>
                        </div>
                        <div class="col-2">
                            <button @click="undeleteAll()" class="btn btn-outline-secondary position-relative"
                                v-show="numDeleted > 0">
                                <svg class="bi me-1 rounded-4" width="24" height="24">
                                    <use xlink:href="#undelete" />
                                </svg>
                                <span
                                    class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-secondary">
                                    {{numDeleted}} </span>
                            </button>
                        </div>
                        <div class="col-2">
                            <button @click="confirmActions()" class="btn btn-outline-success position-relative"
                                v-show="numDeleted > 0 || numCreated > 0 || numEdited > 0" id="confirmBtn">
                                <svg class="bi me-1 rounded-4" width="24" height="24">
                                    <use xlink:href="#upload" />
                                </svg>
                                <span
                                    class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-success">
                                    {{numPendingActions}} </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,

    data() {
        return {
            customer: {
                name: 'Teste',
                lastName: 'da Silva',
                number: Math.floor(Math.random() * 100),
                gender: 'men',
                get profileImage() {
                    return 'https://randomuser.me/api/portraits/' + this.gender + '/' + this.number + '.jpg';
                },
                selected: false,
                deleted: false,
                edited: false,
                created: true,
            },

            customers: [
                {
                    id: 1,
                    name: 'Leonardo',
                    lastName: 'Silva',
                    number: Math.floor(Math.random() * 100),
                    gender: 'men',
                    profileImage: 'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 100) + '.jpg',
                    selected: false,
                    deleted: false,
                    edited: false,
                    created: false,
                },
                {
                    id: 2,
                    name: 'Leonardo',
                    lastName: 'Rici',
                    number: Math.floor(Math.random() * 100),
                    gender: 'men',
                    profileImage: 'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 100) + '.jpg',
                    selected: false,
                    deleted: false,
                    edited: false,
                    created: false,
                },
                {
                    id: 3,
                    name: 'Rafael',
                    lastName: 'Mesquita',
                    number: Math.floor(Math.random() * 100),
                    gender: 'men',
                    profileImage: 'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 100) + '.jpg',
                    selected: false,
                    deleted: false,
                    edited: false,
                    created: false,
                },

                {
                    id: 4,
                    name: 'Alexsander',
                    lastName: 'Giusti',
                    number: Math.floor(Math.random() * 100),
                    gender: 'men',
                    profileImage: 'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 100) + '.jpg',
                    selected: false,
                    deleted: false,
                    edited: false,
                    created: false,
                },
                {
                    id: 5,
                    name: 'Cris',
                    lastName: 'Alves',
                    number: Math.floor(Math.random() * 100),
                    gender: 'women',
                    profileImage: 'https://randomuser.me/api/portraits/women/' + Math.floor(Math.random() * 100) + '.jpg',
                    selected: false,
                    deleted: false,
                    edited: false,
                    created: false,
                }
            ],

            numSelected: 0,
            numDeleted: 0,
            numCreated: 0,
            numEdited: 0,
            numPendingActions: 0,
            updated: false,
            darkThemed: false,
        }
    },

    computed: {
        nextId() {
            return this.customers.length + 1;
        },
    },

    methods: {
        create(customer) {
            this.customer.number = Math.floor(Math.random() * 100),
            this.customer.id = this.nextId;
            this.customer.profileImage = 'https://randomuser.me/api/portraits/' + this.customer.gender + '/' + this.customer.number + '.jpg';
            this.customer.selected = false;
            this.customer.deleted = false;
            this.customer.edited = false;
            this.customer.created = true;

            console.log("Criando cliente = ", this.customer);

            this.customers.push(this.customer);
            this.count();
        },

        read() {
            console.log("Ler os customer usando a API...");
        },

        select(customer) {
            customer.selected = !customer.selected;
            console.log(customer.name + " " + customer.lastName + " = " + customer.selected);
            this.count();

        },
        undelete(customer) {
            customer.deleted = false;
            customer.selected = false;
            console.log("Deleted " + customer.name + " = " + customer.deleted);
            this.count();
        },
        deleteSelected() {
            this.customers.forEach(element => {
                console.log(element.name + " = " + element.selected);
                if (element.selected) {
                    element.selected = false;
                    element.deleted = true;
                    console.log("Deleted " + element.name + " = " + element.deleted);
                }
            });
            this.count();
        },
        undeleteAll() {
            this.customers.forEach(element => {
                this.undelete(element);
            });
        },
        confirmActions() {
            this.confirmDelete();
            this.confirmCreate();
            this.confirmUpdate();
            this.count();
        },
        confirmDelete() {
            for (var i = 0; i < this.customers.length; i++) {
                element = this.customers[i];
                console.log(element.name + " " + element.lastName + " [" + element.id + "] = " + element.deleted);
                if (element.deleted) {
                    console.log("Deleting " + element.name + " " + element.lastName + " [" + i + "] = id " + element.id);
                    this.customers.splice(i, 1);
                    i--;
                }
            }
        },
        confirmCreate() {
            console.log("Create");
            for (var i = 0; i < this.customers.length; i++) {
                element = this.customers[i];
                if (element.created) {
                    element.created = false;
                }
            }
        },

        confirmUpdate() {
            console.log("Update");
        },
        count() {
            this.numSelected = 0;
            this.numCreated = 0;
            this.numPendingActions = 0;
            this.numDeleted = 0;

            this.customers.forEach(element => {
                if (element.selected) {
                    this.numSelected++;
                }
                if (element.deleted) {
                    this.numDeleted++;
                }

                if (element.created) {
                    this.numCreated++;
                }
            });

            this.numPendingActions = this.numDeleted + this.numEdited + this.numCreated;
            console.log("selected = " + this.numSelected);
            console.log("deleted = " + this.numDeleted);
            console.log("added = " + this.numCreated);
            console.log("edited = " + this.numEdited);
            console.log("updated = " + this.numPendingActions);
        },

        toogleDarkTheme() {
            this.darkThemed = !this.darkThemed;
            if (this.darkThemed) {
                this.selectedTheme = ['bg-dark', 'text-white'];
                this.tableTheme = ['table-dark'];
                this.buttonTheme = ['btn-dark'];

            } else {
                this.selectedTheme = ['bg-white', 'text-black'];
                this.tableTheme = ['table-light'];
                this.buttonTheme = [''];
            }
        }
    },
}

const app = Vue.createApp(crudCustomer);

app.component('crud-customer', crudCustomer);

app.mount('#app');

function initToast() {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl, { autohide: true, delay: 7000 })
    });
}

function triggerToast() {
    var toastTrigger = document.getElementById('confirmBtn')
    var toastLiveExample = document.getElementById('liveToast')
    if (toastTrigger) {
        toastTrigger.addEventListener('click', function () {
            var toast = new bootstrap.Toast(toastLiveExample)

            toast.show()
        })
    }
}

initToast();
triggerToast();