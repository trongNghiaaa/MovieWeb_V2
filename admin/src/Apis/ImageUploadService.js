import toast from 'react-hot-toast';
import Axios from './axios';

export const uploadImageService = async (file, setLoading) => {
    try {
        setLoading(true);
        const { data } = await Axios.post('/upload', file);
        setLoading(false);
        toast.success('Uploaded successfully!');
        return data;
    } catch (error) {
        setLoading(false);
        toast.error('Some thing went wrong!');
    }
};
