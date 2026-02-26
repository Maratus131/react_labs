function LoadingPage() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <img
                className="loading-spinner"
                src="/img/loading_spinner.svg"
                alt="Loading..."
                style={{ width: '40px' }}
            />
        </div>
    );
}

export default LoadingPage;