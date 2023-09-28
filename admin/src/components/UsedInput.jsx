/* eslint-disable react/prop-types */
export const Message = ({ label, placehoder, register, name }) => {
    return (
        <div className="w-full text-sm">
            <label className="text-border font-semibold">{label} </label>
            <textarea
                placeholder={placehoder}
                className="w-full h-40 mt-2 p-6 bg-main border border-border rounded"
                name={name}
                {...register}
            ></textarea>
        </div>
    );
};

export const Select = ({ label, options, register, name }) => {
    return (
        <>
            <label className="text-border font-semibold">{label} </label>
            <select className="w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded" {...register} name={name}>
                {options.map((o, i) => (
                    <option value={o.value} key={i}>
                        {o.name}
                    </option>
                ))}
            </select>
        </>
    );
};
export const Input = ({ label, placehoder, type, bg, name, value, onChange, register }) => {
    return (
        <div className="w-full text-sm">
            <label className="text-border font-semibold">{label} </label>
            <input
                type={type}
                placeholder={placehoder}
                name={name}
                value={value}
                onChange={onChange}
                {...register}
                className={`w-full mt-2 text-sm p-4 text-white focus:text-dry rounded ${
                    bg ? 'bg-main' : 'bg-dryGray'
                } focus:bg-dryGray border border-border `}
            />
        </div>
    );
};
