import {useEffect, useState, FormEvent} from 'react'
import styles from "./home.module.css"
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";


//https://sujeitoprogramador.com/api-cripto/?key=cc333fdc79bbecb8

interface CoinProps{
    name: string;
    delta_24h: string;
    price: string;
    symbol: string;
    volume_24h: string;
    market_cap: string;
    formatedPrice: string;
    formatedMarket: string;
}


export function Home (){

    const [coins, setCoins] = useState<CoinProps[]>([])
    const [inputValue, setinputValue] = useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        async function getData() {
            fetch('https://sujeitoprogramador.com/api-cripto/?key=12c43c574b70eedc&pref=BRL')
            .then(response => response.json())
            .then((data)=>{
                let coinsData = data.coins.slice(0,15);
                
                let price = Intl.NumberFormat ("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })
                const FormatResult = coinsData.map((item)=> {
                    const formated={
                        ...item,
                        formatedPrice:price.format(Number(item.price)),
                        formatedMarket:price.format(Number(item.market_cap))
                    }
                    return formated;
                })

                setCoins(FormatResult);
            })
        }

        getData();
    },[])

    function pesquisa(e: FormEvent){
        e.preventDefault();
        if(inputValue==="") return;

        navigate(`/detail/${inputValue}`)
    }


    return(
        <main className={styles.container}>
            <form className={styles.form} onSubmit={pesquisa}>
                <input 
                placeholder="Digite o simbolo da moeda: BTC.."
                value={inputValue}
                onChange={ (e) => setinputValue(e.target.value)}
                />
                <button type="submit">
                <HiMiniMagnifyingGlass size={30} color="#fff"/>
                </button>

            </form>

            <table>

                <thead>
                    <tr>

                        <th scope="col">Moedas</th>
                        <th scope="col">Valor Mercado</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Volume</th>

                    </tr>

                </thead>

                <tbody id="tbody">
                    {coins.map(coin => (
                    <tr key={coin.name} className={styles.tr}>
                        <td className={styles.tdLabel} data-label="Moeda">
                            <Link  className={styles.link} to={`/detail/${coin.symbol}`}>
                                <span>{coin.name}</span> | {coin.symbol}
                            </Link>
                        </td>
                        <td className={styles.tdLabel} data-label="Mercado">
                            {coin.formatedMarket}
                        </td>
                        <td className={styles.tdLabel} data-label="Preço">
                            {coin.formatedPrice}
                        </td>
                        <td className={Number(coin?.delta_24h) >= 0? styles.tdProfit : styles.tdLoss} data-label="delta_24h">
                            <span> {coin.delta_24h} </span>
                        </td>
                    </tr>
                    ))}
                </tbody>

            </table>


        </main>
    )
}