document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.getElementById('inputBox');
    const outputBox = document.getElementById('outputBox');
    const btnExtract = document.getElementById('btnExtract');
    const btnCopy = document.getElementById('btnCopy');
    const status = document.getElementById('status');

    btnExtract.addEventListener('click', () => {
        const text = inputBox.value.trim();
        if (!text) {
            status.innerText = "Please paste some text first!";
            status.style.color = "red";
            return;
        }

        // লাইন বাই লাইন আলাদা করা
        const lines = text.split('\n');
        let extractedIDs = [];

        lines.forEach(line => {
            // c_user= এর পরে থাকা সংখ্যাগুলো খুঁজবে
            // অথবা যদি শুধু সংখ্যা থাকে তাও ধরার চেষ্টা করবে
            const match = line.match(/c_user=([0-9]+)/);
            
            if (match && match[1]) {
                extractedIDs.push(match[1]);
            }
        });

        if (extractedIDs.length > 0) {
            // ডুপ্লিকেট রিমুভ করা (একই আইডি দুইবার থাকলে একবার নেবে)
            const uniqueIDs = [...new Set(extractedIDs)];

            outputBox.value = uniqueIDs.join('\n');
            status.innerText = `Success! Found ${uniqueIDs.length} unique IDs.`;
            status.style.color = "green";
            
            // কপি বাটন দৃশ্যমান করা
            btnCopy.style.display = "block";
        } else {
            outputBox.value = "";
            status.innerText = "No c_user found in the text.";
            status.style.color = "red";
            btnCopy.style.display = "none";
        }
    });

    btnCopy.addEventListener('click', () => {
        outputBox.select();
        outputBox.setSelectionRange(0, 99999); // মোবাইলের জন্য

        navigator.clipboard.writeText(outputBox.value).then(() => {
            status.innerText = "All IDs Copied to Clipboard! ✅";
        });
    });
});