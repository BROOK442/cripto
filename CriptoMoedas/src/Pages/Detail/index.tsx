import style from './detail.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

interface CoinProps{
    symbol: string;
    name: string;
    price: string;
    market_cap: string;
    low_24h: string;
    high_24h: string;
    total_volume_24h: string;
    delta_24h: string;
    volume_24h: string;
    formatedPrice: string;
    formatedMarket: string;
    formatedLowPrice: string;
    formatedHighPrice: string;
    numberDelta: number;
    error?: string;
}

export function Detail(){
    const {cripto} = useParams();
    const [detail, setDetail] = useState<CoinProps>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() =>{
        function getData(){
            fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=12c43c574b70eedc&symbol=${cripto}`)
            .then(response => response.json())
            .then((data:CoinProps) => {

                if(data.error){
                    navigate("/")
                }

                let price = Intl.NumberFormat ("pt-BR",{
                    
                    style: "currency",
                    currency: "BRL"
                })

                const resultData = {
                    ...data,
                    formatedPrice: price.format(Number(data.price)),
                    formatedMarket: price.format(Number(data.market_cap)),
                    formatedLowPrice: price.format(Number(data.low_24h)),
                    formatedHighPrice: price.format(Number(data.high_24h)),
                    numberDelta: parseFloat(data.delta_24h.replace(",","."))
                }
                setDetail(resultData);
                setLoading(false);
            })
        }
        getData();
    },[cripto])

    if(loading) {
        return (
            <div className={style.container}>
                <h4 className={style.center}>Loading...</h4>
            </div>
        )
    }
    return(
        <div className={style.container}>
            <h1 className={style.center}>{detail?.name}</h1>
            <p className={style.center}>{detail?.symbol}</p>
            <section className={style.content}>
                <p>
                    <strong>Preço: </strong> {detail?.formatedPrice}
                </p>

                <p>
                    <strong>Maior preço em 24hrs: </strong> {detail?.formatedHighPrice}
                </p>

                <p>
                    <strong>Menor preço em 24hrs: </strong> {detail?.formatedLowPrice}    
                </p>   

                 <p>
                     <strong>Variação preço em 24hrs: </strong> <span className={detail?.numberDelta && detail?.numberDelta>= 0 ? style.profit : style.low}> {detail?.delta_24h}</span>    
                </p> 

                <p>
                    <strong>Valor mercado:  </strong> {detail?.formatedMarket}
                </p>
                    
            </section>
        </div>
    )
}