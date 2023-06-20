import axios from "axios";
const backend_Link = "http://localhost:4000/chat/";

export async function getAllChat() {
  await axios
    .get(backend_Link)
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      console.log(err);
    });
}

export async function getAllUserChat(id: string) {
  let req = await axios.get(backend_Link + "user/" + id);
  return req
}

export async function getChat(id: string) {
  let req = await axios.get(backend_Link + id);
  return req;
  // .then((res:{data:object}) => {
  //   console.log(res.data)
  //   return res.data;
  // })
  // .catch((err: any) => {
  //   console.log(err);
  // });
}

export async function createChat(data: object) {
  await axios
    .post(backend_Link, data)
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      console.log(err);
    });
}

export async function updateChat(id: string, data: object) {
  await axios
    .put(backend_Link + id, data)
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      console.log(err);
    });
}

export async function deleteChat(id: string) {
  await axios
    .delete(backend_Link + id)
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      console.log(err);
    });
}
