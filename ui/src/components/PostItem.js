import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import Helpers from "../utils/helper";

const PostItem = ({ item, dollarPrice }) => {
  const router = useRouter();

  const [lastOffer, setLastOffer] = useState(null);
  const [lastOfferDollarPrice, setLastOfferDollarPrice] = useState(0);
  const [passedTime, setPassedTime] = useState("");
  const [isPostVideo, setIsPostVideo] = React.useState(false);

  useEffect(() => {
    let offers = item.offers.sort(function (a, b) {
      return parseFloat(b.price) - parseFloat(a.price);
    });
    if (offers.length) {
      setLastOffer(offers[0]);
      setLastOfferDollarPrice((offers[0].price * dollarPrice).toFixed(2));
      setPassedTime(Helpers.getPassedTime(offers[0].createdAt));
    }

    if (item.post && item.post.thumbnail) {
      setIsPostVideo(true);
    } else {
      setIsPostVideo(false);
    }
  }, [item]);

  const openPostUserOnInstagram = (evt) => {
    evt.stopPropagation();
    window.open(
      "https://www.instagram.com/" + item.post.instagramUser.username,
      "_blank"
    );
  }

  return (
    lastOffer && (
      <Link href="/offer/[id]" as={"/offer/" + lastOffer.id}>
        <div className="post-item pointer-cursor">
          <div className="content p-1">
            <div className="auction-img-content">
              <div className="p-relative">
                <img
                  className="auction-img"
                  src={isPostVideo ? item.post.thumbnail : item.post.source}
                ></img>
                {isPostVideo && (
                  <img className="camera-btn" src={"/static/img/camera.png"} />
                )}
              </div>
              <div className="post-name pt-2 pb-2 pl-3 pr-3">
                {item.post.title}
              </div>
            </div>

            <div className="below-area">
              {lastOffer && (
                <div className="mt-3">
                  <p className="mb-0">
                    Offered (${lastOfferDollarPrice}) {lastOffer.price} Eth
                  </p>
                  <p className="grey-transparent-text mb-0">{passedTime}</p>
                <Link href={"/user/" + lastOffer.buyer.username}>
                    <div className="mb-0">by @{lastOffer.buyer.fullName}</div>
                  </Link>
                </div>
              )}
              <div className="auction-detail-card mt-3 pt-2 pb-2 pl-3 pr-3">
                <div className="flex justify-content-between align-items-center mb-2">
                  <div className="post-item-user-mark">
                    <div className="avatar">
                      <div>
                        <img src={item.post.instagramUser.avatar || ""} />
                      </div>
                    </div>
                    <span>@{item.post.instagramUser.username}</span>
                  </div>
                  <img
                    className="user-instaram"
                    src={"/static/img/instagram.png"}
                    onClick={(evt)=>openPostUserOnInstagram(evt)}
                  />
                </div>
                <p className="small-header-text mt-1 post-item-title">
                  {item.post.title}
                </p>
                <div className="small-header-text mt-1">
                  <FontAwesomeIcon icon={faHeart} />
                  <span className="ml-2 mr-3">{item.post.likes}</span>
                  <FontAwesomeIcon icon={faComment} flip="horizontal" />
                  <span className="ml-2">{item.post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  );
};
export default PostItem;
