import apiService from "../services/apiService";
import { getUserId } from "../lib/actions";
import Conversation from "../components/inbox/Conversation";

export type UserType = {
  id: string;
  name: string;
  avatar_url: string;
};

export type ConversationType = {
  id: string;
  users: UserType[];
};

const InboxPage = async () => {
  const userId = await getUserId();

  if (!userId) {
    return <p>You need to be authenticated</p>;
  }

  let conversations = await apiService.get("/api/chat/");
  console.log("conversations : ", conversations);

  return (
    <>
      <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
        {conversations.map((conversation: ConversationType) => {
          return (
            <Conversation
              key={conversation.id}
              userId={userId}
              conversation={conversation}
            />
          );
        })}
      </main>
    </>
  );
};

export default InboxPage;

// interface UserItem {
//   email: string;
//   gender: string;
//   name: {
//     first: string;
//     last: string;
//     title: string;
//   };
//   nat: string;
//   picture: {
//     large: string;
//     medium: string;
//     thumbnail: string;
//   };
// }

// const fakeDataUrl =
//   "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";

// const ContainerHeight = 800;

// const ConversationList: React.FC = () => {
//   const [data, setData] = useState<UserItem[]>([]);

//   const appendData = () => {
//     fetch(fakeDataUrl)
//       .then((res) => res.json())
//       .then((body) => {
//         setData(data.concat(body.results));
//         message.success(`${body.results.length} more items loaded!`);
//       });
//   };

//   useEffect(() => {
//     appendData();
//   }, []);

// const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
//   // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
//   if (
//     Math.abs(
//       e.currentTarget.scrollHeight -
//         e.currentTarget.scrollTop -
//         ContainerHeight
//     ) <= 1
//   ) {
//     appendData();
//   }
// };

// return (
//   <>
//     Conversations
//     <List>
// <VirtualList
//   data={data}
//   height={ContainerHeight}
//   itemHeight={47}
//   itemKey="email"
//   onScroll={onScroll}
// >
//   {(item: UserItem) => (
//     <List.Item key={item.email}>
//       <List.Item.Meta
//         avatar={<Avatar src={item.picture.large} />}
//         title={<a href="https://ant.design">{item.name.last}</a>}
//         description={item.email}
//       />
//       <div>Content</div>
//     </List.Item>
//   )}
// </VirtualList>
//     </List>
//   </>
// );
// };

// export default ConversationList;
