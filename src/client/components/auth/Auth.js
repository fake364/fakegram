import React from 'react';

const MainScreen = React.lazy(() => import("./MainScreen"));

function Auth() {
    return (
        <main>
            <div className="MainFlex">
                <MainScreen/>
            </div>
        </main>

    );
}

export default Auth;