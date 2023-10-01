import React, { useState, useEffect } from "react";

export default function useIsOnline() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [loggedInUserId, setLoggedInUserId] = useState();

  useEffect(() => {
    fetch("https://booktrade-api.onrender.com/loginuser", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.text())
      .then((userId) => {
        setLoggedInUserId(userId);
        makeOnline();
      })
      .catch((err) => console.log(err));
  }, []);

  const makeOnline = async () => {
    try {
      const response = await fetch("http://localhost:5000/makeOnline", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });

      if (response.ok) {
        const result = await response.json();
      } else {
        console.error("Error making online request:", response.statusText);
      }
    } catch (error) {
      console.error("Error making online request:", error);
    }
  };

  const makeOffline = async () => {
    try {
      const response = await fetch("http://localhost:5000/makeOffline", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });

      if (response.ok) {
        const result = await response.json();
      } else {
        console.error("Error making online request:", response.statusText);
      }
    } catch (error) {
      console.error("Error making online request:", error);
    }
  };

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");

    if (expireTime < Date.now()) {
      console.log("log out");
      makeOffline();
    }
  };

  const updateExpireTime = () => {
    makeOnline();
    const expireTime = Date.now() + 10000;

    localStorage.setItem("expireTime", expireTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkForInactivity();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateExpireTime();

    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mouseMove", updateExpireTime);

    return () => {
      window.addEventListener("click", updateExpireTime);
      window.addEventListener("keypress", updateExpireTime);
      window.addEventListener("scroll", updateExpireTime);
      window.addEventListener("mouseMove", updateExpireTime);
    };
  }, []);

  return <div></div>;
}
