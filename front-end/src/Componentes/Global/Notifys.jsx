// Librarys 
import React from "react"

// Imports
import { checkImage } from '../Varios/Util'

// Import styles 
import '../../styles/Global/notifys.css'

// Component 
export class Loading extends React.Component {
    constructor(props) {
        super(props)
        this.title = this.props.title || 'Cargando información...'
        this.message = this.props.message || 'Por favor espere un momento'
        this.img = 'https://github.com/Mogom/Imagenes_PetsHeaven/blob/main/Defaults/NotifyGanzo.jpg?raw=true'
        this.imgDefault = 'https://github.com/Mogom/Imagenes_PetsHeaven/blob/main/Defaults/NotifyCat.jpg?raw=true'
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <section className="LoadingNotification">
                <article className="LoadingContent">
                    <aside className="LoadingPaw">
                        {checkImage(
                            this.img,
                            'ganzo antropomorfico con traje formal negro con una lupa antigua en la pata derecha y la cabeza inclinada 40grados a la izquierda',
                            this.imgDefault,
                            'LoadingImg'
                        )}
                    </aside>
                    <aside className="LoadingText">
                        <p>{this.title}</p>
                        <p className="LoadingSubText">{this.message}</p>
                    </aside>
                    <aside className="LoadingBar">
                        <div className="LoadingProgress"></div>
                    </aside>
                </article>
            </section>
        )
    }
}