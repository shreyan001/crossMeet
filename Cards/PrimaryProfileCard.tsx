import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { IPrimaryProfileCard } from "../types";
import { parseURL } from "../helpers/functions";
import { AuthContext } from "../context/auth";

const PrimaryProfileCard = ({ handle, avatar, metadata }: IPrimaryProfileCard) => {
    const { address, setHandle } = useContext(AuthContext);
    const [src, setSrc] = useState(parseURL(avatar));
    const [data, setData] = useState({
        name: "",
        bio: ""
    });

    const handleImageError = () => {
        setSrc(`http://robohash.org/set_set1/bgset_bg1/${address}.png`);
      };
      

      useEffect(() => {
      setHandle(handle);
    }, [handle]); 

    useEffect(() => {
        if (!metadata) return;
        (async () => {
            setData({
                name: "",
                bio: ""
            });
            try {
                const res = await fetch(parseURL(metadata));
                if (res.status === 200) {
                    const data = await res.json();
                    setData(data);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, [metadata]);

    return (
        <div className="profile-card">
            <div className="profile-card-img  center">
                <Link href="/settings">
                    <div>
                        <Image
                            src={src}
                            alt="avatar"
                            width={40}
                            height={40}
                            onError={handleImageError}
                            placeholder="blur"
                            blurDataURL="/assets/avatar-placeholder.svg"
                        />
                    </div>
                </Link>
                <div> <div className="account-card-name">{data.name}</div>
                <div className="account-card-handle">@{handle}</div> 
                
                {
                    address &&
                    <div className="profile-card-address">
                        <div>{`${address.slice(0, 6)}..`}</div>
                        <div></div>
                    </div>
                }     
               
            </div>
            </div>
      
            
        </div>
    );
};

export default PrimaryProfileCard;
