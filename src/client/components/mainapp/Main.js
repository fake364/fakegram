import React from 'react';
import Posts from "./Posts";
import Stories from "./Stories";

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
