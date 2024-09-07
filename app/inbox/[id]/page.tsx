import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { getAccessToken, getUserId } from "@/app/lib/actions";
import React, { useEffect, useState } from "react";
import { UserType } from "../page";
import apiService from "@/app/services/apiService";

export type MessageType = {
  id: string;
  name: string;
  body: string;
  conversation_id: string;
  sent_to: UserType;
  created_by: UserType;
};

const ConversationPage = async ({ params }: { params: { id: string } }) => {
  const userId = await getUserId();
  const token = await getAccessToken();

  if (!userId || !token) {
    return <p>You need to be authenticated</p>;
  }

  const conversation = await apiService.get(`/api/chat/${params.id}/`);
  return (
    <>
      <ConversationDetail
        userId={userId}
        token={token}
        messages={conversation.messages}
        conversation={conversation.conversation}
      />
    </>
  );
};

export default ConversationPage;
