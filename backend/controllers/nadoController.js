const prisma = require("../config/prisma");
const axios = require("axios");
const jwt = require('jsonwebtoken');


// Handle user messages and reuse threads
exports.handleMessage = async (req, res) => {
  try {
    let userId = (req.query.userId);

    const decoded = jwt.verify(userId, process.env.JWT_SECRET);
    userId = decoded.userId;

    console.log("userId", userId); // Get the logged-in user's ID
    const userMessage = req.body.userMessage;

    console.log("111111");

    // Step 1: Check if there's an existing thread for this user in the database
    let existingThread = await prisma.userThread.findFirst({
      where: { userId }, // Find the latest thread for the user
      orderBy: { createdAt: "desc" }, // Sort by latest
    });

    if (!existingThread) {
      // Step 2: If no existing thread, create a new thread
      const assistant = process.env.ASSISTANT_ID;

      if (!assistant) {
        throw new Error("No assistants found");
      }

      console.log("22222");

      const assistantId = assistant;

      // Step 3: Create a new thread in the OpenAI API
      const threadResponse = await axios.post(
        "https://api.openai.com/v1/threads",
        {
          messages: [{ role: "user", content: userMessage }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "OpenAI-Beta": "assistants=v2",
          },
        }
      );

      const threadId = threadResponse.data.id;

      // Store the new thread in the database
      // Store the new thread in the database
      existingThread = await prisma.userThread.create({
        data: {
          threadId, // Save the thread ID
          user: {
            connect: { id: userId }, // Connect the thread to the existing user
          },
        },
      });

      // Step 4: Run the assistant on the new thread
      await runAssistant(threadId, assistantId);
    } else {
      // If there's an existing thread, reuse it
      console.log("33333");

      const threadId = existingThread.threadId;

      // Step 5: Send the user's message to the existing thread
      const messageResponse = await axios.post(
        `https://api.openai.com/v1/threads/${threadId}/messages`,
        { role: "user", content: userMessage },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "OpenAI-Beta": "assistants=v2",
          },
        }
      );

      const assistantId = process.env.ASSISTANT_ID;

      // Run the assistant on the existing thread
      await runAssistant(threadId, assistantId);
    }

    // Step 6: Fetch updated messages after assistant run
    const messagesResponse = await axios.get(
      `https://api.openai.com/v1/threads/${existingThread.threadId}/messages`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );

    const messages = messagesResponse.data;

    res.json({ messages, threadId: existingThread.threadId });
  } catch (error) {
    console.log("666666");
    res.status(500).json({ error: error.message });
  }
};

// Function to run the assistant on a thread
async function runAssistant(threadId, assistantId) {
  const runResponse = await axios.post(
    `https://api.openai.com/v1/threads/${threadId}/runs`,
    { assistant_id: assistantId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "OpenAI-Beta": "assistants=v2",
      },
    }
  );

  const runId = runResponse.data.id;

  // Wait for the run to complete before proceeding
  await checkRunCompletion(threadId, runId);
}

// Function to check if the assistant run has completed
async function checkRunCompletion(threadId, runId) {
  return new Promise((resolve, reject) => {
    let second = 1;
    let intervalId = setInterval(async () => {
      try {
        second += 1;
        if (second <= 30) {
          const retrieveRun = await axios.get(
            `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "OpenAI-Beta": "assistants=v2",
              },
            }
          );

          const runRetrieved = retrieveRun.data;
          if (runRetrieved.status === "completed") {
            clearInterval(intervalId);
            resolve(true);
          }
        } else {
          clearInterval(intervalId);
          reject(false);
        }
      } catch (error) {
        clearInterval(intervalId);
        reject(error);
      }
    }, 1000);
  });
}


exports.getAllMessages = async (req, res) => {
  try {
    let userId = (req.query.userId);

    const decoded = jwt.verify(userId, process.env.JWT_SECRET);
    userId = decoded.userId;
    
    let existingThread = await prisma.userThread.findFirst({
      where: { userId }, // Find the latest thread for the user
      orderBy: { createdAt: "desc" }, // Sort by latest
    });
    // const threadId = req.query.threadId;

    // if (!existingThread) {
    //   // Redirect to handleMessage if no existing thread is found
    //   return exports.handleMessage(req, res);
    // }

    const threadId = existingThread.threadId;


    const messagesResponse = await axios.get(
      `https://api.openai.com/v1/threads/${threadId}/messages?limit=100`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );

    const messages = messagesResponse.data;

    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}