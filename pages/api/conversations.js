import getCurrentUse from "../actions/getCurrentUser";
import Conversation from "@/models/Conversation";
import ConnectDb from "../../db/connect";

const POST = async (req, res) => {
  await ConnectDb();

  try {
    const { userId, isGroup = false, members, name, currentUser } = req.body;
    if (!currentUser?._id || !currentUser?.email) {
      res.status(401).send("Unauthorized");
      return;
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      res.status(400).send("Invalid Data");
      return;
    }

    if (isGroup) {
      const newConversation = await Conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member) => ({
                id: member.value,
              })),
              {
                id: currentUser.user._id,
              },
            ],
          },
          include: {
            users: true,
          },
        },
      });

      res.status(201).json(newConversation).send();
      return;
    }
    // todo: filter conversation
    const existingConversations = await Conversation.find({
      userIds: userId,
    });
    const singleConversation = existingConversations[0];
    console.log(singleConversation);

    if (singleConversation) {
      res.json(singleConversation).send();
      return;
    }
    const newConversation = await Conversation.create({
      userIds: [currentUser._id, userId],
    });
    res.json(newConversation);
    return;
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = POST;
