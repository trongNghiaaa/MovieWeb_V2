import { HiPlusCircle } from 'react-icons/hi';
import Sidebar from '../layout/Sidebar';

import { useState } from 'react';
import CategoryModal from '../components/modals/CategoryModal';
import { useEffect } from 'react';
import TableCategory from '../components/TableCategory';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryAction, getAllCategoryAction } from '../redux/categorySlice';
import Loader from '../notfications/Loader';
import Empty from '../notfications/Empty';
import toast from 'react-hot-toast';

function Category() {
    const [openModal, setOpenModal] = useState(false);
    const [category, setCategory] = useState();
    const dispatch = useDispatch();
    const { categories, isLoading, error } = useSelector((state) => state.category);

    const EditFunction = (data) => {
        setCategory(data);
        setOpenModal(!openModal);
    };
    //delete category
    const handleDeleteCategory = (id) => {
        window.confirm('Are you sure you want to delete this category!') && dispatch(deleteCategoryAction(id));
    };

    useEffect(() => {
        //get all category
        dispatch(getAllCategoryAction());
        if (error) toast.error(error);
        if (openModal === false) setCategory();
    }, [openModal, dispatch, error]);
    return (
        <Sidebar>
            <CategoryModal openModal={openModal} setOpenModal={setOpenModal} category={category} />
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className="text-2xl font-semibold text-white ">Categories</h2>
                    <div className="flex justify-end">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="flex-rows gap-6  w-full sm:w-auto bg-subMain transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded"
                        >
                            <HiPlusCircle /> Create
                        </button>
                    </div>
                </div>
                {isLoading ? (
                    <Loader />
                ) : categories?.length > 0 ? (
                    <TableCategory data={categories} onEditFunction={EditFunction} onDeleteFunction={handleDeleteCategory} />
                ) : (
                    <Empty message="have no category" />
                )}
            </div>
        </Sidebar>
    );
}

export default Category;
