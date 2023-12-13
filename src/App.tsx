import { Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';

import './globals.css';
import { AllUsers, CreatePost, EditPost, Explore, Home, Liked, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
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
                    <Route path='/explore' element={<Explore />} />
                    <Route path='/saved' element={<Saved />} />
                    <Route path='/liked' element={<Liked />} />
                    <Route path='/all-users' element={<AllUsers />} />
                    <Route path='/create-post' element={<CreatePost />} />
                    <Route path='/update-post/:id' element={<EditPost />} />
                    <Route path='/posts/:id' element={<PostDetails />} />
                    <Route path='/profile/:id/*' element={<Profile />} />
                    <Route path='/update-profile/:id/*' element={<UpdateProfile />} />
                </Route>
            </Routes>
            <Toaster />
        </main >
    )
}

export default App