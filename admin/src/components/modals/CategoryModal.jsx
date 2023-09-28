/* eslint-disable react/prop-types */

import MainModal from './MainModal';

import { Input } from '../UsedInput';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategoryAction, updateCategoryAction } from '../../redux/categorySlice';
import toast from 'react-hot-toast';

function CategoryModal({ openModal, setOpenModal, category }) {
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            //nếu có category thì sẽ update nếu không sẽ tạo mới
            if (category) {
                dispatch(updateCategoryAction(category?._id, { name: name }));
                setOpenModal(false);
            } else {
                dispatch(createCategoryAction({ name: name }));
                setName('');
                setOpenModal(false);
            }
        } else {
            toast.error('Please write a category name!');
        }
    };

    useEffect(() => {
        if (category) setName(category?.name);
    }, [category]);

    return (
        <MainModal openModal={openModal} setOpenModal={setOpenModal}>
            <div className="inline-block w-full h-full sm:w-4/5 md:w-3/5 lg:w-2/5 border border-border align-middle p-10 overflow-y-auto bg-main text-white rounded-lg ">
                <h2 className="text-3xl font-bold">{category ? 'Update' : 'Create'}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left mt-6">
                    <Input
                        label="Category Name"
                        placehoder={category?.name}
                        type="text"
                        bg={true}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button
                        onClick={() => setOpenModal(false)}
                        className="w-full flex-cols  py-3 rounded bg-subMain hover:bg-transparent border border-subMain transitions text-white"
                    >
                        {category ? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
        </MainModal>
    );
}

export default CategoryModal;
