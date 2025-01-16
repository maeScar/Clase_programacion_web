
//stock disminuya

//descuento por Categoria

//Crear una propiedad categoria en la clase producto

//los productos de la categoria Electronica deben tener un descuento del 10% o calcular el total de su venta

//Implementar un metodo calcularImpuesto()

//listar productos por Precio descendente

//Asegurarse que los precios no puedan ser negativos  al establecer en al clase Producto.



// Clase Producto
class Producto {
    static contadorProductos = 0;

    constructor(nombre, precio, categoria, stock) {
        this._idProducto = ++Producto.contadorProductos;
        this._nombre = nombre;
        this._precio = precio >= 0 ? precio : 0;
        this._categoria = categoria;
        this._stock = stock >= 0 ? stock : 0;
    }

    get idProducto() {
        return this._idProducto;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(nombre) {
        this._nombre = nombre;
    }

    get precio() {
        return this._precio;
    }

    set precio(precio) {
        if (precio >= 0) {
            this._precio = precio;
        } else {
            console.error("El precio no puede ser negativo.");
        }
    }

    get categoria() {
        return this._categoria;
    }

    get stock() {
        return this._stock;
    }

    disminuirStock(cantidad) {
        if (this._stock >= cantidad) {
            this._stock -= cantidad;
        } else {
            console.error("Stock insuficiente.");
        }
    }

    calcularDescuento() {
        if (this._categoria.toLowerCase() === "electronica") {
            return this._precio * 0.1;
        }
        return 0;
    }

    toString() {
        return `idProducto: ${this._idProducto}, Nombre: ${this._nombre}, Precio: ${this._precio}, Categoría: ${this._categoria}, Stock: ${this._stock}`;
    }
}

// Clase Orden
class Orden {
    static contadorOrdenes = 0;

    constructor() {
        this._idOrden = ++Orden.contadorOrdenes;
        this.productos = [];
    }

    get idOrden() {
        return this._idOrden;
    }

    get MAX_PRODUCTOS() {
        return 5;
    }

    agregarProducto(producto) {
        if (this.productos.length < this.MAX_PRODUCTOS) {
            if (producto.stock > 0) {
                this.productos.push(producto);
                producto.disminuirStock(1);
            } else {
                console.error(`El producto ${producto.nombre} no tiene stock disponible.`);
            }
        } else {
            console.log("No se pueden agregar más productos a la orden.");
        }
    }

    calcularTotal() {
        let totalVenta = 0;
        for (const producto of this.productos) {
            totalVenta += producto.precio - producto.calcularDescuento();
        }
        return totalVenta;
    }

    calcularImpuesto() {
        const impuesto = 0.15; // 15%
        return this.calcularTotal() * impuesto;
    }

    listarProductosPorPrecio() {
        return this.productos
            .slice()
            .sort((a, b) => b.precio - a.precio)
            .map((producto) => producto.toString())
            .join("\n");
    }

    mostrarOrden() {
        let productosOrden = this.productos.map((producto) => `\n ${producto.toString()}`).join("");
        console.log(
            `Orden: ${this.idOrden}, Total: ${this.calcularTotal().toFixed(2)}, Impuesto: ${this.calcularImpuesto().toFixed(2)}, Productos: ${productosOrden}`
        );
    }
}


let producto1 = new Producto("Camisa", 100, "Ropa", 10);
let producto2 = new Producto("Pantalón", 200, "Ropa", 5);
let producto3 = new Producto("Celular", 500, "Electrónica", 3);
let producto4 = new Producto("Computadora", 1000, "Electrónica", 2);
let producto5 = new Producto("Monitor",-10, "Electrónica", 4);

let orden1 = new Orden();
orden1.agregarProducto(producto1);
orden1.agregarProducto(producto2);
orden1.agregarProducto(producto3);
orden1.mostrarOrden();

let orden2 = new Orden();
orden2.agregarProducto(producto4);
orden2.agregarProducto(producto1);
orden2.agregarProducto(producto2);
orden2.agregarProducto(producto3);
orden2.agregarProducto(producto4);
orden2.agregarProducto(producto1);
orden2.mostrarOrden();

console.log("\nOrdenes:");
console.log(orden1);
console.log(orden2);


console.log("\nProductos por precio descendente:");
console.log(orden1.listarProductosPorPrecio());

console.log("\nTotal Venta:", orden1.calcularTotal()+"\nImpuesto:", orden1.calcularImpuesto()+"\nTotal a Pagar:", orden1.calcularTotal()+orden1.calcularImpuesto());
console.log("\nTotal Venta:", orden2.calcularTotal()+"\nImpuesto:", orden2.calcularImpuesto()+"\nTotal a Pagar:", orden2.calcularTotal()+orden2.calcularImpuesto());