const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function (event, context) {
  const body = JSON.parse(event.body);
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: body.message }],
      temperature: 0.7,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(chatResponse.data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
