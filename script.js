/* =========================================
   MENÚ RESPONSIVE
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});


/* Cerrar menú al seleccionar una opción */

const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});


/* =========================================
   BOTÓN VOLVER ARRIBA
========================================= */

const btnTop = document.getElementById("btnTop");


window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        btnTop.classList.add("show");

    } else {

        btnTop.classList.remove("show");

    }

});


btnTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   ELEMENTOS DEL FORMULARIO
========================================= */

const form = document.getElementById("contactForm");

const nombre = document.getElementById("nombre");

const email = document.getElementById("email");

const telefono = document.getElementById("telefono");

const mensaje = document.getElementById("mensaje");

const successMessage =
    document.getElementById("successMessage");


/* =========================================
   MOSTRAR ERROR
========================================= */

function mostrarError(input, error, texto) {

    input.classList.add("input-error");

    document.getElementById(error).textContent = texto;

}


/* =========================================
   QUITAR ERROR
========================================= */

function quitarError(input, error) {

    input.classList.remove("input-error");

    document.getElementById(error).textContent = "";

}


/* =========================================
   VALIDAR NOMBRE
========================================= */

function validarNombre() {

    const valor = nombre.value.trim();


    if (valor === "") {

        mostrarError(
            nombre,
            "nombreError",
            "El nombre es obligatorio."
        );

        return false;
    }


    if (valor.length < 3) {

        mostrarError(
            nombre,
            "nombreError",
            "El nombre debe tener mínimo 3 caracteres."
        );

        return false;
    }


    quitarError(nombre, "nombreError");

    return true;
}


/* =========================================
   VALIDAR CORREO
========================================= */

function validarEmail() {

    const valor = email.value.trim();

    const patron =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (valor === "") {

        mostrarError(
            email,
            "emailError",
            "El correo es obligatorio."
        );

        return false;
    }


    if (!patron.test(valor)) {

        mostrarError(
            email,
            "emailError",
            "Ingresa un correo válido."
        );

        return false;
    }


    quitarError(email, "emailError");

    return true;
}


/* =========================================
   VALIDAR TELÉFONO
========================================= */

function validarTelefono() {

    const valor = telefono.value.trim();

    const patron =
        /^[0-9]{9}$/;


    if (valor === "") {

        mostrarError(
            telefono,
            "telefonoError",
            "El teléfono es obligatorio."
        );

        return false;
    }


    if (!patron.test(valor)) {

        mostrarError(
            telefono,
            "telefonoError",
            "El teléfono debe tener 9 números."
        );

        return false;
    }


    quitarError(telefono, "telefonoError");

    return true;
}


/* =========================================
   VALIDAR MENSAJE
========================================= */

function validarMensaje() {

    const valor = mensaje.value.trim();


    if (valor === "") {

        mostrarError(
            mensaje,
            "mensajeError",
            "El mensaje es obligatorio."
        );

        return false;
    }


    if (valor.length < 10) {

        mostrarError(
            mensaje,
            "mensajeError",
            "El mensaje debe tener mínimo 10 caracteres."
        );

        return false;
    }


    quitarError(mensaje, "mensajeError");

    return true;
}


/* =========================================
   VALIDACIÓN EN TIEMPO REAL
========================================= */

nombre.addEventListener(
    "input",
    validarNombre
);

email.addEventListener(
    "input",
    validarEmail
);

telefono.addEventListener(
    "input",
    validarTelefono
);

mensaje.addEventListener(
    "input",
    validarMensaje
);


/* =========================================
   ENVIAR FORMULARIO
========================================= */

form.addEventListener("submit", function (event) {

    event.preventDefault();


    const nombreValido =
        validarNombre();

    const emailValido =
        validarEmail();

    const telefonoValido =
        validarTelefono();

    const mensajeValido =
        validarMensaje();


    /* Comprobar si todo está correcto */

    if (
        !nombreValido ||
        !emailValido ||
        !telefonoValido ||
        !mensajeValido
    ) {

        successMessage.classList.remove("show");

        return;
    }


    /* Mostrar confirmación */

    successMessage.classList.add("show");


    /* Limpiar formulario */

    form.reset();


    /* Quitar errores */

    quitarError(nombre, "nombreError");

    quitarError(email, "emailError");

    quitarError(telefono, "telefonoError");

    quitarError(mensaje, "mensajeError");


    /* Ocultar confirmación después de 5 segundos */

    setTimeout(function () {

        successMessage.classList.remove("show");

    }, 5000);

});


/* =========================================
   AÑO AUTOMÁTICO
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();
/* =========================================
   CARRITO DE COMPRAS
========================================= */

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const addCartButtons =
    document.querySelectorAll(".add-cart");

const checkoutBtn =
    document.getElementById("checkoutBtn");


let cart = [];


/* =========================================
   ABRIR CARRITO
========================================= */

cartButton.addEventListener("click", function () {

    cartPanel.classList.add("active");

});


/* =========================================
   CERRAR CARRITO
========================================= */

closeCart.addEventListener("click", function () {

    cartPanel.classList.remove("active");

});


/* =========================================
   AGREGAR PRODUCTO
========================================= */

addCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name =
            button.dataset.name;

        const price =
            Number(button.dataset.price);


        const existingProduct =
            cart.find(function (product) {

                return product.name === name;

            });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }


        updateCart();


        cartPanel.classList.add("active");

    });

});


/* =========================================
   ACTUALIZAR CARRITO
========================================= */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Tu carrito está vacío.
            </p>
        `;

    }


    let total = 0;
    let quantityTotal = 0;


    cart.forEach(function (product, index) {

        const subtotal =
            product.price * product.quantity;


        total += subtotal;

        quantityTotal += product.quantity;


        const item =
            document.createElement("div");


        item.classList.add("cart-product");


        item.innerHTML = `

            <div class="cart-product-info">

                <h4>
                    ${product.name}
                </h4>

                <span>
                    S/ ${subtotal.toFixed(2)}
                </span>

            </div>


            <div class="quantity-controls">

                <button
                    onclick="changeQuantity(${index}, -1)">
                    −
                </button>

                <span>
                    ${product.quantity}
                </span>

                <button
                    onclick="changeQuantity(${index}, 1)">
                    +
                </button>

            </div>

        `;


        cartItems.appendChild(item);

    });


    cartCount.textContent =
        quantityTotal;


    cartTotal.textContent =
        `S/ ${total.toFixed(2)}`;

}


/* =========================================
   CAMBIAR CANTIDAD
========================================= */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* =========================================
   COMPRAR
========================================= */

checkoutBtn.addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Tu carrito está vacío.");

        return;

    }


    let message =
        "Hola, quiero comprar:%0A%0A";


    cart.forEach(function (product) {

        message +=
            `• ${product.name} x${product.quantity} - S/ ${(product.price * product.quantity).toFixed(2)}%0A`;

    });


    let total = cart.reduce(
        function (sum, product) {

            return sum +
                product.price *
                product.quantity;

        },
        0
    );


    message +=
        `%0ATotal: S/ ${total.toFixed(2)}`;


    const phone =
        "51929794235";


    const whatsapp =
        `https://wa.me/${phone}?text=${message}`;


    window.open(
        whatsapp,
        "_blank"
    );

});