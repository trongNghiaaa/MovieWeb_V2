/* eslint-disable react/prop-types */
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import Loader from '../notfications/Loader';
import { uploadImageService } from '../Apis/ImageUploadService';

// eslint-disable-next-line no-unused-vars
function Upload({ setImageUrl }) {
    const [loading, setLoading] = useState(false);

    //upload file
    const onDrop = useCallback(
        async (acceptedFiles) => {
            const file = new FormData();
            file.append('file', acceptedFiles[0]);
            const data = await uploadImageService(file, setLoading);

            setImageUrl(data);
        },
        [setImageUrl]
    );
    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        multiple: false,
        onDrop,
    });
    return (
        <div className="w-full text-center flex-cols gap-6">
            {loading ? (
                <div className="px-6 w-full py-8 border-2 border-border border-dashed bg-dry rounded-md">
                    <Loader />
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className="w-full px-6 py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
                >
                    <input {...getInputProps()} />
                    <span className="mx-auto flex-cols text-subMain text-3xl">
                        <FiUploadCloud />
                    </span>
                    <p className="text-sm mt-2">Drag your image here!</p>
                    <em className="text-border text-xs">
                        {isDragActive
                            ? 'Drop it like its hot!'
                            : isDragReject
                            ? 'Unsuported file type...'
                            : 'only .jpg and .png files will be accepted'}
                    </em>
                </div>
            )}
        </div>
    );
}

export default Upload;
