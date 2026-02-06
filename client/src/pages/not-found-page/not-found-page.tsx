function NotFoundPage() {
    return (
        <div className="page page--gray page--not-found">
            <main className="page__main page__main--not-found">
                <div className="container">
                    <section className="not-found">
                        <h1 className="not-found__title">404. Page not found</h1>
                        <p className="not-found__text">
                            Sorry, the page you are looking for does not exist.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    )
}

export { NotFoundPage }