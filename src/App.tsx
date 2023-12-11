import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './globals.css';
import { Home } from './_root/pages';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayou from './_auth/AuthLayou';
import RootLayout from './_root/RootLayout';
const App = () => {
    return (
        <main className='flex h-screen'>
            <Routes>
                {/* public routes */}
                <Route element={<AuthLayou />}>
                    <Route path="/sign-in" element={<SigninForm />} />
                    <Route path="/sign-up" element={<SignupForm />} />
                </Route>

                {/* private routes */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </main >
    )
}

export default App