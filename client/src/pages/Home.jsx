import Banner from '../components/home/Banner/Banner';
import Popular from '../components/home/Popular/Popular';
import Promos from '../components/home/Promos';
import Toprate from '../components/home/Toprate/Toprate';
import Layout from '../layout/Layout';

function Home() {
    return (
        <div>
            <Layout>
                <div className="container mx-auto min-h-screen px-2 mb-6">
                    <Banner />
                    <Popular />
                    <Promos />
                    <Toprate />
                </div>
            </Layout>
        </div>
    );
}

export default Home;
