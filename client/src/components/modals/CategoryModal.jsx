/* eslint-disable react/prop-types */

import MainModal from './MainModal';

function CategoryModal({ openModal, setOpenModal }) {
    return (
        <MainModal openModal={openModal} setOpenModal={setOpenModal}>
            <div className="inline-block w-full h-full sm:w-4/5 md:w-3/5 lg:w-2/5 border border-border align-middle p-10 overflow-y-auto bg-main text-white rounded-lg ">
                <h2 className='text-3xl font-bold'>Create</h2>
            </div>
        </MainModal>
    );
}

export default CategoryModal;
