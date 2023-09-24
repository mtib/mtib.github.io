import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import Router from "./Router";
import 'bootstrap/dist/css/bootstrap.min.css';

const mountNode = document.getElementById("app");

const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            await navigator.serviceWorker.register(
                new URL('sw.js', import.meta.url),
            );
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};

registerServiceWorker();

if (mountNode) {
    const root = ReactDOM.createRoot(mountNode);
    root.render(
        <Router>
            <App />
        </Router>
    );
}
