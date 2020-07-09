import React from 'react';

const Posts = React.lazy(() => import("./Posts"));
const Stories = React.lazy(() => import("./Stories"));

function Main() {
    return (
        <main>
            <div className="MainFlex">
                <Posts/>
                <Stories/>
            </div>
        </main>

    );
}

export default Main;
