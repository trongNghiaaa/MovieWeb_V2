/* eslint-disable react/prop-types */
export const InlineError = ({ text }) => {
    return (
        <div className="w-full text-subMain font-medium text-xs mt-3">
            <p>{text}</p>
        </div>
    );
};
