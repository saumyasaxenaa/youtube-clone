"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";
import SignIn from "./sign-in";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";

/**
 * React server component
 * Components will render on the server and then are being disaplayed on the browser
 */

// Javascript closure - state inside of a function is still maintained after the function has finished executing
export default function Navbar() {
  // Init user state
  const [user, setUser] = useState<User | null>(null);

  // Run some javascript just a single time when this function loads
  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe(); // returning the function, not calling it
  });

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image
          width={90}
          height={20}
          src="/youtube-logo.svg"
          alt="Youtube Logo"
        />
      </Link>
      <SignIn user={user} />
    </nav>
  );
}
