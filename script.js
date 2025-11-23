document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.getElementById('inputBox');
    const outputBox = document.getElementById('outputBox');
    const globalPassInput = document.getElementById('globalPass'); // পাসওয়ার্ড বক্স
    const btnExtract = document.getElementById('btnExtract');
    const btnCopy = document.getElementById('btnCopy');
    const status = document.getElementById('status');

    btnExtract.addEventListener('click', () => {
        const text = inputBox.value.trim();
        const password = globalPassInput.value.trim(); // পাসওয়ার্ড নেওয়া হলো

        if (!text) {
            status.innerText = "Please paste cookies first!";
            status.style.color = "red";
            return;
        }
        
        // পাসওয়ার্ড না দিলে ওয়ার্নিং দেওয়া যেতে পারে, তবে আমরা খালি রাখলে খালিই বসাব
        const passStr = password ? password : ""; 

        const lines = text.split('\n');
        let formattedLines = [];
        let count = 0;

        lines.forEach(line => {
            const cleanLine = line.trim();
            if (!cleanLine) return;

            // c_user বা UID খোঁজা
            const match = cleanLine.match(/c_user=([0-9]+)/);
            
            if (match && match[1]) {
                const uid = match[1];
                
                // ফরম্যাট: UID | Password | Original Cookie
                // পাসওয়ার্ড না দিলে মাঝখানের জায়গাটা ফাঁকা থাকবে কিন্তু ফরম্যাট ঠিক থাকবে
                formattedLines.push(`${uid} | ${passStr} | ${cleanLine}`);
                count++;
            }
        });

        if (count > 0) {
            outputBox.value = formattedLines.join('\n');
            status.innerText = `Success! Formatted ${count} lines.`;
            status.style.color = "green";
            btnCopy.style.display = "block";
        } else {
            outputBox.value = "";
            status.innerText = "No c_user found in text.";
            status.style.color = "red";
            btnCopy.style.display = "none";
        }
    });

    btnCopy.addEventListener('click', () => {
        outputBox.select();
        outputBox.setSelectionRange(0, 99999); 
        navigator.clipboard.writeText(outputBox.value).then(() => {
            status.innerText = "Copied to Clipboard! ✅";
        });
    });
});
