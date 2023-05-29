import React, { useEffect, useState } from "react";
import * as Tabs from '@radix-ui/react-tabs';
import { Host } from "../models/hostProfile";

const ProfileForm = ({ hostData, setHostData }): any => {

    const register = (e) => {
        e.preventDefault();
        const hostProfile = new Host(hostData);
        console.log("host data", hostProfile);
        hostProfile.update()
            .then(res=>{res? alert("Updated information") : alert("Failed to save =(")})
    };
    const handleChange = (e) => {
        setHostData({
            ...hostData,
            [e.target.name]: e.target.value
        });
    };



    return (
        <form onSubmit={register} className='flex flex-col p-4'>
            <label htmlFor='firstname'>First Name</label>
            <input
                className='px-2 rounded outline-none bg-white focus:ring-2 ring-blue-500'
                type='text'
                name='firstname'
                value={hostData.firstName}
                onChange={(e) => handleChange(e)}
            />
            <label htmlFor='lastname'>Last Name</label>
            <input
                className='px-2 rounded outline-none bg-white focus:ring-2 ring-blue-500'
                type='text'
                name='lastname'
                value={hostData.lastName}
                onChange={(e) => handleChange(e)}
            />
            <label htmlFor='email'>Email</label>
            <input
                className='px-2 rounded outline-none bg-white focus:ring-2 ring-blue-500'
                type='text'
                name='email'
                value={hostData.email}
                onChange={(e) => handleChange(e)}
            />
            <label htmlFor='street'>Street</label>
            <input
                className='px-2 rounded outline-none bg-white focus:ring-2 ring-blue-500'
                type='text'
                name='street'
                value={hostData.street}
                onChange={(e) => handleChange(e)}
            />
            <label htmlFor='street2'>Street 2</label>
            <input
                className='px-2 rounded outline-none bg-white focus:ring-2 ring-blue-500'
                name='street2'
                type='text'
                value={hostData.street2}
                onChange={(e) => handleChange(e)}
            />
            <div className="flex justify-between">
                <div className="address-group w-1/2">
                    <label htmlFor='city'>City</label>
                    <input
                        className='px-2 rounded outline-none bg-white focus:ring-2 ring-blue-500'
                        name='city'
                        type='text'
                        value={hostData.city}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="address-group w-1/4">
                    <label htmlFor='region'>State/Province/Region</label>
                    <input
                        className='px-2 rounded outline-none bg-white focus:ring-2 ring-blue-500'
                        name='region'
                        type='text'
                        value={hostData.state}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="address-group w-1/4">
                    <label htmlFor='postal'>Postal</label>
                    <input
                        className='px-2 rounded outline-none bg-white focus:ring-2 ring-blue-500'
                        name='postal'
                        type='text'
                        value={hostData.postal}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            </div>
            <label htmlFor='country'>Country</label>
            <input
                className='px-2 rounded outline-none bg-white focus:ring-2 ring-blue-500'
                name='country'
                type='text'
                value={hostData.country}
                onChange={(e) => handleChange(e)}
            />
            <label htmlFor='phone'>Phone</label>
            <input
                className='px-2 rounded outline-none bg-white focus:ring-2 ring-blue-500'
                name='phone'
                type="tel"
                value={hostData.phone}
                onChange={(e) => handleChange(e)}
            />
            <button
                type='submit'
                className='bg-blue-500 rounded p-2 my-4 text-white'
            >
                Update Profile
            </button>
        </form>
    )
}

const Profile = (): any => {

    const [hostData, setHostData] = useState({
        uid: "",
        hostUid: "",
        firstName: "",
        lastName: "",
        street: "",
        street2: "",
        city: "",
        state: "",
        postal: "",
        country: "",
        phone: "",
        email: ""
    });

    useEffect(() => {
        const userId = localStorage.getItem("userUID");
        const userName = localStorage.getItem("userName");
        const email = localStorage.getItem("email");
        const dataObj: object = {
            hostUid: userId,
            email: email
        };

        if (userName) {
            const namesArr: string[] = userName.split(" ");
            dataObj["firstName"] = namesArr[0];
            dataObj["lastName"] = namesArr[namesArr.length - 1];
        }

        if (userId) {
            Host.getByUserId(userId)
                .then(res => {
                    if (res) {
                        dataObj["uid"] = res.uid;
                        if (res.firstName) dataObj["firstName"] = res.firstName;
                        if (res.lastName) dataObj["lastName"] = res.lastName;
                        dataObj["street"] = res.street ? res.street : "";
                        dataObj["street2"] = res.street2 ? res.street2 : "";
                        dataObj["city"] = res.city ? res.city : "";
                        dataObj["state"] = res.state ? res.state : "";
                        dataObj["postal"] = res.postal ? res.postal : "";
                        dataObj["country"] = res.country ? res.country : "";
                        dataObj["phone"] = res.phone ? res.phone : "";
                        if (res.email) dataObj["email"] = res.email;
                    }
                    setHostData({ ...hostData, ...dataObj });
                })

        }
    }, [])

    return (
        <Tabs.Root defaultValue='myProfile' orientation='vertical'>
            <Tabs.List
                aria-label='tabs example'
                className='flex justify-center divide-x-2 divide-slate-400'
            >
                <Tabs.Trigger className='flex-auto p-2' value='myProfile'>
                    My Profile
                </Tabs.Trigger>
                <Tabs.Trigger className='flex-auto p-2' value='updateProfile'>
                    Update Profile
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value='myProfile'>
                <p>My Info</p>
            </Tabs.Content>
            <Tabs.Content value='updateProfile'>
                <ProfileForm hostData={hostData} setHostData={setHostData} />
            </Tabs.Content>
        </Tabs.Root>
    )
}

export default Profile;