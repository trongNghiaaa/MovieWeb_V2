/* eslint-disable react/prop-types */
import MainModal from './MainModal';
import { FaFacebook, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { EmailShareButton, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';

function ShareModal({ openModal, setOpenModal, movie }) {
    const shareData = [
        { icon: FaFacebook, shareBtn: FacebookShareButton },
        { icon: FaTwitter, shareBtn: TwitterShareButton },
        { icon: FaWhatsapp, shareBtn: WhatsappShareButton },
        { icon: FiMail, shareBtn: EmailShareButton },
        { icon: FaTelegram, shareBtn: TelegramShareButton },
    ];

    const url = `${window.location.protocol}//${window.location.host}/movies/${movie?.name}`;

    return (
        <MainModal openModal={openModal} setOpenModal={setOpenModal}>
            <div className="inline-block w-full h-full sm:w-4/5 md:w-3/5 lg:w-2/5 border border-border align-middle p-10 overflow-y-auto bg-main text-white rounded-lg ">
                <h2 className="text-2xl font-bold">
                    Share <span className="text-3xl font-bold">{`"${movie?.name}"`} </span>
                </h2>
                <form className="flex-rows gap-6 flex-wrap mt-6">
                    {shareData.map((data, i) => (
                        <data.shareBtn key={i} url={url}>
                            <div className="w-12 h-12 flex-cols text-lg bg-white bg-opacity-30 rounded-md transitions hover:bg-subMain ">
                                <data.icon />
                            </div>
                        </data.shareBtn>
                    ))}
                </form>
            </div>
        </MainModal>
    );
}

export default ShareModal;
