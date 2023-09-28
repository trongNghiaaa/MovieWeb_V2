import { FiMail, FiMapPin, FiPhoneCall } from 'react-icons/fi';

import Layout from '../layout/Layout';
import Head from '../components/Head';

function ContactUs() {
    const contactData = [
        {
            id: 1,
            title: 'Email Us',
            info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            icon: FiMail,
            contact: 'test@gmail.com',
        },
        {
            id: 2,
            title: 'Call Us',
            info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            icon: FiPhoneCall,
            contact: '+84 99 999 9999',
        },
        {
            id: 3,
            title: 'Location',
            info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            icon: FiMapPin,
            contact: '',
        },
    ];
    return (
        <Layout>
            <Head title="Contact Us" />
            <div className="grid gap-6 my-20 md:grid-cols-2 lg:grid-cols-3 lg:my-20 xl:gap-8  ">
                {contactData.map((item) => (
                    <div key={item.id} className="border border-border flex-cols p-10 bg-dry rounded-lg text-center">
                        <span className="flex-cols w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl">
                            {<item.icon />}
                        </span>
                        <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
                        <p className="mb-0 text-sm text-text leading-6">
                            <a href={`mailto:${item.contact}`} className="text-blue-600">
                                {item.contact}
                            </a>{' '}
                            {item.info}
                        </p>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default ContactUs;
