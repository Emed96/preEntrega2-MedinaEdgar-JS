class Usuarios{
    constructor(usuario, password){
        this.usuario = usuario;
        this.password = password;
    }
}

class Producto{
    constructor(nom, descrip, precio, stock){
        this.nom = nom;
        this.descrip = descrip;
        this.precio = precio;
        this.stock = stock;
    }

    addStock(cantidad){
        this.stock += cantidad;
    }

    comprados(cantidad){
        this.stock -= cantidad;
    }
}

let u = [
    new Usuarios("admin", "admin123") // Credenciales de Administrador
];

let p = [
    new Producto("Termo", "Termo para bebidas frias o calientes", 195.00, 100),
    new Producto("Vaso Fiesta", "Vaso con tapa de chupon para fiestas", 50.00, 100),
    new Producto("Vaso Cafe", "Vaso para cafe", 120.00, 100),
    new Producto("Caja Regalo", "Caja con tapa personalizada", 250.00, 150)
];

function Comprar(){
    let opcion;
    let cantidad;
    let monto = 0;
    let termino = true;

    opcion = parseInt(prompt(`Que producto desea comprar?\n\n${consulta()}`)) - 1;

    do {    
        if (opcion >= 0 && opcion < p.length && p[opcion].stock > 0){
            cantidad = parseInt(prompt("Introduzca una cantidad: "));
            if (cantidad <= p[opcion].stock){
                p[opcion].comprados(cantidad);
                monto += (p[opcion].precio * cantidad);
            }
            else{
                alert(`Productos insuficiente!\nIntente nuevamente\nCantidade de ${p[opcion].nom} en stok: ${p[opcion].stock}`);
                continue;
            }
        }
        else if (p[opcion].stock <= 0){
            alert("Producto agotado\nSera enviado al menu proncipal")
            break;
        }
        else {
            opcion = parseInt(prompt(`Ingrese un producto existente\n\n${consulta()}`));
            continue;
        }

        const tmp = parseInt(prompt("Desea añadir otro producto?\n1 - Si\n2 - No"));
        termino = tmp === 1 ? true : false;
        
        if (termino){
            opcion = parseInt(prompt(`Que producto desea comprar?\n\n${consulta()}`)) - 1;
        }

    } while (termino);

    alert(`Total a pagar: $${monto}`)
}

function menuAdministrador(opcion) {
    switch (opcion) {
        case 1: //Añadir usuario
            
            break;
    
        case 2: //Añadir producto
            
            break;
        
        case 3: //Aplicar oferta
            const descuento = parseFloat(prompt("Que porcentaje desea aplicar a los productos en dos digitos(XX): ").substring(0,2));
            p.map(prod => {
                //console.log(prod);
                prod.precio *= (1 - (descuento / 100))
                console.log(prod.precio);});
            console.log(consulta());
            break;
    
        default:
            break;
    }

    return true;
}

const consulta = () => {
    let txt = "";
    let i = 0;

    p.forEach(prod => {
        i++;
        txt += `${i} - Nombre: ${prod.nom}\nPrecio: ${prod.precio}\nStock: ${prod.stock}\n\n`;
    });

    return txt;
}

const menu = (opcion) => {
    switch (opcion) {
        case 1: //Ver productos
            alert(consulta());
            
            break;
        
        case 2: //Comprar productos
            Comprar();
            break;

        case 3: //Añadir al stock
            const op = parseInt(prompt(`Que producto añadir a stock?\n\n${consulta()}`)) - 1;
            const cantidad = parseInt(prompt("Introduzca una cantidad: "));
            p[op].addStock(cantidad);
            break;

        /*case 4: //Menu Administrador
            alert(`CREDENCIALES DE ADMINISTRADOR
                Usuario: ${u[0].usuario}
                Password: ${u[0].password}`);
            
            const usuario = prompt("Introdusca usuario: ");
            const password = prompt("Introdusca contraseña: ");

            if (u[0].usuario === usuario && u[0].password === password) {
                let termino;
                do {
                    const opcion = parseInt(prompt("Que desea hacer?\n" +
                        "   1 - Añadir usuarios\n" + 
                        "   2 - Añadir productos\n" +
                        "   3 - Aplicar oferta\n" +
                        "   4 - Salir"));
            
                    termino = opcion != 4 ? menuAdministrador(opcion) : false;
        
                } while (termino);
            }
            
            break;
*/
        default:
            alert("Ingrese una opcion correcta (1, 2, 3, 4, 5)");
            break;
    }

    return true;
};

{ //Main
    let termino;

    do {
        const opcion = parseInt(prompt("Que desea hacer?\n\n" +
        "   1 - Ver productos\n" +
        "   2 - Comprar productos\n" +
        "   3 - Añadir productos al stock\n" +
        //"   4 - Menu Administrador\n" +
        "   4 - Salir"));
        
        termino = opcion != 4 ? menu(opcion) : false;
    
    } while (termino);
    
    alert("Adios");
}
