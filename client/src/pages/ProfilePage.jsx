import React, { useState,useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
const ProfilePage = () => {

    const {authUser, updateProfile} = useContext(AuthContext)

    const [selectedImage, setSelectedImage] = useState(null)
    const naviagte = useNavigate()
    const [name, setName] = useState(authUser.fullName)
    const [bio, setBio] = useState(authUser.bio)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!selectedImage){
            await updateProfile({fullName: name, bio});
            naviagte('/')
            return;
        }
        
        const reader = new FileReader();
        reader.readAsDataURL(selectedImage)
        reader.onload = async () => {
            const base64Image = reader.result;
            await updateProfile({profilePic: base64Image , fullName: name, bio});
            naviagte('/')
        }

    }

  return (
    <div className="min-h-screen bg-black bg-cover bg-no-repeat flex items-center justify-center">
        <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2
            border-blue-600/50 bg-gradient-to-br from-blue-900/20 to-black/40 flex items-center justify-between max-sm:flex-col-reverse
            rounded-lg">
            <form onSubmit={handleSubmit}  className="flex flex-col gap-5 p-10 flex-1">
                <h3 className="text-lg">Profile details</h3>
                <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
                    <input onChange={(e) => setSelectedImage(e.target.files[0])} type="file" id="avatar" accept=".png, .jpg, .jpeg" hidden />
                    <img src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImage &&
                        'rounded-full'
                    }`}/>
                    upload profile image
                </label>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" required placeholder="Your name" className="p-2
                border border-blue-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-900/20 text-white"/>
                <textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder="Write profile bio" required className="p-2
                border border-blue-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-900/20 text-white" rows={4}></textarea>

                <button type="submit"  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-2 rounded-full text-lg cursor-pointer">Save

                </button>
            </form>
            <img  className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 
            ${selectedImage && 'rounded-full'}`}  src={authUser?.picture || assets.logo_icon} alt="" />
        </div>
    </div>
  );
};

export default ProfilePage;
