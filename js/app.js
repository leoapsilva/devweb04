const myApp = {
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
                updated: false,
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
                    updated: false,
                    created: false,
                    backup: [],
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
                    updated: false,
                    created: false,
                    backup: [],
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
                    updated: false,
                    created: false,
                    backup: [],
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
                    updated: false,
                    created: false,
                    backup: [],
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
                    updated: false,
                    created: false,
                    backup: [],
                }
            ],

            numSelected: 0,
            numDeleted: 0,
            numCreated: 0,
            numUpdated: 0,
            numPendingActions: 0,
            updated: false,

            darkMode: false,
            selectedTheme:  [ 'bg-white', 'text-black'],
            tableTheme:  ['table-light'],
            buttonTheme:  [''],

            toastMessageText: '',
            toastHeaderText: '',
            toastHeaderIcon: '',
            toastHeaderBgColor: '',
            toastHeaderTextColor: '',

            selectedCustomer: {},
        }
    },

    computed: {
        nextId() {
            return this.customers.length + 1;
        },
    },

    props: {
        newCustomer: {
            name: {
                type: String,
                required: true,
                default: '',
            },
            lastName: {
                type: String,
                required: true,
                default:'',
            },
            gender: {
                type: String,
                required: true,
                default:'women',
            },
        },
    },

    methods: {
        create(customer) {
            var createCustomer = new Object;

            createCustomer.name = customer.name;
            createCustomer.lastName = customer.lastName;
            createCustomer.gender = customer.gender;
            
            createCustomer.number = Math.floor(Math.random() * 100);
            createCustomer.id = this.nextId;
            createCustomer.profileImage = 'https://randomuser.me/api/portraits/' + createCustomer.gender + '/' + createCustomer.number + '.jpg';
            createCustomer.selected =  false;
            createCustomer.deleted =  false;
            createCustomer.updated =  false;
            createCustomer.created =  true;
            createCustomer.backup = [];
 
            console.log("Criando cliente = ", createCustomer);
            this.customers.push(createCustomer);

            this.count();
        },

        update(customer) {
            var updateCustomer = customer;

            if (customer.name === customer.backup[customer.backup.length - 1].name &&
                customer.lastName === customer.backup[customer.backup.length - 1].lastName && 
                customer.gender === customer.backup[customer.backup.length - 1].gender) {

                customer.backup.pop();
                console.log("Edição cancelada cliente = ", updateCustomer + "backup = ", customer.backup);
            }
            else {
                updateCustomer.name = customer.name;
                updateCustomer.lastName = customer.lastName;
                updateCustomer.gender = customer.gender;
               
                updateCustomer.selected =  false;
                updateCustomer.deleted =  false;
                updateCustomer.created =  false;
                updateCustomer.updated =  true;

                console.log("Editando cliente = ", updateCustomer);
                this.count();
             }
 
        },

        setSelectedCustomer(customer) {
            this.selectedCustomer = customer;
            this.backup(customer);
            console.log("Selected customer = ", this.selectedCustomer);
        },

        backup(customer) {
            var backupCustomer = { 
                name: customer.name, 
                lastName: customer.lastName,
                gender: customer.gender,
            }
            customer.backup.push(backupCustomer);
        },

        undoUpdate(customer) {
            console.log("Undo update ", customer);
            var backupCustomer = customer.backup.pop();
            customer.name = backupCustomer.name;
            customer.lastName = backupCustomer.lastName;
            customer.gender = backupCustomer.gender;

            customer.updated = (customer.backup.length > 0 );
            console.log("undo customer.updated = " + customer.updated)

            this.count();
        },

        read() {
            console.log("Ler os customer usando a API...");
        },

        select(customer) {
            customer.selected = !customer.selected;
            console.log(customer.name + " " + customer.lastName + " = " + customer.selected);
            this.count();
            this.setSelectedCustomer(customer);
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

            this.toastMessageText = "Clientes atualizados com sucesso.";
            this.toastHeaderText = "Sucesso";
            this.toastHeaderIcon = "#upload";
            this.toastHeaderBgColor = "bg-success";
            this.toastHeaderTextColor = "text-white";
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
            for (var i = 0; i < this.customers.length; i++) {
                element = this.customers[i];
                if (element.updated) {
                    element.updated = false;
                    element.backup = [];
                } 
            }
        },

        count() {
            this.numSelected = 0;
            this.numCreated = 0;
            this.numPendingActions = 0;
            this.numUpdated = 0;
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

                if (element.updated) {
                    if (!element.deleted) {
                        this.numUpdated++;
                    }
                }
            });

            this.numPendingActions = this.numDeleted + this.numUpdated + this.numCreated;
            console.log("selected = " + this.numSelected);
            console.log("deleted = " + this.numDeleted);
            console.log("created = " + this.numCreated);
            console.log("updated = " + this.numUpdated);
            console.log("pending = " + this.numPendingActions);
        },

        setDarkMode() {
            this.darkMode = true;
            this.selectedTheme = [ 'bg-dark', 'text-white'];
            this.tableTheme = ['table-dark'];
            this.buttonTheme = ['btn-dark'];
            console.log('this.darkMode ' +  this.darkMode);
        },
        
        setLightMode() {
            this.darkMode = false;
            this.selectedTheme = [ 'bg-white', 'text-black'];
            this.tableTheme = ['table-light'];
            this.buttonTheme = [''];
            console.log('this.darkMode ' +  this.darkMode);
        },
    },
}

const app = Vue.createApp(myApp);

app.component('create-customer', createCustomer);
app.component('update-customer', updateCustomer);
app.component('toggle-dark-mode', toggleDarkMode);
app.component('toast', toast);

