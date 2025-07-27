import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    let [currentUser , setCurrentUser] = useState({})
    let navigate = useNavigate()
    const GetUser = async() => {
        let userID = sessionStorage.getItem('userID')
        let GetData = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId/${userID}`)
        setCurrentUser(GetData.data)
    }
    console.log(currentUser)
    useEffect(() => {
        GetUser()
    } , [])
  return (
    // <p>aser</p>
    <div className='ProfileCountainer text-center'>
        <p className='titleSec h3 text-center'>General Information</p>
        <div className="GeneralInfo row">
            <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                <p className='title'>Name</p>
                <p>{currentUser.Name_Fname}</p>
            </div>
            <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                <p className='title'>User Name</p>
                <p>{currentUser.UserName}</p>
            </div>
            <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                <p className='title'>Email</p>
                <p>{currentUser.Email}</p>
            </div>
            <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                <p className='title'>Phone</p>
                <p>{currentUser.Phone}</p>
            </div>
        </div>
        <p className='titleSec h3 text-center my-4'>Accounting Information</p>
        <div className="GeneralInfo row">
            <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                <p className='title'>inventory</p>
                <p>{currentUser.inventory}</p>
            </div>
            <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                <p className='title'>CardOwner</p>
                <p>{currentUser.CardOwner}</p>
            </div>
            <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                <p className='title'>CardNumber</p>
                <p>{currentUser.CardNumber}</p>
            </div>
            <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                <p className='title'>Shaba</p>
                <p>{currentUser.Shaba}</p>
            </div>
        </div>
        <p className='titleSec h3 text-center my-4'>Personal Information</p>
        <div className="GeneralInfo row">
            <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                <p className='title'>Password</p>
                <p>{currentUser.Password}</p>
            </div>
            <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                <p className='title'>IdNational</p>
                <p>{currentUser.IdNational}</p>
            </div>
            <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                <p className='title'>BirthDay</p>
                <p>{currentUser.BirthDay}</p>
            </div>
            <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                <p className='title'>Adderss</p>
                <p>{currentUser.Adderss}</p>
            </div>
            <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                <p className='title'>ZipCode</p>
                <p>{currentUser.ZipCode}</p>
            </div>
        </div>
        <button onClick={() => navigate('/ChangeInformation')} className='btn btn-warning my-3'>Change</button>
    </div>
  )
}

export default Profile