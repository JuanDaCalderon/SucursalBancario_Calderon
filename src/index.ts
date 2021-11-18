
interface Corresponsal {
    titular: string,
    numeroCuenta: string,
    saldo: number
}

class Cuenta {
    private cuenta: Corresponsal;

    constructor(titular: string, numeroCuenta: string, saldo: number) {
        this.cuenta = {
            titular: titular,
            numeroCuenta: numeroCuenta,
            saldo: saldo
        }
    }

    depositar(valor: number): number {
        let saldoNuevo: number;
        saldoNuevo = this.cuenta.saldo + valor;
        this.cuenta.saldo = saldoNuevo;
        return saldoNuevo;
    }

    retirar(valor: number): number {
        let saldoNuevo: number;
        saldoNuevo = this.cuenta.saldo - valor;
        this.cuenta.saldo = saldoNuevo;
        return saldoNuevo;
    }

    getCuentaInfo(): Corresponsal {
        return this.cuenta;
    }

    existo(nombreTitular: string, numeroCuenta: string): boolean {
        if (nombreTitular === this.cuenta.titular && numeroCuenta === this.cuenta.numeroCuenta) {
            return true;
        }
        else {
            return false;
        }
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    var crearButton = document.getElementById("createAccount");

    var depositarButton: NodeListOf<Element> | Element[] | any;
    var retirarButton: NodeListOf<Element> | Element[] | any;
    var transferirButton: NodeListOf<Element> | Element[] | any;
    /* CUENTAS DE EJEMPLO - SE PUEDEN CREAR MAS DESDE EL BOTON DE CREAR */
    const cuenta1 = new Cuenta("Juan David", "1234567", 10500);
    const cuenta2 = new Cuenta("Pepito Perez", "7894561", 52700);

    var cuentasExistente: Cuenta[] = [cuenta1, cuenta2];

    function eliminarEventListener(): void {
        depositarButton.forEach((Dbutton: any) => { Dbutton?.removeEventListener('click', depositar); });
        retirarButton.forEach((Rbutton: any) => { Rbutton?.removeEventListener('click', retirar); });
        transferirButton.forEach((Tbutton: any) => { Tbutton?.removeEventListener('click', transferir); });
    }

    function generarListeners(): void {
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
        var cuentasContainer: any = document.getElementById("Accounts");
        cuentasContainer.innerHTML = "";
        var elementoDom: string;
        cuentasExistente.forEach(cuenta => {
            elementoDom = `
                <div id="Account_${cuenta.getCuentaInfo().numeroCuenta}" class="col-12 col-lg-6 col-xl-4 my-4">
                    <div class="card">
                        <div class="card-body">

                        <div class="row">
                            <div class="col-12">
                            <h4 class="mb-3 d-inline-block mx-1">${cuenta.getCuentaInfo().titular}</h4>
                            <h5 class="mb-3 mt-xl-1 d-inline-block float-end mx-1">${cuenta.getCuentaInfo().numeroCuenta}</h5>
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
                                <input type="number" data-account="${cuenta.getCuentaInfo().numeroCuenta}" class="form-control" id="depositar" placeholder="100" value="" min="0">
                                <button id="depositarButton" data-account="${cuenta.getCuentaInfo().numeroCuenta}" class="w-100 btn btn-success my-3" type="button">Depositar</button>
                            </div>
                            <div class="col-sm-6">
                                <label for="retirar" class="form-label">Dinero a retirar</label>
                                <input type="number" data-account="${cuenta.getCuentaInfo().numeroCuenta}" class="form-control" id="retirar" placeholder="100" value="" min="0">
                                <button id="retirarButton" data-account="${cuenta.getCuentaInfo().numeroCuenta}" class="w-100 btn btn-warning my-3" type="button">Retirar</button>
                            </div>
                            <hr class="my-1">
                            <div class="col-12">
                                <label for="transferir" class="form-label">Dinero a transferir</label>
                                <input data-account="${cuenta.getCuentaInfo().numeroCuenta}" type="number" class="form-control" id="transferir" placeholder="100" min="0">
                            </div>
                            <div class="col-12">
                                <label for="titular" class="form-label">Nombre titular de cuenta a transferir</label>
                                <input data-account="${cuenta.getCuentaInfo().numeroCuenta}" type="text" class="form-control" id="titular" placeholder="pepito perez" value="">
                            </div>
                            <div class="col-12">
                                <label for="numeroCuenta" class="form-label">Numero de cuenta a transferir</label>
                                <input data-account="${cuenta.getCuentaInfo().numeroCuenta}" type="text" class="form-control" id="numeroCuenta" placeholder="123456789" value="">
                            </div>
                            </div>
                            <button id="transferirButton" data-account="${cuenta.getCuentaInfo().numeroCuenta}" class="w-100 btn btn-primary mt-3" type="button">Transferir</button>
                        </form>

                        </div>
                    </div>
                </div>
            `
            if (cuentasContainer) {
                cuentasContainer.innerHTML += elementoDom
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
        generarListeners();
    }

    crearButton?.addEventListener('click', (event) => {
        let titular: any = document.getElementById("NewTitular");
        let saldo: any = document.getElementById("SaldoInicial");
        let numeroCuenta: number = Math.floor(Math.random() * 900000) + 100000;
        if (titular.value !== "" && saldo.value !== "") {
            const cuenta = new Cuenta(titular.value, numeroCuenta.toString(), parseInt(saldo.value));
            cuentasExistente.push(cuenta);
            init();
        }
        else {
            alert("Todos Los campos para crear una cuenta son requeridos");
        }
    })

    function depositar(event: any): void {
        var input: any = document.querySelector('div#Account_' + event.target.getAttribute('data-account') + " input#depositar");
        var numeroCuenta: string = input.getAttribute('data-account');
        var valor: string = input.value;
        if (valor !== "") {
            cuentasExistente.forEach(Element => {
                if (Element.getCuentaInfo().numeroCuenta === numeroCuenta) {
                    Element.depositar(parseInt(valor));
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
        var numeroCuenta: string = input.getAttribute('data-account');
        var valor: string = input.value;
        if (valor !== "") {
            cuentasExistente.forEach(Element => {
                if (Element.getCuentaInfo().numeroCuenta === numeroCuenta) {
                    Element.retirar(parseInt(valor));
                    init();
                }
            })
        }
        else {
            alert("el valor a retirar es requerido");
        }
    }

    function transferir(event: any): void {
        var inputNombre: any = document.querySelector('div#Account_' + event.target.getAttribute('data-account') + " input#titular");
        var inputNumero: any = document.querySelector('div#Account_' + event.target.getAttribute('data-account') + " input#numeroCuenta");
        var inputSaldo: any = document.querySelector('div#Account_' + event.target.getAttribute('data-account') + " input#transferir");

        let fromNumeroCuenta: any = event.target.getAttribute('data-account');
        let fromCuenta:any = cuentasExistente.filter(cuenta=> cuenta.getCuentaInfo().numeroCuenta===fromNumeroCuenta)[0];
        let titularNombreTo:string = inputNombre.value;
        let numeroCuentaTo:string = inputNumero.value;
        let saldoTo:string = inputSaldo.value;
        if(titularNombreTo !== "" && numeroCuentaTo !== "" && saldoTo !== ""){
            accionTransferir(fromCuenta, titularNombreTo, numeroCuentaTo, parseInt(saldoTo));
        }
        else{
            alert("Los Campos de la transferencia son requeridos");
        }
    }

    function accionTransferir(fromCuenta: Cuenta, toTitular: string, toNumero: string, valor: number): void {
        let existe: boolean = false;
        for (var cuenta of cuentasExistente) {
            if (cuenta.existo(toTitular, toNumero)) {
                if (fromCuenta === cuenta) {
                    cuenta.retirar(valor);
                    cuenta.depositar(valor);
                    alert("Te transferiste a ti mismo :v");
                }
                else {
                    fromCuenta.retirar(valor);
                    cuenta.depositar(valor);
                    alert("Transferencia Exitosa");
                }
                existe = true;
                break;
            }
            else {
                existe = false;
            }
        }
        if(!existe){
            alert("la cuenta a donde quieres tranferir no existe - Transferencia Fallida");
        }
        init();
    }

    init();
});