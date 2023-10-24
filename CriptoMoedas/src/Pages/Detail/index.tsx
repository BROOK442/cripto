import style from './detail.module.css'
import {useParams} from 'react-router-dom'
import { useEffect } from 'react';

export function Detail (){
    const {cripto} = useParams();

    useEffect(() =>{
        function getData() {
            fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=12c43c574b70eedc&symbol=${cripto}`)
        }
    })

    return(
        <div>
            <h1>Pagina de detalhes {cripto}</h1>
        </div>
    )
}