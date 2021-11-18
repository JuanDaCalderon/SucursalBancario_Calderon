var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Sucursal = /** @class */ (function () {
    function Sucursal(titular, accountNumber, saldo) {
        this.Cuenta = {
            titular: titular,
            accountNumber: accountNumber,
            saldo: saldo
        };
    }
    Sucursal.prototype.Depositar = function (valor) {
        var newSaldo;
        newSaldo = this.Cuenta.saldo + valor;
        this.Cuenta.saldo = newSaldo;
        return newSaldo;
    };
    Sucursal.prototype.Retirar = function (valor) {
        var newSaldo;
        newSaldo = this.Cuenta.saldo - valor;
        this.Cuenta.saldo = newSaldo;
        return newSaldo;
    };
    Sucursal.prototype.getCuentaInfo = function () {
        return this.Cuenta;
    };
    Sucursal.prototype.existo = function (nombreTitular, numeroCuenta) {
        if (nombreTitular === this.Cuenta.titular && numeroCuenta === this.Cuenta.accountNumber) {
            return true;
        }
        else {
            return false;
        }
    };
    return Sucursal;
}());
window.addEventListener('DOMContentLoaded', function (event) {
    var createButton = document.getElementById("createAccount");
    var depositarButton;
    var retirarButton;
    var transferirButton;
    /* CUENTAS DE EJEMPLO - SE PUEDEN CREAR MAS DESDE EL BOTON DE CREAR */
    var Account1 = new Sucursal("Juan David", "1234567", 10500);
    var Account2 = new Sucursal("Pepito Perez", "7894561", 52700);
    var cuentasExistente = [Account1, Account2];
    function eliminarEventListener() {
        depositarButton.forEach(function (Dbutton) { Dbutton === null || Dbutton === void 0 ? void 0 : Dbutton.removeEventListener('click', depositar); });
        retirarButton.forEach(function (Rbutton) { Rbutton === null || Rbutton === void 0 ? void 0 : Rbutton.removeEventListener('click', retirar); });
        transferirButton.forEach(function (Tbutton) { Tbutton === null || Tbutton === void 0 ? void 0 : Tbutton.removeEventListener('click', transferir); });
    }
    function generateListeners() {
        eliminarEventListener();
        depositarButton.forEach(function (Dbutton) {
            Dbutton === null || Dbutton === void 0 ? void 0 : Dbutton.addEventListener('click', depositar);
        });
        retirarButton.forEach(function (Rbutton) {
            Rbutton === null || Rbutton === void 0 ? void 0 : Rbutton.addEventListener('click', retirar);
        });
        transferirButton.forEach(function (Tbutton) {
            Tbutton === null || Tbutton === void 0 ? void 0 : Tbutton.addEventListener('click', transferir);
        });
    }
    function init() {
        var AccountsContainer = document.getElementById("Accounts");
        AccountsContainer.innerHTML = "";
        var DomElement;
        cuentasExistente.forEach(function (cuenta) {
            DomElement = "\n                <div id=\"Account_".concat(cuenta.getCuentaInfo().accountNumber, "\" class=\"col-12 col-lg-6 col-xl-4 my-4\">\n                    <div class=\"card\">\n                        <div class=\"card-body\">\n\n                        <div class=\"row\">\n                            <div class=\"col-12\">\n                            <h4 class=\"mb-3 d-inline-block mx-1\">").concat(cuenta.getCuentaInfo().titular, "</h4>\n                            <h5 class=\"mb-3 mt-xl-1 d-inline-block float-end mx-1\">").concat(cuenta.getCuentaInfo().accountNumber, "</h5>\n                            </div>\n                        </div>\n\n                        <div class=\"card mb-3\">\n                            <div class=\"card-body\">\n                            <h4 class=\"d-inline-block m-0\">SALDO: </h4>\n                            <p class=\"d-inline-block m-0 fs-4\">$ ").concat(cuenta.getCuentaInfo().saldo, "</p>\n                            </div>\n                        </div>\n\n                        <form id=\"AccountActions\">\n                            <div class=\"row g-3\">\n                            <div class=\"col-sm-6\">\n                                <label for=\"depositar\" class=\"form-label\">Dinero a depositar</label>\n                                <input type=\"number\" data-account=\"").concat(cuenta.getCuentaInfo().accountNumber, "\" class=\"form-control\" id=\"depositar\" placeholder=\"100\" value=\"\" min=\"0\">\n                                <button id=\"depositarButton\" data-account=\"").concat(cuenta.getCuentaInfo().accountNumber, "\" class=\"w-100 btn btn-success my-3\" type=\"button\">Depositar</button>\n                            </div>\n                            <div class=\"col-sm-6\">\n                                <label for=\"retirar\" class=\"form-label\">Dinero a retirar</label>\n                                <input type=\"number\" data-account=\"").concat(cuenta.getCuentaInfo().accountNumber, "\" class=\"form-control\" id=\"retirar\" placeholder=\"100\" value=\"\" min=\"0\">\n                                <button id=\"retirarButton\" data-account=\"").concat(cuenta.getCuentaInfo().accountNumber, "\" class=\"w-100 btn btn-warning my-3\" type=\"button\">Retirar</button>\n                            </div>\n                            <hr class=\"my-1\">\n                            <div class=\"col-12\">\n                                <label for=\"transferir\" class=\"form-label\">Dinero a transferir</label>\n                                <input data-account=\"").concat(cuenta.getCuentaInfo().accountNumber, "\" type=\"number\" class=\"form-control\" id=\"transferir\" placeholder=\"100\" min=\"0\">\n                            </div>\n                            <div class=\"col-12\">\n                                <label for=\"titular\" class=\"form-label\">Nombre titular de cuenta a transferir</label>\n                                <input data-account=\"").concat(cuenta.getCuentaInfo().accountNumber, "\" type=\"text\" class=\"form-control\" id=\"titular\" placeholder=\"pepito perez\" value=\"\">\n                            </div>\n                            <div class=\"col-12\">\n                                <label for=\"numeroCuenta\" class=\"form-label\">Numero de cuenta a transferir</label>\n                                <input data-account=\"").concat(cuenta.getCuentaInfo().accountNumber, "\" type=\"text\" class=\"form-control\" id=\"numeroCuenta\" placeholder=\"123456789\" value=\"\">\n                            </div>\n                            </div>\n                            <button id=\"transferirButton\" data-account=\"").concat(cuenta.getCuentaInfo().accountNumber, "\" class=\"w-100 btn btn-primary mt-3\" type=\"button\">Transferir</button>\n                        </form>\n\n                        </div>\n                    </div>\n                </div>\n            ");
            if (AccountsContainer) {
                AccountsContainer.innerHTML += DomElement;
            }
            else {
                return false;
            }
        });
        var Daux = document.querySelectorAll('[id=depositarButton]');
        var Raux = document.querySelectorAll('[id=retirarButton]');
        var Taux = document.querySelectorAll('[id=transferirButton]');
        depositarButton = __spreadArray([], Daux, true);
        retirarButton = __spreadArray([], Raux, true);
        transferirButton = __spreadArray([], Taux, true);
        generateListeners();
    }
    createButton === null || createButton === void 0 ? void 0 : createButton.addEventListener('click', function (event) {
        var titular = document.getElementById("NewTitular");
        var saldo = document.getElementById("SaldoInicial");
        var AccountNumber = Math.floor(Math.random() * 900000) + 100000;
        if (titular.value !== "" && saldo.value !== "") {
            var Account = new Sucursal(titular.value, AccountNumber.toString(), parseInt(saldo.value));
            cuentasExistente.push(Account);
            init();
        }
        else {
            alert("Todos Los campos para crear una cuenta son requeridos");
        }
    });
    function depositar(event) {
        var input = document.querySelector('div#Account_' + event.target.getAttribute('data-account') + " input#depositar");
        var accountNumber = input.getAttribute('data-account');
        var value = input.value;
        if (value !== "") {
            cuentasExistente.forEach(function (Element) {
                if (Element.getCuentaInfo().accountNumber === accountNumber) {
                    Element.Depositar(parseInt(value));
                    init();
                }
            });
        }
        else {
            alert("el valor a depositar es requerido");
        }
    }
    function retirar(event) {
        var input = document.querySelector('div#Account_' + event.target.getAttribute('data-account') + " input#retirar");
        var accountNumber = input.getAttribute('data-account');
        var value = input.value;
        if (value !== "") {
            cuentasExistente.forEach(function (Element) {
                if (Element.getCuentaInfo().accountNumber === accountNumber) {
                    Element.Retirar(parseInt(value));
                    init();
                }
            });
        }
        else {
            alert("el valor a retirar es requerido");
        }
    }
    function transferir(event) {
        var inputName = document.querySelector('div#Account_' + event.target.getAttribute('data-account') + " input#titular");
        var inputNumber = document.querySelector('div#Account_' + event.target.getAttribute('data-account') + " input#numeroCuenta");
        var inputSaldo = document.querySelector('div#Account_' + event.target.getAttribute('data-account') + " input#transferir");
        var FromAccountNumber = event.target.getAttribute('data-account');
        var FromAccount = cuentasExistente.filter(function (cuenta) { return cuenta.getCuentaInfo().accountNumber === FromAccountNumber; })[0];
        var TitularNombre = inputName.value;
        var AccountNumberTo = inputNumber.value;
        var SaldoTo = inputSaldo.value;
        if (TitularNombre !== "" && AccountNumberTo !== "" && SaldoTo !== "") {
            transferirAction(FromAccount, TitularNombre, AccountNumberTo, parseInt(SaldoTo));
        }
        else {
            alert("Los Campos de la transferencia son requeridos");
        }
    }
    function transferirAction(from, toTitular, toNumber, valor) {
        var doesntExist = false;
        var theSame = false;
        for (var _i = 0, cuentasExistente_1 = cuentasExistente; _i < cuentasExistente_1.length; _i++) {
            var cuenta = cuentasExistente_1[_i];
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
        if (!doesntExist) {
            alert("la cuenta a donde quieres tranferir no existe - Transferencia Fallida");
        }
        init();
    }
    init();
});
