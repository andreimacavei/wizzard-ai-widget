const { OpenAI } = require('openai');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const axios = require('axios');

require('dotenv').config();

const app = express();
app.use(express.json());

// cors middleware
app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:5500'],
    credentials: true,
  })
);

// Apply rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

app.use(limiter);

// Endpoint to process actions
app.get('/backend', async (req, res) => {
  //  Extract the `prompt` from the body of the request
  // const { searchParams } = new URL(req.url);
  // const action = searchParams.get('action');
  // const content = searchParams.get('content');

  const { action, content, lang } = req.query;

  if (!content || !action) {
    return new Response('Missing content or action', { status: 400 });
  }

  console.log('Prompt:', content);
  console.log('Action:', action);

  try {
    let prompt = '';
    switch (action.toLowerCase()) {
      case 'fix_spelling':
        prompt = `Fix all grammar and spelling issues in the following text: "${content}". `;
        break;
      case 'change_tone':
        const tone = searchParams.get('tone') || 'friendly';
        prompt = `Change the tone of the following text to be more "${tone}: "${content}"`;
        break;
      case 'make_shorter':
        prompt = `Shorten the following text: "${content}"`;
        break;
      case 'make_longer':
        prompt = `Make the following text more verbose: "${content}"`;
        break;
      case 'translate':
        // const langParam = searchParams.get('lang')?.toLowerCase() || 'en';
        // const lang = language[langParam] || 'English';
        prompt = `Translate the following text to ${lang}: "${content}"`;
        break;
      case 'lucky':
        prompt = `Generate a random thought using the following: "${content}"`;
        break;
      default:
        return new Response('Invalid action', { status: 400 });
    }

    // const response = await axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions', {
    //     prompt,
    //     max_tokens: 150
    // }, {
    //     headers: {
    //         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    //     }
    //   });
    // res.json({ result: response.data.choices[0].text.trim() });

    // const completion = await openai.completions.create({
    //   model: 'gpt-3.5-turbo-instruct',
    //   prompt: prompt,
    //   max_tokens: 300,
    // });
    // res.json({ result: completion.choices[0].text.trim() });

    // Mock response data for now
    const response = {
      choices: [
        {
          text: 'This is a mock response. Make money online with this one weird trick!',
        },
      ],
      usage: {
        total_tokens: 5,
      },
    };

    let aiResponseText = response.choices[0].text.trim();

    // Check if the response text starts with double quotes and remove them
    if (aiResponseText.startsWith('"')) {
      // Remove the first and last characters (double quotes) from the response text
      aiResponseText = aiResponseText.substring(1, aiResponseText.length - 1);
    }

    res.json(aiResponseText);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the request');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
