const Paper = ({children, classes}) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-lg ${classes}`}>
          {children}
        </div>
    );
}

export default Paper;