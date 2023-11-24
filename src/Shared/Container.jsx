/* eslint-disable react/prop-types */


const Container = ({children }) => {
    return (
        <div className="px-6 md:px-8 lg:px-12  ">
            {children}
        </div>
    );
};

export default Container;