// Simple test script to verify Ollama connection
// Run with: node test-ollama.js

async function testOllama() {
  console.log('Testing Ollama connection...\n');

  try {
    // Test 1: Check if server is running
    console.log('1. Checking if Ollama server is running...');
    const healthCheck = await fetch('http://localhost:11434');
    console.log('✓ Ollama server is running!\n');

    // Test 2: Send a test message
    console.log('2. Sending test message to AI...');
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'hooper216xo/openclaw:latest',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant. Keep responses brief.'
          },
          {
            role: 'user',
            content: 'Say hello in one sentence.'
          }
        ],
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✓ AI Response:', data.message.content);
    console.log('\n✓ All tests passed! Your AI chat should work now.');
    console.log('\nRun "npm run dev" and click "Ask My AI" to start chatting!');

  } catch (error) {
    console.error('✗ Error:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure Ollama is running: ollama serve');
    console.log('2. Check if model exists: ollama list');
    console.log('3. Try pulling the model: ollama pull hooper216xo/openclaw:latest');
  }
}

testOllama();
