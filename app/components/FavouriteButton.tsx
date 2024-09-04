import React from "react";
import apiService from "../services/apiService";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { getUserId } from "../lib/actions";
import { message } from "antd";

interface FavouriteButtonProps {
  id: string;
  is_interested: boolean;
  update_favourite: (fav: boolean) => void;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({
  id,
  is_interested,
  update_favourite,
}) => {
  const updateWishList = async () => {
    const response = await apiService.post(
      `/api/books/${id}/toggle_interest/`,
      []
    );

    if (response) {
      if (response.is_interested) {
        message.success("Added to the wishlist");
      } else {
        message.success("Removed from the wishlist");
      }
      update_favourite(response.is_interested);
    }
  };

  return (
    <>
      {is_interested ? (
        <HeartFilled
          style={{ color: "red", fontSize: 24 }}
          onClick={updateWishList}
        />
      ) : (
        <HeartOutlined
          style={{ color: "gray", fontSize: 24 }}
          onClick={updateWishList}
        />
      )}
    </>
  );
};

export default FavouriteButton;
