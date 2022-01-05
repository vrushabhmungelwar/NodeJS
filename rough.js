// import { MongoClient } from "mongodb";

// async function main() {
//   const uri =
//     "mongodb+srv://vrushabh:welcome123@cluster0.zksv2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     await createUser(client,{ email: "vrushabh@gmail.com", password: "vrushabh" });
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }
// }
// main().catch(console.error);

// async function createUser(client,data) {
//   const result = await client
//     .db("Users")
//     .collection("pizza delivery app users")
//     .insertOne(data);

//   console.log(`new user created with id: ${result.insertedId}`);
// }
