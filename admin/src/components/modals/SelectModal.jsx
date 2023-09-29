/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import MainModal from './MainModal';
import { Select } from '../UsedInput';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addCategoryAction } from '../../redux/movieSlice';
import toast from 'react-hot-toast';
import { InlineError } from '../../notfications/error';
import { getAllCategoryAction } from '../../redux/categorySlice';

function SelectModal({ openModal, setOpenModal }) {
    const dispatch = useDispatch();
    const generateId = Math.floor(Math.random() * 100000000);

    const { categories } = useSelector((state) => state.category);

    // validate cast
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                name: yup.string().required('Please enter movie category'),
            })
        ),
    });

    const onSubmit = (data) => {
        // console.log(data)
        dispatch(addCategoryAction({ ...data, categoryId: generateId }));
        toast.success('Category crerated!');

        reset();
        setOpenModal(false);
    };
    useEffect(() => {
        dispatch(getAllCategoryAction());
    }, [dispatch]);

    return (
        <MainModal openModal={openModal} setOpenModal={setOpenModal}>
            <div className="inline-block w-full h-full sm:w-4/5 md:w-3/5 lg:w-2/5 border border-border align-middle p-10 overflow-y-auto bg-main text-white rounded-lg ">
                <h2 className="text-3xl font-bold">Add Category</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 text-left mt-6">
                    <div className="w-full">
                        <Select
                            label="Movie Category"
                            options={categories?.length ? categories : []}
                            name="name"
                            register={register('name')}
                        />
                        {errors.name && <InlineError text={errors.name.message} />}
                    </div>
                    <button
                        onClick={() => setOpenModal(false)}
                        className="w-full flex-cols  py-3 rounded bg-subMain hover:bg-transparent border border-subMain transitions text-white"
                    >
                        Add
                    </button>
                </form>
            </div>
        </MainModal>
    );
}

export default SelectModal;
