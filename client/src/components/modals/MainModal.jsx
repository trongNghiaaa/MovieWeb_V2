/* eslint-disable react/prop-types */
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai';

function MainModal({ openModal, setOpenModal, children }) {
    const cancelBtnRef = useRef();
    return (
        <>
            <Transition show={openModal} as={Fragment} appear>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-300 overflow-y-auto text-center"
                    initialFocus={cancelBtnRef}
                    onClose={() => setOpenModal(false)}
                >
                    <div className="min-h-screen px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60" />
                        </Transition.Child>
                        <span className="inline-block h-screen align-middle" aria-hidden="true ">
                            &#8203
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            {children}
                        </Transition.Child>
                        <div className="absolute right-5 top-5 ">
                            <button
                                onClick={() => setOpenModal(false)}
                                type="button"
                                className=" w-12 h-12 px-4 py-4 text-base text-white font-medium transitions bg-subMain rounded-full hover:bg-white hover:text-subMain"
                            >
                                <AiOutlineClose />
                            </button>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default MainModal;
