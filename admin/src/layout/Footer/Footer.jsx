import { Link } from 'react-router-dom';

function Footer() {
    const links = [
        {
            title: 'Company',
            links: [
                {
                    name: 'Home',
                    link: '/',
                },
                {
                    name: 'About Us',
                    link: '/about-us',
                },
                {
                    name: 'Contact Us',
                    link: '/contact-us',
                },
                {
                    name: 'Movies',
                    link: '/movies',
                },
            ],
        },
        {
            title: 'Top Categories',
            links: [
                {
                    name: 'Action',
                    link: '#',
                },
                {
                    name: 'Romantic',
                    link: '#',
                },
                {
                    name: 'Drama',
                    link: '#',
                },
                {
                    name: 'Historical',
                    link: '#',
                },
            ],
        },
        {
            title: 'My Account',
            links: [
                {
                    name: 'Dashboard',
                    link: '#',
                },
                {
                    name: 'My Favorite',
                    link: '#',
                },
                {
                    name: 'Profile',
                    link: '#',
                },
                {
                    name: 'Change Password',
                    link: '#',
                },
            ],
        },
    ];

    return (
        <div className="bg-dry py-4 border-black">
            <div className="container mx-auto ">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-9 md:gap-11 xl:gap-7 py-10 px-10">
                    {links.map((link, i) => (
                        <div key={i} className=" pb-3.5 sm:pb-0">
                            <h3 className=" lg:leading-7 font-medium sm:mb-4 md:mb-5 lg:mb-6  mb-3.5">{link.title}</h3>
                            <ul className="text-sm flex flex-col space-y-3">
                                {link.links.map((item, i) => (
                                    <li key={i} className="flex items-baseline">
                                        <Link
                                            to={item.link}
                                            className="w-full text-border inline-block transitions hover:text-subMain "
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Footer;
