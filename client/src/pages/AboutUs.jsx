import Head from '../components/Head';
import Layout from '../layout/Layout';

import image from '../Data/about2.jpg';

function AboutUs() {
    return (
        <div>
            <Layout>
                <div className="min-h-screen container mx-auto px-2 my-6">
                    <Head title="About Us" />
                    <div className="xl:py-20 py-10 px-4">
                        <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
                            <div>
                                <h3 className="text-xl lg:text-3xl mb-4 font-sans font-semibold">Welcome to our App</h3>
                                <div className="mt-3 text-sm leading-6 text-text">
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                        been the industry standard dummy text ever since the 1500s, when an unknown printer took a
                                        galley of type and scrambled it to make a type specimen book. It has survived not only
                                        five centuries, but also the leap into electronic typesetting, remaining essentially
                                        unchanged
                                    </p>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                        been the industry standard dummy text ever since the 1500s, when an unknown printer took a
                                        galley of type and scrambled it to make a type specimen book. It has survived not only
                                        five centuries
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mt-8">
                                    <div className="p-6 bg-dry rounded-lg">
                                        <span className="text-3xl block font-extrabold mt-4">10k</span>
                                        <h4 className="text-lg font-bold mt-1 ">Listed Movie</h4>
                                        <p className="text-text text-sm mb-0 leading-7">
                                            Lorem Ipsum is simply dummy text of the printing
                                        </p>
                                    </div>
                                    <div className="p-6 bg-dry rounded-lg">
                                        <span className="text-3xl block font-extrabold mt-4">8k</span>
                                        <h4 className="text-lg font-bold mt-1 ">Lovely User</h4>
                                        <p className="text-text text-sm mb-0 leading-7">
                                            Completely free, without registration! Lorem Ipsum is simply
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 lg:mt-0">
                                <img
                                    src={image}
                                    alt="About Us"
                                    className="w-full h-header rounded-lg object-cover hidden xl:block"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default AboutUs;
