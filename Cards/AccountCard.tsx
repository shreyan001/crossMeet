import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IAccountCard } from "../../types";
import { parseURL } from "../../helpers/functions";
import Loader from "../Loader";

const AccountCard = ({ profileID, handle, avatar, metadata, isPrimary, isIndexed }: IAccountCard) => {
    const [src, setSrc] = useState(parseURL(avatar));
    const [data, setData] = useState({
        name: "",
        bio: ""
    });

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
        <div className="account-card">
            <div className="account-card-img center">
                <Image
                    src={src}
                    alt="avatar"
                    width={60}
                    height={60}
                    onError={() => setSrc("/assets/avatar-placeholder.svg")}
                    placeholder="blur"
                    blurDataURL="/assets/avatar-placeholder.svg"
                />
            </div>
            <div>
                <div className="account-card-info">
                    <div className="account-card-name">{data.name} •</div>
                    <div className="account-card-handle">@{handle}</div>
                </div>
                <div className="account-card-id">Profile ID: {profileID}</div>
            </div>
            <div>
                {
                    !isIndexed
                        ? <Loader />
                        : <div>
                            {
                                isPrimary
                                    ? <div className="account-card-primary">Primary</div>
                                    : <div></div>
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default AccountCard;
