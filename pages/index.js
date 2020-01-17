import MasterPage from '../components/Master';
import fetch from 'isomorphic-unfetch';

import Precio from '../components/Precio';
import Noticias from '../components/Noticias';

const Index = (props) => (
    <MasterPage>
        <div className="row">
            <div className="col-12">
                <h2>Precio del Bitcoin</h2>
                <Precio precio={props.precioBitcoin} />
            </div>

            <div className="col-md-8">
                <h2>Noticias Sobre Bitcoin</h2>
                <Noticias
                    noticias={props.noticias}
                />
            </div>
            <div className="col-md-4">
                Proximos Eventos
            </div>
        </div>
    </MasterPage>
);

Index.getInitialProps = async () => {
    const precio = await fetch('https://api.coinmarketcap.com/v2/ticker/1/');
    const noticias = await fetch('https://newsapi.org/v2/everything?q=bitcoin&from=2019-12-17&sortBy=publishedAt&apiKey=705a3b8215df4a0188444fc489fa0ea5&language=es');
    
    const resPrecio = await precio.json();
    const resNoticias = await noticias.json();

    return {
        precioBitcoin : resPrecio.data.quotes.USD,
        noticias : resNoticias.articles
    }
}
export default Index;