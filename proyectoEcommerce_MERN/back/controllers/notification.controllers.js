import sendMailGmail from '../utils/nodemailer.js';
import { sendSMS, sendWhatsApp } from '../utils/twilio.js';
import dotenv from 'dotenv';
dotenv.config();


//const MAIL_ADMIN = process.env.ADMIN_GMAIL;
//const WS_ADMIN = process.env.WS_ADMIN;


const mailNuevoUsuario = (user) => {
    let html = `
    <h1>Se a Registrado un Nuevo Usuario en la WEB</h1>
    <br>
    <ul>
        <li>Nombre: ${user.firstName}</li>
        <li>Apellido: ${user.lastName}</li>
        <li>Domicilio: ${user.direction}</li>
        <li>E-Mail: ${user.email}</li>
        <li>Télefono: ${user.prefix}-${user.phone}</li>
    </ul>
    `;
    sendMailGmail('Nuevo Registro de Usuario', html)
}


const mailNuevaVenta = (orden, user) => {
    let html = `
        <h1>Se ha registrado una nueva orden</h1>
        <br>
        <h5>Datos del Cliente</h5>
        <ul>
            <li>Nombre: ${user.firstName}</li>
            <li>Apellido: ${user.lastName}</li>
            <li>Domicilio: ${user.direction}</li>
            <li>E-Mail: ${user.email}</li>
        </ul>
        <br>
        <h5>Datos de la Venta</h5>
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${orden.products.map(product => {
                    return `
                        <tr>
                            <td>${product.nombre}</td>
                            <td>${product.quantity}</td>
                            <td>${product.precio}</td>
                            <td>${product.total}</td>
                        </tr>
                    `;
                })}
            </tbody>
        </table>
    `;
    sendMailGmail(`Nuevo Pedido de ${orden.user}`, html)
}

const wpNuevaVenta = (orden) => {
    sendWhatsApp( `Nuevo Pedido: ${orden._id} de ${orden.user}`)
}

const smsNuevaVenta = (orden, user) => {
    const fecha = new Date();
    const body = `
        Hola! Tu pedido con ID ${orden._id}
        a nombre de ${user.firstName} ${user.lastName}  - Mail: ${user.email}
        de fecha ${fecha.toLocaleDateString()}
        Se encuentra registrado y en proceso de preparación.
        Nos comunicaremos cuando esté listo.
        Gracias por su compra!
    `;
    const tel = `${user.prefix}${user.phone}`;
    sendSMS( body, tel)
}

export { mailNuevaVenta, mailNuevoUsuario, wpNuevaVenta, smsNuevaVenta };