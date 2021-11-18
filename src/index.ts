
interface Cuentas {
    titular: string,
    accountNumber: string,
    saldo: number
}

class Sucursal {
    private Cuenta: Cuentas;

    constructor(titular: string, accountNumber: string, saldo: number) {
        this.Cuenta = {
            titular: titular,
            accountNumber: accountNumber,
            saldo: saldo
        }
    }

    Depositar(valor: number): number {
        let newSaldo: number;
        newSaldo = this.Cuenta.saldo + valor;
        this.Cuenta.saldo = newSaldo;
        return newSaldo;
    }

    Retirar(valor: number): number {
        let newSaldo: number;
        newSaldo = this.Cuenta.saldo - valor;
        this.Cuenta.saldo = newSaldo;
        return newSaldo;
    }

    getCuentaInfo(): Cuentas {
        return this.Cuenta;
    }

    existo(nombreTitular: string, numeroCuenta: string): boolean {
        if (nombreTitular === this.Cuenta.titular && numeroCuenta === this.Cuenta.accountNumber) {
            return true;
        }
        else {
            return false;
        }
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    var createButton = document.getElementById("createAccount");

    var depositarButton: NodeListOf<Element> | Element[] | any;
    var retirarButton: NodeListOf<Element> | Element[] | any;
    var transferirButton: NodeListOf<Element> | Element[] | any;
    /* CUENTAS DE EJEMPLO - SE PUEDEN CREAR MAS DESDE EL BOTON DE CREAR */
    const Account1 = new Sucursal("Juan David", "1234567", 10500);
    const Account2 = new Sucursal("Pepito Perez", "7894561", 52700);

    var cuentasExistente: Sucursal[] = [Account1, Account2];

    function eliminarEventListener(): void {
        depositarButton.forEach((Dbutton: any) => { Dbutton?.removeEventListener('click', depositar); });
        retirarButton.forEach((Rbutton: any) => { Rbutton?.removeEventListener('click', retirar); });
        transferirButton.forEach((Tbutton: any) => { Tbutton?.removeEventListener('click', transferir); });
    }

    function generateListeners(): void {
        eliminarEventListener();
        depositarButton.forEach((Dbutton: any) => {
            Dbutton?.addEventListener('click', depositar);
        });

        retirarButton.forEach((Rbutton: any) => {
            Rbutton?.addEventListener('click', retirar);
        });

        transferirButton.forEach((Tbutton: any) => {
            Tbutton?.addEventListener('click', transferir);
        });
    }

    function init(): void {
        var AccountsContainer: any = document.getElementById("Accounts");
        AccountsContainer.innerHTML = "";
        var DomElement: string;
        cuentasExistente.forEach(cuenta => {
            DomElement = `
                <div id="Account_${cuenta.getCuentaInfo().accountNumber}" class="col-12 col-lg-6 col-xl-4 my-4">
                    <div class="card">
                        <div class="card-body">

                        <div class="row">
                            <div class="col-12">
                            <h4 class="mb-3 d-inline-block mx-1">${cuenta.getCuentaInfo().titular}</h4>
                            <h5 class="mb-3 mt-xl-1 d-inline-block float-end mx-1">${cuenta.getCuentaInfo().accountNumber}</h5>
                            </div>
                        </div>

                        <div class="card mb-3">
                            <div class="card-body">
                            <h4 class="d-inline-block m-0">SALDO: </h4>
                            <p class="d-inline-block m-0 fs-4">$ ${cuenta.getCuentaInfo().saldo}</p>
                            </div>
                        </div>

                        <form id="AccountActions">
                            <div class="row g-3">
                            <div class="col-sm-6">
                                <label for="depositar" class="form-label">Dinero a depositar</label>
                                <input type="number" data-account="${cuenta.getCuentaInfo().accountNumber}" class="form-control" id="depositar" placeholder="100" value="" min="0">
                                <button id="depositarButton" data-account="${cuenta.getCuentaInfo().accountNumber}" class="w-100 btn btn-success my-3" type="button">Depositar</button>
                            </div>
                            <div class="col-sm-6">
                                <label for="retirar" class="form-label">Dinero a retirar</label>
                                <input type="number" data-account="${cuenta.getCuentaInfo().accountNumber}" class="form-control" id="retirar" placeholder="100" value="" min="0">
                                <button id="retirarButton" data-account="${cuenta.getCuentaInfo().accountNumber}" class="w-100 btn btn-warning my-3" type="button">Retirar</button>
                            </div>
                            <hr class="my-1">
                            <div class="col-12">
                                <label for="transferir" class="form-label">Dinero a transferir</label>
                                <input data-account="${cuenta.getCuentaInfo().accountNumber}" type="number" class="form-control" id="transferir" placeholder="100" min="0">
                            </div>
                            <div class="col-12">
                                <label for="titular" class="form-label">Nombre titular de cuenta a transferir</label>
                                <input data-account="${cuenta.getCuentaInfo().accountNumber}" type="text" class="form-control" id="titular" placeholder="pepito perez" value="">
                            </div>
                            <div class="col-12">
                                <label for="numeroCuenta" class="form-label">Numero de cuenta a transferir</label>
                                <input data-account="${cuenta.getCuentaInfo().accountNumber}" type="text" class="form-control" id="numeroCuenta" placeholder="123456789" value="">
                            </div>
                            </div>
                            <button id="transferirButton" data-account="${cuenta.getCuentaInfo().accountNumber}" class="w-100 btn btn-primary mt-3" type="button">Transferir</button>
                        </form>

                        </div>
                    </div>
                </div>
            `
            if (AccountsContainer) {
                AccountsContainer.innerHTML += DomElement
            }
            else {
                return false
            }
        });
        var Daux: any = document.querySelectorAll('[id=depositarButton]');
        var Raux: any = document.querySelectorAll('[id=retirarButton]');
        var Taux: any = document.querySelectorAll('[id=transferirButton]');

        depositarButton = [...Daux];
        retirarButton = [...Raux];
        transferirButton = [...Taux];
        generateListeners();
    }

    createButton?.addEventListener('click', (event) => {
        let titular: any = document.getElementById("NewTitular");
        let saldo: any = document.getElementById("SaldoInicial");
        let AccountNumber: number = Math.floor(Math.random() * 900000) + 100000;
        if (titular.value !== "" && saldo.value !== "") {
            const Account = new Sucursal(titular.value, AccountNumber.toString(), parseInt(saldo.value));
            cuentasExistente.push(Account);
            init();
        }
        else {
            alert("Todos Los campos para crear una cuenta son requeridos");
        }
    })

    function depositar(event: any): void {
        var input: any = document.querySelector('div#Account_' + event.target.getAttribute('data-account') + " input#depositar");
        var accountNumber: string = input.getAttribute('data-account');
        var value: string = input.value;
        if (value !== "") {
            cuentasExistente.forEach(Element => {
                if (Element.getCuentaInfo().accountNumber === accountNumber) {
                    Element.Depositar(parseInt(value));
                    init();
                }
            })
        }
        else {
            alert("el valor a depositar es requerido");
        }
    }

    function retirar(event: any): void {
        var input: any = document.querySelector('div#Account_' + event.target.getAttribute('data-account') + " input#retirar");
        var accountNumber: string = input.getAttribute('data-account');
        var value: string = input.value;
        if (value !== "") {
            cuentasExistente.forEach(Element => {
                if (Element.getCuentaInfo().accountNumber === accountNumber) {
                    Element.Retirar(parseInt(value));
                    init();
                }
            })
        }
        else {
            alert("el valor a retirar es requerido");
        }
    }

    function transferir(event: any): void {
        var inputName: any = document.querySelector('div#Account_' + event.target.getAttribute('data-account') + " input#titular");
        var inputNumber: any = document.querySelector('div#Account_' + event.target.getAttribute('data-account') + " input#numeroCuenta");
        var inputSaldo: any = document.querySelector('div#Account_' + event.target.getAttribute('data-account') + " input#transferir");

        let FromAccountNumber: any = event.target.getAttribute('data-account');
        let FromAccount:any = cuentasExistente.filter(cuenta=> cuenta.getCuentaInfo().accountNumber===FromAccountNumber)[0];
        let TitularNombre:string = inputName.value;
        let AccountNumberTo:string = inputNumber.value;
        let SaldoTo:string = inputSaldo.value;
        if(TitularNombre !== "" && AccountNumberTo !== "" && SaldoTo !== ""){
            transferirAction(FromAccount, TitularNombre, AccountNumberTo, parseInt(SaldoTo));
        }
        else{
            alert("Los Campos de la transferencia son requeridos");
        }
    }

    function transferirAction(from: Sucursal, toTitular: string, toNumber: string, valor: number): void {
        let doesntExist: boolean = false;
        let theSame: boolean = false;
        for (var cuenta of cuentasExistente) {
            if (cuenta.existo(toTitular, toNumber)) {
                if (from === cuenta) {
                    cuenta.Retirar(valor);
                    cuenta.Depositar(valor);
                    alert("Te transferiste a ti mismo :v");
                    theSame = true;
                }
                else {
                    from.Retirar(valor);
                    cuenta.Depositar(valor);
                    alert("Transferencia Exitosa");
                }
                doesntExist = true;
                break;
            }
            else {
                doesntExist = false;
            }
        }
        if(!doesntExist){
            alert("la cuenta a donde quieres tranferir no existe - Transferencia Fallida");
        }
        init();
    }

    init();
});