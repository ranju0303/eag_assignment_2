document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit');
    const promptInput = document.getElementById('prompt');
    const responseDiv = document.getElementById('response');

    submitButton.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        if (!prompt) return;

        submitButton.disabled = true;
        responseDiv.textContent = 'Loading...';

        try {
            const response = await fetch('http://localhost:5001/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt
                })
            });

            const data = await response.json();
            
            if (data.success) {
                responseDiv.textContent = data.response;
            } else {
                responseDiv.textContent = 'Error: ' + data.error;
            }
        } catch (error) {
            responseDiv.textContent = 'Error: ' + error.message;
        } finally {
            submitButton.disabled = false;
        }
    });
}); 