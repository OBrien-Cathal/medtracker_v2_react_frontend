import AppRoutes from "./routes/AppRoutes.tsx";
import './app.css'
import React from "react";
import Navigation from "./components/Navigation.tsx";
import HeaderContainer from "./components/HeaderContainer.tsx";
import AuthProvider from "./auth/AuthProvider.tsx";
import {BrowserRouter} from "react-router-dom";
import FooterContainer from "./components/FooterContainer.tsx";

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <AuthProvider>
                    <HeaderContainer>
                        <Navigation/>
                    </HeaderContainer>
                    <AppRoutes></AppRoutes>
                    <FooterContainer/>
                </AuthProvider>
            </BrowserRouter>
        </React.Fragment>

    );
}

export default App