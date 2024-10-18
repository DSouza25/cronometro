import React, { Component } from "react";
import './relogio.css'

class Relogio extends Component{
    constructor(props){
        super(props);
        this.state = {
             hora: 0,
             minuto: 0,
             segundo: 0,
             milesimo: 0,
             start: false
        }
        this.iniciar = this.iniciar.bind(this)
        this.pause = this.pause.bind(this)
        this.marcar = this.marcar.bind(this)
        this.zerar = this.zerar.bind(this)
    }
    
    iniciar(){
        this.setState({start: true})
        let dado = this.state
        let zero1 = document.querySelector('.zero:nth-child(3)');
        let zero2 = document.querySelector('.zero:nth-child(2)');
        let zero3 = document.querySelector('.zero:nth-child(1)');
        window.timer = setInterval( () => {
                dado.milesimo += 1;
                if(dado.hora == 0){ zero3.style.display = 'inline'}
                if(dado.milesimo == 10){
                    dado.segundo += 1;
                    dado.milesimo = 0
                    this.setState({segundo: dado.segundo})
                    if(dado.segundo >= 10){ zero1.style.display = 'none' }
                    if(dado.segundo == 60){
                        dado.segundo = 0;
                        dado.minuto += 1;
                        this.setState({segundo: dado.segundo, minuto: dado.minuto})
                        if(dado.minuto >= 10){ zero2.style.display = 'none' }
                        if(dado.minuto == 60){
                            dado.minuto = 0;
                            dado.hora += 1
                            this.setState({minuto: dado.minuto, hora: dado.hora})
                            if(dado.minuto == 0){zero2.style.display = 'inline'}
                            if(dado.hora >= 10){ zero3.style.display = 'none'}
                            
                        }
                    }
                    if(dado.segundo == 0){zero1.style.display = 'inline'}
                }
                this.setState({milesimo: dado.milesimo})
            } , 100)
    }

    pause(){
        this.setState({start: false})
        clearInterval(window.timer)
    }

    marcar(){
        let novoParagrafo = document.createElement("p");
        let hora = (this.state.hora < 10)?'0'+this.state.hora:this.state.hora;
        let minuto = (this.state.minuto < 10)?'0'+this.state.minuto:this.state.minuto;
        let segundo = (this.state.segundo < 10)?'0'+this.state.segundo:this.state.segundo;
        let milesimo = (this.state.milesimo < 10)?'0'+this.state.milesimo:this.state.milesimo;
        var texto = document.createTextNode(`${hora}:${minuto}:${segundo}:${milesimo}`);
        novoParagrafo.appendChild(texto)
        document.querySelector('#marcas').appendChild(novoParagrafo)
    }

    zerar(){
        let zero1 = document.querySelector('.zero:nth-child(3)');
        let zero2 = document.querySelector('.zero:nth-child(2)');
        let zero3 = document.querySelector('.zero:nth-child(1)');
        zero3.style.display = 'inline'
        zero2.style.display = 'inline'
        zero1.style.display = 'inline'
        if(this.state.start){
            alert('pare o cronometro para poder zerar')
        }
        else{
            this.setState({hora: 0, minuto: 0, segundo: 0, milesimo: 0})
        }
        let marcacoes = document.querySelector('#marcas');
        if(!this.state.start){
            while(marcacoes.firstChild){
                marcacoes.removeChild(marcacoes.firstChild)
            }
        }


    }

    render(){
        return(
            console.log(typeof(this.state.hora)),
            <div className="principal">
                <div class="container">
                    <h1><span className="zero">0</span>{this.state.hora}:<span className="zero">0</span>{this.state.minuto}:<span className="zero">0</span>{this.state.segundo}:<span className="zero">0</span>{this.state.milesimo}</h1>
                    <div class="buttons">
                        <button onClick={this.state.start ? this.pause : this.iniciar }>{this.state.start ? 'Pause' : 'Iniciar'}</button>
                        <button onClick={this.marcar}>Marcar</button>
                        <button onClick={this.zerar}>Zerar</button>
                    </div>
                    <div id="marcas"></div>
                </div>
            </div>
        )
    }
}
export default Relogio