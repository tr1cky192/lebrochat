const { Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({apiKey: "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"});
const openai = new OpenAIApi(configuration);
export async function sendMsgToOpenAi(message){
    const res = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message,
        temperature: 0.8,
        max_tokens: 200,
        top_p:1,
        frequency_penalty:0,
        presence_penalty:0
    });
    return res.data.choices[0].text;
}