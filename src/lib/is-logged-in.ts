"use client"

const useIsLoggedIn = () => {


    return localStorage.getItem('userInfo') !== null;
};

export default useIsLoggedIn;