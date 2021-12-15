import User from '../../../global/services/user';

const user = new User();

export default function createChatData() {
  const userData = user.get();
  const room = getRoomData();
  return {
    username:userData.username,
    roomId:room._id
  } 
}

function getRoomData() {
  const roomstr = localStorage.getItem("room");
  const room = JSON.parse(roomstr!);
  console.log(room)
  return room;
}