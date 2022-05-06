import { useEffect, useState } from "react";
import './Chat.scss'
import { io } from 'socket.io-client'


export const Chat = () => {
    const [chats, setChats] = useState('')

    useEffect(() => {
        const socket = io('http://localhost:8080')
        socket.on('sendMessages', (data) => setChats(data))
    }, [])

    function addMessage(e) {
        const socket = io('http://localhost:8080')
        e.preventDefault()
        socket.emit('sendNewChat', { author: e.target[0].value, text: e.target[1].value })
    }

    return (
        <div className="row col-11 col-lg-6 justify-content-center mt-5 mb-5">
            <h2 className="text-center col-12">Centro de mensajes</h2>
            <div className="row col-12 justify-content-center pt-3 divChat">
                <form onSubmit={addMessage} className="mb-3">
                    <div className="container row justify-content-start mb-3">
                        <input className='col-8' type="mail" name="mail" id="mailAuthor" placeholder="e-mail" />
                    </div>
                    <div className="row justify-content-around">
                        <div className="col-12"><label htmlFor="message">Mensaje</label></div>
                        <textarea className="col-8 pb-5" type="text" name="message" id="message" placeholder="Be nice" />
                        <button className="col-3 btn btn-success" id="send" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
            <div className="row col-12 justify-content-center mt-3">
                {chats.length > 0 ? chats.map((chat) => (
                    <div key={chat._id} className="col-12 row justify-content-center mb-3">
                        <div className="col-8 col-md-3 text-center"><img className="img-avatar" src={chat.author.avatar} alt="" /></div>
                        <div className="col-8 col-md-3 text-center">{chat.author.nombre}</div>
                        <div className="col-8 col-md-3 text-center">{chat.created_at}</div>
                        <div className="col-8 col-md-3 text-center">{chat.text}</div>
                    </div>
                )) : null}
            </div>
        </div>
    );
};

